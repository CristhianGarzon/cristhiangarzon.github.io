# Cristhian Garzón — Portfolio

Personal portfolio built with React, TypeScript and Vite. Live at
**https://cristhiangarzon.github.io/portfolio**

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173/portfolio/
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
