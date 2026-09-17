export const starterPrompt = `Build a small website using Next.js, TypeScript and Tailwind CSS.

The site should:
- Purpose: [what the website should do]
- Audience: [who it is for]
- Visual direction: [colours, typography and references]
- Sections: [the content visitors need]

Keep the architecture simple. Use reusable components.
Do not add a database, authentication or backend unless required.
Use accessible HTML and responsive layouts.

The project should run with npm run dev, pass linting and
npm run build, and be deployable to Vercel.
Explain how to preview it and which files I can edit.`;

export type Prompt = { title: string; description: string; text: string };
export const prompts: Prompt[] = [
  {
    title: "Improve the mobile layout",
    description: "Give the small screen the same care.",
    text: "Review this page at mobile widths and fix any overflow, cramped spacing or layouts that should stack vertically. Check tap targets and code blocks. Preserve the desktop design.",
  },
  {
    title: "Make the design less generic",
    description: "More intention. Less decoration.",
    text: "Review the visual design for generic AI/SaaS patterns. Remove unnecessary gradients, decorative cards and visual clutter. Use stronger typography, spacing and a more deliberate visual hierarchy instead.",
  },
  {
    title: "Check before deployment",
    description: "Turn a working draft into a site you can publish.",
    text: "Prepare this project for production deployment. Run linting and the production build. Fix any errors. Check for broken links, console errors, obvious accessibility problems and mobile overflow. Do not make unrelated design changes. Summarise what you tested and any remaining issues.",
  },
];
