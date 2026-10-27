# Things in My Bedroom — GitHub Pages

## Files
- `index.html`: learning media website
- `assets/vocabulary/`: 20 PNG vocabulary illustrations

## Publish on GitHub Pages
1. Upload `index.html` and the `assets` folder to the root of your GitHub repository.
2. Open **Settings → Pages** in the repository.
3. Under Build and deployment, choose **Deploy from a branch**.
4. Select your branch (usually `main`) and folder `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site.

The hero illustration is embedded in `index.html`. Vocabulary-card and game images load from the relative paths in `assets/vocabulary/`. Tailwind CSS and Google Fonts are loaded from external CDNs, so an internet connection is needed for those styling/font resources.
