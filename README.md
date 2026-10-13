# Cristhian Garzón — Portfolio

Personal portfolio built with React, TypeScript and Vite. Live at
**https://cristhiangarzon.github.io**

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # production build into dist/
```

## Edit content

Everything you see on the page — profile, experience, projects, skills,
education — lives in [`src/data.ts`](src/data.ts). Replace `public/profile.jpg`
to change the photo.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages. One-time setup: in the repo go to
**Settings → Pages → Build and deployment → Source** and choose
**GitHub Actions**.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) (no backend or account
needed). The **first** message triggers an activation email to
`cristhianf.garzon@gmail.com` — click the link once and messages will be
delivered from then on. Optionally, replace the email in
`src/components/Contact.tsx` with the random alias FormSubmit gives you so the
address isn't exposed in the page source.

## SEO & AI agents

`seo/plugin.ts` runs at build time and generates everything from `src/data.ts`:

- `<title>`, description, canonical + `hreflang` (English `/`, Spanish `/?lang=es`),
  Open Graph / X cards (image: `public/og-image.jpg`, 1200×630) and schema.org JSON-LD.
- The full page content as plain HTML inside `#root`, so crawlers and AI agents that don't
  run JavaScript can read it. React replaces it when the app loads.
- `robots.txt`, `sitemap.xml`, `llms.txt` and `llms-full.txt` in `dist/`.

After deploying, submit `https://cristhiangarzon.github.io/sitemap.xml` in
[Google Search Console](https://search.google.com/search-console) and
[Bing Webmaster Tools](https://www.bing.com/webmasters).
