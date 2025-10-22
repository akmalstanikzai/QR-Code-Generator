# QR Code Generator (Vite + React + Tailwind)

A simple single-page app that generates a QR code from text or a URL. Uses:
- Vite (React template)
- React
- Tailwind CSS
- qrcode (to generate PNG data URLs)

## Quick start

1. Create the project (if you didn't copy the files directly):
   - Using npm create (recommended)
     ```
     npm create vite@latest my-qr-app -- --template react
     cd my-qr-app
     ```

2. If you started from the template, replace the files with the ones provided above (or copy the repository contents).

3. Install dependencies:
   ```
   npm install
   ```

4. Install Tailwind's peer tools and run the config command if you didn't already:
   ```
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

   Make sure `tailwind.config.cjs`'s `content` includes `./index.html` and `./src/**/*.{js,jsx}` (the provided config already does).

5. Install the QR generator:
   ```
   npm install qrcode
   ```

6. Run the dev server:
   ```
   npm run dev
   ```

7. Open the URL shown in the terminal (usually http://localhost:5173) to use the app.

## Features
- Live generation of a PNG data URL using the `qrcode` package
- Adjustable size
- Preview and download as PNG
- Copy PNG data URL to clipboard

## Notes
- The app uses the qrcode package to produce PNG data URLs which are displayed in an <img> and can be downloaded.
- If you prefer an SVG-based QR generator, swap `qrcode` with an SVG library (for example `react-qr-code`).