export const starterPrompt = `Build a small website for me, ready to publish on Vercel.

The site should:
- Purpose: [what the website should do]
- Audience: [who it is for]
- Visual direction: [colours, typography and references]
- Sections: [the content visitors need]

Use Next.js, as in the masterclass. Keep the site simple.
Use the attached design or brand reference. Make it easy to read
and use on a phone and a computer.

Build it, start the preview and open it for me.
Run the checks, fix errors and tell me what to review.
Explain any steps I need to do in plain English.`;

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
  {
    title: "Turn a design into a build brief",
    description: "Use in ChatGPT after choosing your design. This follows the planning handoff in the stream.",
    text: "Turn this website idea and chosen design into a brief I can paste into Codex. Use Next.js for deployment on Vercel. Include the audience, pages, content, brand references and what visitors should do. Keep the first version simple. Ask Codex to build it, open a preview and check it for me.",
  },
  {
    title: "Save the site to GitHub",
    description: "Connect GitHub in Codex, then replace the bracketed URL.",
    text: "Here is my GitHub repository: [paste URL]. Save this site there. Exclude passwords and private files. Handle the Git setup, commit and push, then confirm the files are on GitHub.",
  },
  {
    title: "Try an update before it goes live",
    description: "A branch is a separate version you can review. The stream used this for the logo and information pages.",
    text: "Make a feature branch for this change: [describe change]. Build it, check it and push the branch to GitHub. Help me open its Vercel preview so I can review it before changing the live site.",
  },
  {
    title: "Publish an update I have checked",
    description: "Use after reviewing the preview. In the stream, main was the branch Vercel published to the live site.",
    text: "I have checked the preview and am happy with it. Merge this change to main and clean up the feature branch. Confirm the live deployment succeeds and give me the website address to check.",
  },
];
