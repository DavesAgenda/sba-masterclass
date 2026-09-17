import { steps } from "./tutorial";
import { prompts, starterPrompt } from "./prompts";
import { siteConfig } from "@/lib/site-config";

export type Section = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  code?: string;
  links?: { label: string; href: string }[];
};
export type InformationPage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  sections: Section[];
};

export const informationPages: InformationPage[] = [
  {
    slug: "about",
    label: "About",
    eyebrow: "THE IDEA BEHIND THE BOOK",
    title: "Build it yourself. Keep the ownership.",
    description:
      "Sites by Agents is a practical learning project by Valid Agenda: build a website with an AI agent and keep control of the result.",
    sections: [
      {
        title: "A useful first project",
        paragraphs: [
          "This guide takes a small website from an initial brief to a local preview, a GitHub repository, hosting and a domain. The interactive book is one way to follow it; the complete written guide and prompt library are here whenever you need to look something up.",
          "You choose the purpose, judge the output and decide what to publish. An AI agent can help with implementation, but reviewing the result is still part of the work.",
        ],
        links: [
          { label: "Read the complete guide", href: "/guide" },
          { label: "Use the prompt library", href: "/prompts" },
        ],
      },
      {
        title: "By Valid Agenda",
        paragraphs: [
          "Valid Agenda is led by Dave Pengelley and helps business owners work out what to build next and how to move it forward. That can include fractional technology and AI advice, focused prototypes, and coordinating specialist support.",
          "Sites by Agents gives you a practical place to start. If the next challenge extends beyond a website, or you would rather have help with the build, there is a route to a conversation.",
        ],
        links: [
          { label: "Find the right help", href: "/get-help" },
          { label: "Explore Valid Agenda", href: siteConfig.validAgendaUrl },
        ],
      },
      {
        title: "Use the tools that fit",
        paragraphs: [
          "The examples use an AI coding agent, GitHub and Vercel. Other agents and hosts can work too. Keep your domain, accounts and repository accessible to you, and understand the services and costs you are choosing.",
        ],
        links: [
          { label: "Watch the webinar", href: siteConfig.webinarUrl },
          { label: "View this site's source", href: siteConfig.githubUrl },
        ],
      },
    ],
  },
  {
    slug: "get-help",
    label: "Get help",
    eyebrow: "YOUR NEXT STEP",
    title: "You don’t have to work it all out alone.",
    description:
      "Get help when a DIY website feels overwhelming, or talk to Valid Agenda about fractional technology and AI advice beyond your website.",
    sections: [
      {
        title: "Stuck in the build?",
        paragraphs: [
          "You may have a working draft but be unsure about the code, hosting or next step. Or the tutorial may have become more work than you wanted to take on. Bring the goal, what you have tried, and the point where progress stopped to a conversation with Valid Agenda.",
        ],
        items: [
          "Work out what needs fixing before you publish.",
          "Decide what to keep doing yourself and where help would be useful.",
          "Discuss a focused piece of support or a more guided build.",
        ],
        links: [
          {
            label: "Talk through your website",
            href: siteConfig.validAgendaBookingUrl,
          },
        ],
      },
      {
        title: "The website is live. What comes next?",
        paragraphs: [
          "A website can bring larger questions into focus: how enquiries reach your team, which tools should connect, where automation would help, or what a new service needs to become viable. Fractional technology advice gives you experienced input for those decisions without starting with a full-time executive hire.",
        ],
        items: [
          "Choose the technology work that supports your business priorities.",
          "Assess AI and automation opportunities against a real workflow.",
          "Scope a prototype or next product before committing to a larger build.",
          "Choose suitable tools, delivery partners and ownership arrangements.",
        ],
      },
      {
        title: "Start with a conversation",
        paragraphs: [
          "Tell Valid Agenda what you want to achieve, what is already in place and where you need support. Discuss scope, availability and fees directly before agreeing to any work. Using this educational site does not sign you up for a service.",
        ],
        links: [
          {
            label: "Book a conversation with Valid Agenda",
            href: siteConfig.validAgendaBookingUrl,
          },
          {
            label: "Learn about Valid Agenda",
            href: siteConfig.validAgendaUrl,
          },
        ],
      },
      {
        title: "A little preparation helps",
        items: [
          "Your website or local preview, if you have one.",
          "The outcome you want and the main obstacle.",
          "Your preferred timing and an indication of budget.",
          "A short description of the tools your business already uses.",
        ],
        paragraphs: [
          "Share context, not passwords or API keys. Access arrangements can be discussed if work is agreed.",
        ],
      },
    ],
  },
  {
    slug: "guide",
    label: "Written guide",
    eyebrow: "FROM PROMPT TO DOMAIN",
    title: "The complete website-building guide.",
    description:
      "A readable, step-by-step guide to briefing an AI agent, testing locally, using GitHub, deploying and connecting your domain.",
    sections: steps
      .map((step) => ({
        title: `${step.number}. ${step.title}`,
        paragraphs: [
          step.objective,
          `You’ll need: ${step.needs}`,
          step.detail.text,
        ],
        items: step.actions,
        code: step.snippet,
        links: [
          ...(step.link ? [step.link] : []),
          ...(step.id === "prompt"
            ? [{ label: "Copy the starter prompt", href: "/prompts" }]
            : []),
        ],
      }))
      .concat([
        {
          title: "Keep moving at your own pace",
          paragraphs: [
            "The book and webinar cover the same learning path. Keep checking the actual result as you build. If you would like support with the next step, speak with Valid Agenda.",
          ],
          items: [],
          code: undefined,
          links: [
            { label: "Watch the webinar", href: siteConfig.webinarUrl },
            { label: "Get help", href: "/get-help" },
          ],
        },
      ]),
  },
  {
    slug: "prompts",
    label: "Prompts",
    eyebrow: "COPY. ADAPT. REVIEW.",
    title: "Give your agent a useful starting point.",
    description:
      "Copyable website-building prompts for your first brief, mobile layout, visual refinement and checks before deployment.",
    sections: [
      {
        title: "Your first website",
        paragraphs: [
          "Replace the bracketed text with your own purpose, audience and content. Start small, check the preview, and make one clear change at a time.",
        ],
        code: starterPrompt,
      },
      ...prompts.map((p) => ({
        title: p.title,
        paragraphs: [p.description],
        code: p.text,
      })),
      {
        title: "When another prompt isn’t the answer",
        paragraphs: [
          "If the scope keeps growing or you cannot tell whether the result is ready, a conversation may be more useful than another iteration.",
        ],
        links: [{ label: "Talk through the next step", href: "/get-help" }],
      },
    ],
  },
  {
    slug: "faq",
    label: "FAQ",
    eyebrow: "A FEW PRACTICAL ANSWERS",
    title: "Before you build. After you launch.",
    description:
      "Answers about AI agents, website ownership, hosting costs and when to ask Valid Agenda for help.",
    sections: [
      {
        title: "Do I need to know how to code?",
        paragraphs: [
          "You can start by describing the site in ordinary language. You will still need to follow setup instructions, review changes and test the result. The written guide gives you a sequence to follow.",
        ],
      },
      {
        title: "Which agent and hosting platform should I use?",
        paragraphs: [
          "Use a coding agent that can work with your project files and explain its changes. The guide uses GitHub and Vercel as examples. Check the current capabilities, pricing and terms of any tool you choose; the site does not require one particular provider.",
        ],
      },
      {
        title: "Who owns the website?",
        paragraphs: [
          "Create and control your repository, hosting account and domain account. Keep copies of your source and content. Check the licences of third-party code, images and fonts you use; owning the project does not transfer those third-party rights.",
        ],
      },
      {
        title: "Is everything free?",
        paragraphs: [
          "This guide and its prompts are free to read. Agents, domains, hosting and other services may charge fees. Check the plans you use and any limits that apply. Advice or delivery work with Valid Agenda is discussed and agreed separately.",
        ],
      },
      {
        title: "What if I feel overwhelmed or the build stops working?",
        paragraphs: [
          "Save your working version and describe the specific issue to your agent. If you want someone to help assess the situation or take a more active role, speak to Valid Agenda about the support you need.",
        ],
        links: [{ label: "Get help with your build", href: "/get-help" }],
      },
      {
        title: "Can Valid Agenda advise on more than websites?",
        paragraphs: [
          "Yes. Discuss the wider technology decisions behind your business: AI opportunities, workflows, prototypes, tools and delivery priorities. Fractional advice can help shape the next step beyond the website.",
        ],
        links: [
          { label: "Explore fractional technology advice", href: "/get-help" },
        ],
      },
    ],
  },
  {
    slug: "agents",
    label: "For agents",
    eyebrow: "OPEN, READABLE CONTENT",
    title: "Read the site in the format you need.",
    description:
      "Machine-readable resources for Sites by Agents, including llms.txt, complete Markdown content and canonical source links.",
    sections: [
      {
        title: "Start here",
        paragraphs: [
          "The same guide, prompts and information pages are available as server-rendered HTML and Markdown. No account, browser automation or page-turn interaction is needed to read them.",
        ],
        links: [
          { label: "llms.txt — concise content index", href: "/llms.txt" },
          {
            label: "llms-full.txt — complete content bundle",
            href: "/llms-full.txt",
          },
          { label: "Home page as Markdown", href: "/index.md" },
        ],
      },
      {
        title: "Find the original page",
        paragraphs: [
          "Each information page links to its Markdown version. HTML metadata and HTTP Link headers advertise the alternate format and llms.txt. Markdown responses link back to their canonical HTML page. The sitemap lists the public HTML pages.",
        ],
        links: [
          { label: "XML sitemap", href: "/sitemap.xml" },
          { label: "Crawler access rules", href: "/robots.txt" },
        ],
      },
      {
        title: "Scope and attribution",
        paragraphs: [
          "This is an educational website by Valid Agenda. These resources describe public content; they do not provide an API for booking, purchases or site management. Follow the official Valid Agenda links for advice and current service details. A visitor must choose to make contact themselves.",
          "Please link to the canonical source when referencing the guide. llms.txt is a discovery convention, not a guarantee that any particular search engine or model will use the content.",
        ],
      },
    ],
  },
];

export function informationPage(slug: string): InformationPage {
  const page = informationPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown information page: ${slug}`);
  return page;
}
