<script>
// Mortgage calculator state
const mortgage = {
  homePrice: 850000,
  downPayment: 170000,
  loanTerm: 30,
  interestRate: 6.5,
  propertyTax: 8500,
  homeInsurance: 1200,
  hoaFees: 150,
  pmi: 0,
};

let monthlyPayment = null;
let showBreakdown = false;

// Calculate mortgage payment
function calculateMortgage() {
  const principal = mortgage.homePrice - mortgage.downPayment;
  const monthlyRate = mortgage.interestRate / 100 / 12;
  const numPayments = mortgage.loanTerm * 12;

  // Calculate PMI if down payment is less than 20%
  const downPaymentPercent = (mortgage.downPayment / mortgage.homePrice) * 100;
  if (downPaymentPercent < 20) {
    mortgage.pmi = Math.round((principal * 0.005) / 12); // 0.5% annually
  } else {
    mortgage.pmi = 0;
  }

  // Calculate monthly principal and interest
  const monthlyPI =
    (principal * (monthlyRate * (1 + monthlyRate) ** numPayments)) /
    ((1 + monthlyRate) ** numPayments - 1);

  // Calculate monthly property tax
  const monthlyPropertyTax = mortgage.propertyTax / 12;

  // Calculate monthly home insurance
  const monthlyInsurance = mortgage.homeInsurance / 12;

  // Calculate total monthly payment
  const totalMonthly =
    monthlyPI +
    monthlyPropertyTax +
    monthlyInsurance +
    mortgage.hoaFees +
    mortgage.pmi;

  monthlyPayment = {
    principalAndInterest: Math.round(monthlyPI),
    propertyTax: Math.round(monthlyPropertyTax),
    homeInsurance: Math.round(monthlyInsurance),
    hoaFees: mortgage.hoaFees,
    pmi: mortgage.pmi,
    total: Math.round(totalMonthly),
    downPaymentPercent: Math.round(downPaymentPercent),
    totalInterest: Math.round(monthlyPI * numPayments - principal),
    totalCost: Math.round(monthlyPI * numPayments + mortgage.downPayment),
  };

  showBreakdown = true;
}

// Calculate down payment percentage
$: downPaymentPercent = (mortgage.downPayment / mortgage.homePrice) * 100;

// Calculate loan amount
$: loanAmount = mortgage.homePrice - mortgage.downPayment;

// Auto-calculate when values change
$: if (
  mortgage.homePrice &&
  mortgage.downPayment &&
  mortgage.loanTerm &&
  mortgage.interestRate
) {
  calculateMortgage();
}
</script>

<div class="mortgage-calculator">
	<div class="calculator-header">
		<h3>Lone Mountain Heights Mortgage Calculator</h3>
		<p>Calculate your monthly payment with local property tax rates and HOA fees</p>
	</div>
	
	<div class="calculator-content">
		<div class="calculator-form">
			<div class="form-section">
				<h4>Property Information</h4>
				<div class="form-grid">
					<div class="form-group">
						<label for="homePrice">Home Price</label>
						<div class="input-group">
							<span class="input-prefix">$</span>
							<input 
								id="homePrice"
								type="number" 
								bind:value={mortgage.homePrice}
								placeholder="850000"
							/>
						</div>
					</div>
					
					<div class="form-group">
						<label for="downPayment">Down Payment</label>
						<div class="input-group">
							<span class="input-prefix">$</span>
							<input 
								id="downPayment"
								type="number" 
								bind:value={mortgage.downPayment}
								placeholder="170000"
							/>
						</div>
						<div class="input-help">
							{downPaymentPercent.toFixed(1)}% down payment
						</div>
					</div>
					
					<div class="form-group">
						<label for="loanTerm">Loan Term</label>
						<select id="loanTerm" bind:value={mortgage.loanTerm}>
							<option value={15}>15 years</option>
							<option value={20}>20 years</option>
							<option value={25}>25 years</option>
							<option value={30}>30 years</option>
						</select>
					</div>
					
					<div class="form-group">
						<label for="interestRate">Interest Rate</label>
						<div class="input-group">
							<input 
								id="interestRate"
								type="number" 
								bind:value={mortgage.interestRate}
								placeholder="6.5"
								step="0.1"
							/>
							<span class="input-suffix">%</span>
						</div>
					</div>
				</div>
			</div>
			
			<div class="form-section">
				<h4>Monthly Expenses (Lone Mountain Heights)</h4>
				<div class="form-grid">
					<div class="form-group">
						<label for="propertyTax">Annual Property Tax</label>
						<div class="input-group">
							<span class="input-prefix">$</span>
							<input 
								id="propertyTax"
								type="number" 
								bind:value={mortgage.propertyTax}
								placeholder="8500"
							/>
						</div>
						<div class="input-help">
							~1% of home value (Nevada average)
						</div>
					</div>
					
					<div class="form-group">
						<label for="homeInsurance">Annual Home Insurance</label>
						<div class="input-group">
							<span class="input-prefix">$</span>
							<input 
								id="homeInsurance"
								type="number" 
								bind:value={mortgage.homeInsurance}
								placeholder="1200"
							/>
						</div>
					</div>
					
					<div class="form-group">
						<label for="hoaFees">Monthly HOA Fees</label>
						<div class="input-group">
							<span class="input-prefix">$</span>
							<input 
								id="hoaFees"
								type="number" 
								bind:value={mortgage.hoaFees}
								placeholder="150"
							/>
						</div>
						<div class="input-help">
							Varies by subdivision
						</div>
					</div>
				</div>
			</div>
		</div>
		
		{#if showBreakdown && monthlyPayment}
			<div class="payment-results">
				<div class="results-header">
					<h4>Your Monthly Payment</h4>
					<div class="total-payment">
						${monthlyPayment.total.toLocaleString()}
						<span class="payment-period">/month</span>
					</div>
				</div>
				
				<div class="payment-breakdown">
					<div class="breakdown-item">
						<span class="breakdown-label">Principal & Interest</span>
						<span class="breakdown-value">${monthlyPayment.principalAndInterest.toLocaleString()}</span>
					</div>
					<div class="breakdown-item">
						<span class="breakdown-label">Property Tax</span>
						<span class="breakdown-value">${monthlyPayment.propertyTax.toLocaleString()}</span>
					</div>
					<div class="breakdown-item">
						<span class="breakdown-label">Home Insurance</span>
						<span class="breakdown-value">${monthlyPayment.homeInsurance.toLocaleString()}</span>
					</div>
					<div class="breakdown-item">
						<span class="breakdown-label">HOA Fees</span>
						<span class="breakdown-value">${monthlyPayment.hoaFees.toLocaleString()}</span>
					</div>
					{#if monthlyPayment.pmi > 0}
						<div class="breakdown-item">
							<span class="breakdown-label">PMI</span>
							<span class="breakdown-value">${monthlyPayment.pmi.toLocaleString()}</span>
						</div>
					{/if}
				</div>
				
				<div class="loan-summary">
					<div class="summary-item">
						<span class="summary-label">Loan Amount</span>
						<span class="summary-value">${loanAmount.toLocaleString()}</span>
					</div>
					<div class="summary-item">
						<span class="summary-label">Total Interest</span>
						<span class="summary-value">${monthlyPayment.totalInterest.toLocaleString()}</span>
					</div>
					<div class="summary-item">
						<span class="summary-label">Total Cost</span>
						<span class="summary-value">${monthlyPayment.totalCost.toLocaleString()}</span>
					</div>
				</div>
				
				<div class="affordability-tips">
					<h5>Affordability Tips for Lone Mountain Heights</h5>
					<ul>
						<li>Consider a 20% down payment to avoid PMI</li>
						<li>Factor in HOA fees when budgeting (varies by subdivision)</li>
						<li>Property taxes are relatively low in Nevada (~1%)</li>
						<li>Home insurance costs are moderate due to low natural disaster risk</li>
					</ul>
				</div>
				
				<div class="calculator-cta">
					<h5>Ready to Get Pre-Approved?</h5>
					<p>Connect with our trusted mortgage partners for personalized rates</p>
					<div class="cta-buttons">
						<a href="tel:702-222-1964" class="btn btn-primary">Call 702-222-1964</a>
						<a href="/contact" class="btn btn-secondary">Get Pre-Approval Help</a>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.mortgage-calculator {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}
	
	.calculator-header {
		text-align: center;
		margin-bottom: 2rem;
	}
	
	.calculator-header h3 {
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.calculator-header p {
		color: var(--text-color);
		margin: 0;
	}
	
	.calculator-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}
	
	.form-section {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: var(--warm-cream);
		border-radius: 8px;
	}
	
	.form-section h4 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	
	.form-group {
		display: flex;
		flex-direction: column;
	}
	
	.form-group label {
		font-weight: 600;
		color: var(--heading-color);
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}
	
	.input-group {
		position: relative;
		display: flex;
		align-items: center;
	}
	
	.input-prefix,
	.input-suffix {
		position: absolute;
		color: var(--text-light);
		font-weight: 600;
		z-index: 1;
	}
	
	.input-prefix {
		left: 0.75rem;
	}
	
	.input-suffix {
		right: 0.75rem;
	}
	
	.input-group input {
		width: 100%;
		padding: 0.75rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}
	
	.input-group input:focus {
		outline: none;
		border-color: var(--accent-color);
	}
	
	.form-group select {
		padding: 0.75rem;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}
	
	.form-group select:focus {
		outline: none;
		border-color: var(--accent-color);
	}
	
	.input-help {
		font-size: 0.8rem;
		color: var(--text-light);
		margin-top: 0.25rem;
	}
	
	.payment-results {
		background: var(--warm-cream);
		padding: 2rem;
		border-radius: 12px;
	}
	
	.results-header {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 2px solid #e5e7eb;
	}
	
	.results-header h4 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.total-payment {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--accent-color);
	}
	
	.payment-period {
		font-size: 1rem;
		color: var(--text-light);
		font-weight: 400;
	}
	
	.payment-breakdown {
		margin-bottom: 2rem;
	}
	
	.breakdown-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 0;
		border-bottom: 1px solid #e5e7eb;
	}
	
	.breakdown-item:last-child {
		border-bottom: none;
	}
	
	.breakdown-label {
		color: var(--text-color);
		font-weight: 500;
	}
	
	.breakdown-value {
		font-weight: 700;
		color: var(--heading-color);
	}
	
	.loan-summary {
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 2rem;
	}
	
	.summary-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
	}
	
	.summary-label {
		color: var(--text-color);
		font-weight: 500;
	}
	
	.summary-value {
		font-weight: 700;
		color: var(--heading-color);
	}
	
	.affordability-tips {
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 2rem;
	}
	
	.affordability-tips h5 {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 1rem 0;
	}
	
	.affordability-tips ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.affordability-tips li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #e5e7eb;
		position: relative;
		padding-left: 1.5rem;
	}
	
	.affordability-tips li::before {
		content: '💡';
		position: absolute;
		left: 0;
	}
	
	.affordability-tips li:last-child {
		border-bottom: none;
	}
	
	.calculator-cta {
		background: var(--tertiary-color);
		padding: 2rem;
		border-radius: 12px;
		text-align: center;
	}
	
	.calculator-cta h5 {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--heading-color);
		margin: 0 0 0.5rem 0;
	}
	
	.calculator-cta p {
		color: var(--text-light);
		margin: 0 0 1.5rem 0;
	}
	
	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.btn {
		padding: 1rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
		display: inline-block;
		min-width: 150px;
		text-align: center;
	}
	
	.btn-primary {
		background: var(--accent-color);
		color: white;
		border: 2px solid var(--accent-color);
	}
	
	.btn-primary:hover {
		background: var(--accent-light);
		border-color: var(--accent-light);
		transform: translateY(-2px);
	}
	
	.btn-secondary {
		background: transparent;
		color: var(--accent-color);
		border: 2px solid var(--accent-color);
	}
	
	.btn-secondary:hover {
		background: var(--accent-color);
		color: white;
		transform: translateY(-2px);
	}
	
	@media (max-width: 768px) {
		.calculator-content {
			grid-template-columns: 1fr;
		}
		
		.form-grid {
			grid-template-columns: 1fr;
		}
		
		.total-payment {
			font-size: 2rem;
		}
		
		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}
		
		.btn {
			min-width: 200px;
		}
	}
</style>
