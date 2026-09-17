# Recording alignment — 17 September 2026

Source: https://web.descript.com/25e41403-5333-4388-8df4-8eefc25605ff/3eee0

The Descript transcript was queried for the demonstrated workflow. Clip boundaries
were then checked against transcript word boundaries. The original full composition
was preserved; six separate excerpt compositions were created for the guide.

## Editorial decisions

- Add a supplementary post-launch agent readiness check using https://is-agentic.com/.
  This is an extra workflow, not claimed as a recorded demonstration. Share its
  preparation, scan steps and prompt across the book, guide and prompt library.

- Follow ChatGPT planning and design references → Codex brief → preview and feedback
  → GitHub → Vercel → domain. Include the later branch/preview/merge update cycle.
- Teach what the learner asks and checks. Codex handled local servers, checks and Git
  operations in the recording. Account connections and review remain learner actions.
- Keep commands in an explicitly optional deeper-reading section. Do not require
  Node.js, terminal or Git command knowledge in the main path.
- Prompts are reusable adaptations, not claimed verbatim quotations.
- Avoid teaching model names, quota figures or deployment speed as requirements.
- DNS values are project-specific. The deliberate deletion of demo records is not
  a required learner step. Preserve unrelated records, especially email.
- The six clips are published as unlisted YouTube videos. Both book and written
  guide use those embeds and watch links. Descript remains the editing source;
  the full YouTube replay remains available. IDs are recorded in content/video.ts.

## Exact source ranges and new compositions

| Topic | Source seconds | Composition |
| --- | --- | --- |
| Three tools | 563.854–658.904 | 4c0b17f2-d72f-4ef8-a5c6-914dded0b2fc |
| Design to brief | 2160.212–2432.976 | 6d5ec3e9-dce2-4c66-87e6-9e70705dd841 |
| GitHub | 5650.522–5961.506 | 1ef6b7e0-9f9b-42c9-93f6-7d7e1253e6ae |
| Vercel | 5985.676–6095.008 | ed0fd0ef-0d26-4350-a197-324ef0524f96 |
| Domain | 6265.814–6456.440 | 5d370194-736c-4511-bd60-9fe43435abf5 |
| Review and merge | 7689.532–7863.276 | 55d3a763-ddfa-4504-8863-d9e7d1f1e303 |

The local-server explanation is at 2953.8–2973.7 seconds. Dave describes Codex
running a mini web server on his desktop so it can run, review and test the site.

`content/tutorial.ts`, `content/prompts.ts` and `content/information.ts` hold the
written lessons. `content/video.ts` holds clip metadata used by the HTML guide and
its generated Markdown, keeping public and machine-readable resources aligned.
