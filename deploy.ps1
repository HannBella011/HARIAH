# GitHub Pages Deployment Script for HARIAH
# This script automates the deployment process to GitHub Pages

Write-Host "Starting GitHub Pages deployment..." -ForegroundColor Green

# Step 1: Build the project
Write-Host "Step 1: Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Build successful!" -ForegroundColor Green

# Step 2: Commit and push changes to main
Write-Host "Step 2: Committing and pushing to main..." -ForegroundColor Cyan
git add .
git commit -m "Update base path for GitHub Pages deployment"
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Git push failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Changes pushed to main!" -ForegroundColor Green

# Step 3: GitHub Actions will automatically deploy
Write-Host "Step 3: GitHub Actions will now deploy to GitHub Pages" -ForegroundColor Cyan
Write-Host "Check your repository Actions tab for deployment status" -ForegroundColor Yellow
Write-Host "Your site will be available at: https://hannbella011.github.io/HARIAH/" -ForegroundColor Green

Write-Host "Deployment process initiated successfully!" -ForegroundColor Green