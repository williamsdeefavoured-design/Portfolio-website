# Soteria portfolio

Unzip this folder and open index.html to preview the portfolio. Images are served by Cloudinary and the fonts are loaded from Google Fonts, so preview it with an internet connection.

## Edit the intro
The three dots and SOTERIA text are in index.html under intro-loader. Animation curves, timing and keyframes are at the end of style.css. The display duration, reduced-motion handling and dismissal logic are in intro.js. Other portfolio interactions and the email draft form are in script.js.

## Deploy on Vercel
From the extracted folder containing index.html, run npx vercel login, followed by npx vercel --prod. Choose your account and project when prompted. This is a static site with no build command and no application secrets.
