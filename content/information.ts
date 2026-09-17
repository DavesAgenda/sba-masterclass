import { steps, agentReadiness } from "./tutorial";
import { prompts, starterPrompt, agentReadinessPrompt } from "./prompts";
import { siteConfig } from "@/lib/site-config";
import { lessonClips, type LessonClip } from "./video";

export type Section = {
  id?: string;
  video?: LessonClip;
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
    slug: "contact", label: "Contact", eyebrow: "CONTACT THE PUBLISHER",
    title: "Talk to Valid Agenda.",
    description: "Contact Valid Agenda about Sites by Agents, a problem with the guide, or help with your next website project.",
    sections: [
      { title: "Questions about this guide", paragraphs: [
        "Sites by Agents is an educational project by Valid Agenda Pty Ltd, led by Dave Pengelley. If you spot an unclear instruction, a broken link or a problem playing a lesson, tell us which page you were using and what happened. Include the public page address and the device or browser you were using so we can understand the issue.",
      ], links: [{ label: "Email help@validagenda.com", href: `mailto:${siteConfig.contactEmail}` }] },
      { title: "Help with your project", paragraphs: [
        "For advice about a build or wider technology decisions, use Valid Agenda’s booking page. Bring your goal, what you have tried and where you are stuck. Any paid work, scope, availability and fees are agreed separately; reading this guide does not create a service agreement. Do not include passwords, API keys or private customer information in an enquiry.",
      ], links: [{ label: "Book a conversation", href: siteConfig.validAgendaBookingUrl }, { label: "Support options", href: "/get-help" }] },
      { title: "Privacy questions", paragraphs: ["Use the same email address for questions about personal information or to request access or correction. The privacy page explains how this educational site works and links to the publisher’s policy."], links: [{ label: "Read the privacy information", href: "/privacy" }] },
    ],
  },
  {
    slug: "privacy", label: "Privacy", eyebrow: "HOW THIS SITE WORKS",
    title: "Privacy on Sites by Agents.",
    description: "How this educational site, embedded videos and external contact links handle information, with a route to Valid Agenda’s privacy policy.",
    sections: [
      { title: "Reading the guide", paragraphs: [
        "You can read Sites by Agents without an account or submitting a contact form. The site is hosted on Vercel. Loading pages makes requests to the hosting service, which receives technical information such as your IP address, browser details and requested URLs to deliver the site.",
      ] },
      { title: "Google Analytics", paragraphs: [
        "The live site uses Google Analytics to understand visits and how people use the guide. Google’s tag can collect page views, referral information, browser and device information, and interactions enabled in the Analytics settings. It can use cookies to distinguish visits. Requests go to Google, whose privacy policy explains its handling of that information. Browser privacy controls and tracking blockers may limit collection.",
      ], links: [{ label: "How Google uses information from partner sites", href: "https://policies.google.com/technologies/partner-sites" }] },
      { title: "Videos and other websites", paragraphs: [
        "Lesson videos load a YouTube player only after you choose to load them. The player uses youtube-nocookie.com; loading or playing a video still connects your browser to YouTube, whose own privacy terms apply. You can instead use the written lessons. Links to GitHub, Vercel, Is Agentic and other services take you to websites operated under their own policies.",
      ], links: [{ label: "Google and YouTube privacy policy", href: "https://policies.google.com/privacy" }] },
      { title: "Contact and booking", paragraphs: [
        "If you email Valid Agenda or follow its booking link, you choose what information to share through those services. Avoid sending passwords, API keys or confidential customer data. Valid Agenda’s published privacy policy covers its handling of personal information, service providers and requests for access or correction. This page describes the educational site; it does not replace that policy.",
      ], links: [{ label: "Valid Agenda privacy policy", href: siteConfig.privacyUrl }, { label: "Privacy enquiries: help@validagenda.com", href: `mailto:${siteConfig.contactEmail}` }] },
    ],
  },
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
    sections: [
      {
        id: "clips",
        title: "Follow the recording, one step at a time",
        paragraphs: [
          "This is the walkthrough from the 17 September 2026 masterclass, written for people who do not code. ChatGPT helps you plan; Codex builds the site, runs the preview and handles the GitHub work. You choose the direction, connect your accounts and check the result.",
          "The short clips below show key moments from the stream. The prompts are reusable examples adapted from the demonstration. You can follow the written steps without watching the whole recording.",
        ],
        video: lessonClips.tools,
        links: [{ label: "Watch the full masterclass", href: siteConfig.webinarUrl }],
      },
      ...steps
      .map((step) => ({
        id: step.id,
        video: lessonClips[step.id],
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
      })),
        {
          id: "agent-readiness",
          title: agentReadiness.title,
          paragraphs: [agentReadiness.introduction],
          items: agentReadiness.preparation,
        },
        {
          id: "agent-scan",
          title: agentReadiness.scanTitle,
          paragraphs: [agentReadiness.scanIntroduction, agentReadiness.note],
          items: agentReadiness.actions,
          code: agentReadinessPrompt.text,
          links: [{ label: "Check your site with Is Agentic", href: agentReadiness.url }],
        },
        {
          id: "updates",
          title: "After launch: preview a change, then make it live",
          paragraphs: [
            "Dave added the logo and information pages after the first launch. Codex made the changes on a feature branch: a separate version for review. Vercel gave that version a preview address. In this project, main was the version connected to the live site.",
          ],
          items: [
            "Tell Codex what to change and ask it to create a feature branch, check the work and send it to GitHub.",
            "Open the branch’s preview in Vercel. Check the content, links and phone layout. Ask Codex for any fixes.",
            "When you are happy, tell Codex: ‘Merge to main and clean up the branch.’ Codex handled the merge and cleanup in the stream.",
            "Wait for Vercel to finish publishing, then check your real website address too.",
          ],
          video: lessonClips.updates,
          links: [{ label: "Copy the update prompts", href: "/prompts" }],
        },
        {
          title: "Dive deeper: what Codex was doing behind the scenes",
          paragraphs: [
            "You do not need these commands to follow the masterclass. A local server is a temporary preview running on your computer. An address such as localhost:3000 points to that preview; it is not your public website.",
            "In a project like this one, npm install gets the software it needs, npm run dev starts the preview, and npm run build checks that the site can be prepared for hosting. Ask Codex to run them and explain the result. Commands vary by project.",
            "A repository holds your files and history. A commit saves a snapshot; a push sends it to GitHub. Codex performed these operations after Dave connected GitHub and supplied the repository URL.",
          ],
          code: "npm install\nnpm run dev\n# A separate check before publishing:\nnpm run build",
        },
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
      ],
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
          "No coding knowledge is needed to follow this walkthrough. In the stream, Codex wrote the code, ran the local preview and handled GitHub commands. You describe what you want, connect your accounts, follow any setup prompts and check the result.",
        ],
      },
      {
        title: "Which agent and hosting platform should I use?",
        paragraphs: [
          "To follow the recording, use ChatGPT for planning, Codex for building, GitHub for the saved files and Vercel for hosting. Other tools can work, but their setup will differ. Check the plans and terms for the tools you choose.",
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
          "Request a normal page URL with Accept: text/markdown for its Markdown representation, or use its explicit .md link. HTML remains the default. Missing page URLs return HTTP 404 with a Markdown recovery message when that format is requested.",
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
