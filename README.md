# Sites by Agents

A lightweight educational website presented as one open book. Next.js App Router, TypeScript, React and Tailwind CSS; a prerendered first spread with a small client-side book reader for scrolling, page turns, copy controls and the on-demand webinar. No accounts, database, API keys or environment variables are required.

## Book interaction

The page displays one book in a sticky viewport. Native document scrolling advances through eight desktop spreads (16 pages). A CSS 3D leaf turns forward or backward as the active spread changes. Previous/next controls and chapter links use the same navigation. Arrow Left/Right, Page Up/Down, Home and End work when focus is outside an interactive control. Narrow viewports show one page at a time; overflowing page content remains scrollable, including at larger text sizes. Reduced-motion preferences switch pages without a 3D turn.

The reader uses no animation library. The chapter sequence lives in `content/book.ts`. The book is interactive and requires JavaScript for page navigation.

## Local setup and development

Install Node.js 20.9 or newer (a current LTS release is recommended). Open a terminal in this directory:

```sh
npm install
npm run dev
```

Open the local address printed by Next.js. Edit files and the page updates automatically. Before publishing:

```sh
npm run lint
npm run typecheck
npm run build
```

Use `npm run start` to serve the production build. Commit `package-lock.json` so installations are reproducible; `npm ci` uses its exact versions.

## Publish the code to GitHub

Create an empty GitHub repository, without a generated README. In this project folder, run the following, replacing the repository URL with the one GitHub gives you:

```sh
git init
git add .
git commit -m "Build Sites by Agents"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
git push -u origin main
```

Authenticate when GitHub requests it. Do not commit credentials or local environment files. `.gitignore` excludes dependencies, build output and environment files. Alternatively, add this folder to GitHub Desktop, commit and publish it.

## Deploy to Vercel

1. Sign in to Vercel and choose **Add New → Project**.
2. Connect GitHub and import the repository you created.
3. Confirm the framework is **Next.js**. Use this folder as the project root, with the default install/build settings; no environment variables are necessary.
4. Deploy, then visit the supplied `.vercel.app` address.
5. Push later changes to your production branch to trigger a new production deployment. Other branches can receive preview deployments.

If this folder is nested inside a larger repository, set Vercel's Root Directory to the folder containing this `package.json`.

## Connect or change the domain

The initial canonical domain is `sitesbyagents.com`. In Vercel, open the project's **Settings → Domains** and add your domain. Copy the exact DNS names, types and values Vercel shows into the DNS provider that controls the domain. Do not assume a fixed IP or CNAME target. Preserve unrelated email and verification records. Add the root and `www` names if wanted and choose which redirects to the other. Wait for Vercel to verify DNS and issue HTTPS.

When the public domain changes, update `domain` in `lib/site-config.ts` and redeploy. That value drives the domain example in the book, canonical URL, Open Graph URL, robots and sitemap. Verify the domain in a browser after propagation.

## Replace the webinar

Edit `webinarUrl` in `lib/site-config.ts`. The initial value is the supplied live webinar:

https://www.youtube.com/watch?v=W12o95rBnCA

YouTube watch, share, live and embed URLs are supported. The player loads only when a visitor requests it and uses `youtube-nocookie.com`. A direct YouTube link remains available for streams that restrict embedding. Setting the URL to an empty string shows the recording placeholder. No video is downloaded or rehosted.

## Update the tutorial and prompts

- `content/tutorial.ts`: five typed learning stages, operational instructions, expected results and supporting links.
- `content/prompts.ts`: starter prompt and reusable prompt library.
- `lib/site-config.ts`: name, domain, attribution, webinar and optional source repository URL. The optional source repository URL is reserved for future repository links.
- `content/book.ts`: page order, chapter links and concise on-page instructions.
- `components/scroll-book.tsx`: native-scroll navigation, responsive reader and page-turn state.
- `components/book-page.tsx`: the 16 page layouts and webinar player.
- `components/prompt-card.tsx`: accessible copy controls.
- `app/book.css`: paper surfaces, spine, page edges, typography, motion and responsive rules.
- `public/images/valid-agenda-book-world.webp`: the optimised shared landscape background; see `ARTWORK.md` for its generation prompt.
- `app/layout.tsx`: page and social metadata. `app/icon.svg`: favicon.

Keep new material short enough to read comfortably on a book page. Add page definitions and corresponding content layouts for longer material. Future tutorial routes can reuse the content without introducing a CMS.

## Accessibility and performance

The reader uses a skip link, semantic landmarks, labelled pages, visible focus indicators, reduced-motion support and keyboard navigation. Turning sheets are inert and hidden from assistive technology; the active page range is announced. Copy controls announce success/failure and select text when clipboard permission is unavailable. The video is an opt-in embed, with no autoplay or third-party request on initial load. Typography uses system fonts. A single 190 KB WebP landscape is reused and served through Next/Image.

## Official references

- [Next.js setup](https://nextjs.org/docs/app/getting-started/installation)
- [Publish local code to GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/adding-locally-hosted-code-to-github)
- [Vercel Git deployments](https://vercel.com/docs/deployments/git)
- [Vercel custom domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain)

Source repository: https://github.com/DavesAgenda/sba-masterclass. The project is prepared for Vercel; GitHub source publishing does not deploy the website or register its domain.


