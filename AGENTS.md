<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions

- `content/information.ts` is the shared source for information pages and their Markdown versions. Reuse `content/tutorial.ts` and `content/prompts.ts` for the learning material; do not create manually copied text bundles.
- `lib/agent-content.ts` generates `llms.txt`, `llms-full.txt`, and page Markdown, served by `app/[document]/route.ts`. New information pages need an explicit page entry, metadata and an entry in the HTTP discovery headers in `next.config.ts`.
- Keep the home page as one interactive book. Information routes use normal document scrolling and must remain readable without JavaScript.
- Preserve the official logo geometry. The white fill variant is specifically requested by the site owner; see `BRAND.md`.
- Keep referral destinations in `lib/site-config.ts`. Do not invent prices, guarantees, booking APIs or service availability.
- Run `npm run lint`, `npm run build`, then `npm run verify:agents -- http://localhost:PORT` against the production preview. The resource check verifies content parity, headers, canonical URLs, JSON-LD, sitemap and response formats.
- `llms.txt` is a content-discovery convention. It does not confer authorization or guarantee model/search inclusion. Do not add fake MCP, A2A, OpenAPI or plugin manifests without an actual supported service.
