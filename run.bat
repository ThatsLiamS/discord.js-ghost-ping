@echo off
echo Starting Git Commit
set /p Message=Your message:
call git add .
call git commit -m "%Message%"
call git push origin main
cls
:end