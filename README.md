# love-timeline

Single-page Vite + React + TypeScript app that renders a memory timeline from [src/content.ts](src/content.ts).

## Setup

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploy to GitHub Pages

This project is configured for GitHub Pages with:

- Vite `base: './'` in [vite.config.ts](vite.config.ts)
- `gh-pages` deploy script in [package.json](package.json)

Steps:

1. Create a GitHub repo and push this project.
2. Run:

```bash
npm run deploy
```

3. In GitHub repo settings → Pages, set the source to the `gh-pages` branch.
# denise
