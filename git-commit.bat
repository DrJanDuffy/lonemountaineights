@echo off
echo Adding all changes...
git add .

echo Committing with message: %1
git commit -m "%1"

echo Pushing to remote...
git push

echo Done!
