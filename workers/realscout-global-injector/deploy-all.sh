#!/bin/bash
# ============================================================================
# DEPLOY REALSCOUT GLOBAL INJECTOR V2
# One-command deployment — handles worker upload + route creation
#
# Usage:
#   export CLOUDFLARE_API_TOKEN="your-token-here"
#   bash deploy-all.sh                              # Deploy worker only
#   bash deploy-all.sh --routes maravillahomesforsale.com   # + test domain routes
#   bash deploy-all.sh --routes all                 # + all zones
# ============================================================================

set -euo pipefail

ACCOUNT_ID="2cc579c1ec9e426ed585e933ebf4753b"
API_BASE="https://api.cloudflare.com/client/v4"
SCRIPT_NAME="realscout-global-injector"
SCRIPT_FILE="$(dirname "$0")/index.js"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check token
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo -e "${RED}ERROR: CLOUDFLARE_API_TOKEN not set${NC}"
  echo "   export CLOUDFLARE_API_TOKEN=\"your-token-here\""
  exit 1
fi

# Check script file exists
if [ ! -f "$SCRIPT_FILE" ]; then
  echo -e "${RED}ERROR: Worker file not found: $SCRIPT_FILE${NC}"
  exit 1
fi

echo -e "${BLUE}Deploying $SCRIPT_NAME v2${NC}"
echo ""

# ---- STEP 1: Deploy the worker code ----
echo -e "${YELLOW}Step 1: Uploading worker code...${NC}"

DEPLOY_RESULT=$(curl -s -X PUT \
  "${API_BASE}/accounts/${ACCOUNT_ID}/workers/scripts/${SCRIPT_NAME}" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -F "metadata={\"main_module\": \"worker.js\", \"compatibility_date\": \"2026-02-01\"};type=application/json" \
  -F "worker.js=@${SCRIPT_FILE};type=application/javascript+module")

SUCCESS=$(echo "$DEPLOY_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null || echo "False")

if [ "$SUCCESS" = "True" ]; then
  echo -e "${GREEN}   Worker deployed successfully${NC}"
else
  echo -e "${RED}   Deploy failed:${NC}"
  echo "$DEPLOY_RESULT" | python3 -m json.tool 2>/dev/null || echo "$DEPLOY_RESULT"
  exit 1
fi

# ---- STEP 2: Verify deployment ----
echo -e "${YELLOW}Step 2: Verifying deployment...${NC}"

VERIFY=$(curl -s -X GET \
  "${API_BASE}/accounts/${ACCOUNT_ID}/workers/scripts/${SCRIPT_NAME}" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}")

MODIFIED=$(echo "$VERIFY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('result',{}).get('modified_on','unknown'))" 2>/dev/null || echo "unknown")
echo -e "${GREEN}   Verified. Last modified: ${MODIFIED}${NC}"

# ---- STEP 3: Routes (optional) ----
ROUTES_ARG="${1:-}"
ROUTES_TARGET="${2:-}"

if [ "$ROUTES_ARG" != "--routes" ]; then
  echo ""
  echo -e "${GREEN}Worker deployed. No routes updated.${NC}"
  echo -e "   To add routes: ${BLUE}bash deploy-all.sh --routes maravillahomesforsale.com${NC}"
  exit 0
fi

echo -e "${YELLOW}Step 3: Setting up routes...${NC}"

# Get zones
get_zones() {
  local page=1
  local all_zones="[]"
  while true; do
    local result=$(curl -s "${API_BASE}/zones?account.id=${ACCOUNT_ID}&per_page=50&page=${page}" \
      -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}")
    local zones=$(echo "$result" | python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin).get('result',[])))" 2>/dev/null)
    local total_pages=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin).get('result_info',{}).get('total_pages',1))" 2>/dev/null)
    all_zones=$(python3 -c "import json; a=json.loads('$all_zones'); b=json.loads('$(echo "$zones" | sed "s/'/\\\\'/g")'); print(json.dumps(a+b))" 2>/dev/null)
    if [ "$page" -ge "$total_pages" ]; then break; fi
    page=$((page + 1))
  done
  echo "$all_zones"
}

ZONES_JSON=$(get_zones)
ZONE_COUNT=$(echo "$ZONES_JSON" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null)
echo -e "   Found ${ZONE_COUNT} zones"

create_route() {
  local zone_id="$1"
  local zone_name="$2"
  local pattern="$3"
  local script="$4"

  local result=$(curl -s -X POST \
    "${API_BASE}/zones/${zone_id}/workers/routes" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"pattern\": \"${pattern}\", \"script\": \"${script}\"}")

  local success=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null || echo "False")

  if [ "$success" = "True" ]; then
    echo -e "   ${GREEN}OK  ${zone_name}: ${pattern} -> ${script}${NC}"
  else
    local err_code=$(echo "$result" | python3 -c "import sys,json; errs=json.load(sys.stdin).get('errors',[]); print(errs[0].get('code','') if errs else '')" 2>/dev/null || echo "")
    if [ "$err_code" = "10020" ]; then
      echo -e "   ${YELLOW}SKIP  ${zone_name}: route already exists${NC}"
    else
      echo -e "   ${RED}FAIL  ${zone_name}: $(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin).get('errors',[{}])[0].get('message','unknown error'))" 2>/dev/null)${NC}"
    fi
  fi
}

deploy_routes_for_zone() {
  local zone_id="$1"
  local zone_name="$2"
  # Single catch-all route — the Worker handles /cdn/realscout-widgets.js internally
  # No separate proxy-cache worker needed (edge proxy is built into the injector)
  create_route "$zone_id" "$zone_name" "*${zone_name}/*" "realscout-global-injector"
}

if [ "$ROUTES_TARGET" = "all" ]; then
  echo -e "   ${YELLOW}Deploying routes to ALL ${ZONE_COUNT} zones...${NC}"
  echo ""

  echo "$ZONES_JSON" | python3 -c "
import sys, json
zones = json.load(sys.stdin)
for z in zones:
    print(f\"{z['id']}|{z['name']}\")
" | while IFS='|' read -r zid zname; do
    deploy_routes_for_zone "$zid" "$zname"
    sleep 0.2
  done

else
  # Single domain
  ZONE_INFO=$(echo "$ZONES_JSON" | python3 -c "
import sys, json
zones = json.load(sys.stdin)
for z in zones:
    if z['name'] == '${ROUTES_TARGET}':
        print(f\"{z['id']}|{z['name']}\")
        break
" 2>/dev/null)

  if [ -z "$ZONE_INFO" ]; then
    echo -e "   ${RED}ERROR: Domain '${ROUTES_TARGET}' not found${NC}"
    exit 1
  fi

  IFS='|' read -r ZONE_ID ZONE_NAME <<< "$ZONE_INFO"
  echo -e "   ${BLUE}Single domain: ${ZONE_NAME}${NC}"
  deploy_routes_for_zone "$ZONE_ID" "$ZONE_NAME"
fi

echo ""
echo -e "${GREEN}Deployment complete!${NC}"
echo ""
echo -e "Test: ${BLUE}curl -sI https://${ROUTES_TARGET:-your-domain.com}/ | grep X-DRJ${NC}"
echo -e "Proxy: ${BLUE}curl -sI https://${ROUTES_TARGET:-your-domain.com}/cdn/realscout-widgets.js | grep X-Proxy${NC}"
echo -e "Schema: View source -> search for ${BLUE}application/ld+json${NC}"
