# Public content for readers and agents

All routes are prerendered at build time. No authentication or browser interaction is needed to fetch the content.

| HTML | Markdown |
| --- | --- |
| `/` | `/index.md` |
| `/about` | `/about.md` |
| `/get-help` | `/get-help.md` |
| `/guide` | `/guide.md` |
| `/prompts` | `/prompts.md` |
| `/faq` | `/faq.md` |
| `/agents` | `/agents.md` |

- `/llms.txt` is a concise Markdown index with descriptions and links to the relevant documents.
- `/llms-full.txt` combines the overview and all six information pages, including the complete written guide and prompt text.
- Markdown routes use `text/markdown; charset=utf-8`; `.txt` routes use `text/plain; charset=utf-8`.
- HTML advertises Markdown with `rel="alternate" type="text/markdown"` and the index with `rel="describedby"`, in both HTML and HTTP Link headers. Text responses link to their canonical HTML page and the index in HTTP headers.
- `/sitemap.xml` lists the seven HTML routes. `/robots.txt` allows public crawling and points to the sitemap.
- JSON-LD identifies the website, publisher and information pages; the FAQ markup uses the same questions and answers visible on the page.
- The written guide and prompts are rendered into HTML on the server. Only copying needs client-side JavaScript. The interactive book remains the visual home page.

## Maintenance

Edit the shared data in `content/information.ts`, `content/tutorial.ts` and `content/prompts.ts`. Text representations are generated from those files, not maintained independently. Booking and brand URLs are in `lib/site-config.ts`.

Run `npm run build`, serve the resulting production build, then run:

```sh
node scripts/verify-agent-resources.mjs http://localhost:3002
```

This tests MIME types, HEAD requests, link discovery, full-bundle parity, matching HTML/Markdown titles, canonical URLs, JSON-LD parsing, the index's local links, sitemap, robots and unknown-document 404 responses.

## Scope

The site publishes educational content and referrals. It has no booking, purchase or autonomous-task API, so it does not publish an OpenAPI specification, legacy AI-plugin manifest, MCP endpoint or A2A agent card. Repository `AGENTS.md` describes development conventions; the public `/agents.md` describes the website's reading resources. Neither grants permission to perform actions for a visitor.

`llms.txt` is an emerging convention, not a ranking guarantee or access-control mechanism. Discovery here uses explicit `.md` URLs rather than varying the same URL by user agent or Accept header, avoiding cache-dependent representation mix-ups.

References checked during implementation:

- https://llmstxt.org/ — index structure, Markdown alternatives and link relations.
- https://developers.google.com/search/docs/appearance/ai-features — crawlability, textual content and matching structured data remain relevant; special AI files are not required for Google AI search eligibility.
- https://www.validagenda.com/brand — official identity source; the white variant is requested by the site owner.
