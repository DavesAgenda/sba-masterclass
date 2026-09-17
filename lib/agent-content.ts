import { informationPages, type InformationPage } from "@/content/information";
import { siteConfig, siteUrl } from "./site-config";
import { clipShareUrl } from "@/content/video";

const absolute = (url: string) =>
  url.startsWith("/") ? `${siteUrl}${url}` : url;
export function pageMarkdown(page: InformationPage) {
  return (
    `# ${page.title}\n\n> ${page.description}\n\nCanonical: ${siteUrl}/${page.slug}\nPublisher: [Valid Agenda](${siteConfig.validAgendaUrl})\n\n` +
    page.sections
      .map((section) =>
        [
          `## ${section.title}`,
          ...(section.paragraphs ?? []),
          ...(section.items?.length
            ? [section.items.map((item) => `- ${item}`).join("\n")]
            : []),
          ...(section.code ? [`\`\`\`text\n${section.code}\n\`\`\``] : []),
          ...(section.video ? [
            `Video: [${section.video.title}](${clipShareUrl(section.video)}) (${section.video.duration}; source ${section.video.sourceTime}).`,
            section.video.summary,
          ] : []),
          ...(section.links?.length
            ? [
                section.links
                  .map((link) => `- [${link.label}](${absolute(link.href)})`)
                  .join("\n"),
              ]
            : []),
        ].join("\n\n"),
      )
      .join("\n\n") +
    "\n"
  );
}
export const homeMarkdown = `# Sites by Agents

> Build and launch your own website with an AI coding agent. A practical educational guide by Valid Agenda.

Canonical: ${siteUrl}/

The interactive book teaches five stages from the recorded masterclass: plan in ChatGPT and brief Codex, let Codex build and preview, ask it to save to GitHub, deploy with Vercel, and connect a domain. The written guide also covers reviewing and publishing later updates. Codex handles the local server and GitHub commands; you choose the direction and check the result.

## Read and build

- [Complete written guide](${siteUrl}/guide.md): All five learning stages, setup instructions and official references.
- [Prompt library](${siteUrl}/prompts.md): The starter prompt and follow-up prompts.
- [Webinar](${siteConfig.webinarUrl}): Watch the original walkthrough on YouTube.
- [FAQ](${siteUrl}/faq.md): Ownership, costs, tools and support.

## Beyond the website

- [About Sites by Agents](${siteUrl}/about.md): The educational project and its connection to Valid Agenda.
- [Get help](${siteUrl}/get-help.md): Support when DIY feels overwhelming and fractional technology advice for the next business challenge.
- [Valid Agenda](${siteConfig.validAgendaUrl}): Official service information.
- [Book a conversation](${siteConfig.validAgendaBookingUrl}): Discuss scope, availability and fees directly.

## Resources

- [Agent resources](${siteUrl}/agents.md)
- [Source repository](${siteConfig.githubUrl})
`;

export const llmsIndex = `# Sites by Agents

> A practical website-building guide by Valid Agenda. Learn to brief an AI coding agent, test locally, use GitHub, deploy and connect a domain.

This is an educational site, not an autonomous agent service. The guide is free to read; third-party tools may charge fees. Valid Agenda provides separately agreed advice and support. These documents are generated from the same content as the public HTML pages. Cite each document's canonical URL when referring to it.

## Learning

- [Overview](${siteUrl}/index.md): The project, learning path and webinar link.
- [Complete guide](${siteUrl}/guide.md): Five stages from brief to domain.
- [Prompts](${siteUrl}/prompts.md): Starter and refinement prompts.
- [FAQ](${siteUrl}/faq.md): Practical answers about tools, costs, ownership and support.

## People and help

- [About](${siteUrl}/about.md): Sites by Agents and Valid Agenda.
- [Get help](${siteUrl}/get-help.md): Help with DIY builds and fractional technology advice beyond the website.

## Optional

- [Agent resources](${siteUrl}/agents.md): Supported formats and scope.
- [Full content](${siteUrl}/llms-full.txt): All public written content in one file.
- [Source code](${siteConfig.githubUrl}): The website project.
`;

export const agentDocuments = new Map<
  string,
  { body: string; canonical: string }
>([
  ["index.md", { body: homeMarkdown, canonical: `${siteUrl}/` }],
  ...informationPages.map(
    (page) =>
      [
        `${page.slug}.md`,
        { body: pageMarkdown(page), canonical: `${siteUrl}/${page.slug}` },
      ] as const,
  ),
  ["llms.txt", { body: llmsIndex, canonical: `${siteUrl}/agents` }],
  [
    "llms-full.txt",
    {
      body: [homeMarkdown, ...informationPages.map(pageMarkdown)].join(
        "\n---\n\n",
      ),
      canonical: `${siteUrl}/agents`,
    },
  ],
]);
