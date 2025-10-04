# GitHub Pages Deployment Guide

This portfolio is configured for automatic deployment to GitHub Pages.

## Setup Instructions

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**

### 3. Automatic Deployment
- Every push to the `main` branch will automatically trigger a deployment
- Check the **Actions** tab to monitor deployment progress
- Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Manual Build (Optional)

To build locally for testing:
```bash
npm run build:static
```

The static files will be in the `dist/` directory.

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS records with your domain provider
3. In GitHub Settings > Pages, add your custom domain

## Troubleshooting

### Page shows 404
- Ensure GitHub Pages is set to use "GitHub Actions" as the source
- Check the Actions tab for any build errors

### Assets not loading
- The build is configured with relative paths (`base: './'`)
- All assets should work correctly on any subdirectory

### Build fails
- Check that all dependencies are listed in `package.json`
- Review the Actions logs for specific error messages
