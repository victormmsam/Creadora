# Cinematic Portfolio Demo

A small filmmaker/video portfolio built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — page structure/content
- `styles.css` — full responsive visual design
- `script.js` — reveal animations, hover previews, mobile menu and demo form behavior

## Preview locally
Open `index.html` directly in a browser, or serve the folder with VS Code Live Server.

## Replace the demo media
The demo currently uses external placeholder images and one public sample MP4. For a real project, create an `assets/` folder and change sources such as:

```html
<source src="assets/videos/hero.mp4" type="video/mp4">
```

For short background loops, aim for web-optimized clips rather than editing masters.

## Deploy to Vercel
1. Put these files in a GitHub repository.
2. Import the repository into Vercel.
3. Vercel can deploy this as a static site with no framework.
4. Connect your custom domain in Vercel's project settings.

## Contact form
The included form is front-end only. Connect it later to a form service or your own backend/API.
