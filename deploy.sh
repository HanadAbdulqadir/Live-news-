#!/bin/bash

# Build the React app
echo "Building the React app..."
npm run build

# Create deployment branch
echo "Creating deployment branch..."
npm install --save-dev gh-pages

# Add homepage to package.json (if not already there)
if ! grep -q "homepage" package.json; then
  echo "Adding homepage to package.json..."
  node -e "
  const package = require('./package.json');
  package.homepage = 'https://HanadAbdulqadir.github.io/Live-news-';
  require('fs').writeFileSync('package.json', JSON.stringify(package, null, 2));
  "
fi

# Add deploy script to package.json (if not already there)
if ! grep -q "deploy" package.json; then
  echo "Adding deploy scripts to package.json..."
  node -e "
  const package = require('./package.json');
  package.scripts.predeploy = 'npm run build';
  package.scripts.deploy = 'gh-pages -d build';
  require('fs').writeFileSync('package.json', JSON.stringify(package, null, 2));
  "
fi

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npm run deploy

echo "Deployment complete! Your app is live at: https://HanadAbdulqadir.github.io/Live-news-"
