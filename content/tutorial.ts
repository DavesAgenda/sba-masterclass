export type TutorialStep = {
  id: string;
  number: string;
  name: string;
  title: string;
  summary: string;
  objective: string;
  needs: string;
  actions: string[];
  result: string;
  detail: { title: string; text: string };
  link?: { label: string; href: string };
  snippet?: string;
  snippetLabel?: string;
};
export const steps: TutorialStep[] = [
  {
    id: "prompt",
    number: "01",
    name: "Prompt",
    title: "Start with a clear brief.",
    summary: "Describe what you want to make, and who it is for.",
    objective: "Give your agent enough context to build something useful.",
    needs: "A coding agent, a project folder and an idea.",
    actions: [
      "Open your coding agent in an empty project folder. Codex, Claude Code or another capable agent can work.",
      "Describe the purpose, audience, content and visual direction. Add a reference if you have one.",
      "Adapt the starter prompt below. Ask the agent to create the files and explain how to preview the result.",
    ],
    result: "A website project saved in a folder you control.",
    detail: {
      title: "What makes a useful brief?",
      text: "Be specific about what visitors should be able to do. ‘A one-page site for a local architect, with three projects and an email link’ gives the agent more direction than ‘make a modern website’. Review the proposed scope and keep the first version small.",
    },
  },
  {
    id: "build",
    number: "02",
    name: "Build",
    title: "Run it. Look at it. Refine it.",
    summary: "Preview locally and work with the agent to refine it.",
    objective: "Turn the first draft into a site you are happy to share.",
    needs: "Your project folder, Node.js and a terminal.",
    actions: [
      "Install a current Node.js LTS release if it is not already available. Open a terminal in the project folder.",
      "Run the commands below, then open the local address printed in the terminal. Keep the terminal running while you work.",
      "Review the copy, links and layout at desktop and mobile sizes. Tell the agent what to change, then check the result.",
      "Before publishing, ask the agent to run the production build and fix errors. Run the project’s lint command too, if configured.",
    ],
    snippet: "npm install\nnpm run dev",
    snippetLabel: "In your project folder",
    result: "A working local preview, with a successful production build.",
    detail: {
      title: "You can use normal language",
      text: "Try ‘Make the heading smaller’, ‘Reduce the spacing between these sections’, or ‘Stack this layout on mobile’. Make one clear request at a time and check it. If a command fails, share the full error with your agent instead of guessing at a fix.",
    },
    link: { label: "Get Node.js", href: "https://nodejs.org/en/download" },
  },
  {
    id: "github",
    number: "03",
    name: "GitHub",
    title: "Give your code a home.",
    summary: "Keep the source code versioned, backed up and portable.",
    objective: "Save a version of your site outside your computer.",
    needs: "A GitHub account and Git or GitHub Desktop.",
    actions: [
      "Create an empty repository on GitHub. A repository is the project’s home: its files and change history.",
      "Ask your agent to initialise Git and review which files will be included. Exclude passwords, .env files, node_modules and build output.",
      "Make a commit: a named snapshot of your changes. Connect the local project to your new GitHub repository.",
      "Push the commit to GitHub, then open the repository online and check that your source files are there. Your agent may be able to run these steps with your permission.",
    ],
    snippet: "Local project  →  commit  →  push  →  GitHub",
    snippetLabel: "The useful mental model",
    result: "Your source files and a first commit are visible on GitHub.",
    detail: {
      title: "Repository, commit and push",
      text: "The repository holds the project. A commit records a set of changes locally, with a message describing them. A push sends those commits to GitHub. Commit and push after meaningful updates so you have a history to return to. A private repository can still be connected to Vercel.",
    },
    link: {
      label: "GitHub’s publishing guide",
      href: "https://docs.github.com/en/repositories/creating-and-managing-repositories/adding-locally-hosted-code-to-github",
    },
  },
  {
    id: "deploy",
    number: "04",
    name: "Deploy",
    title: "Put your site on the internet.",
    summary: "Connect the repository to a host and publish your site.",
    objective: "Make the website available to visitors.",
    needs: "Your GitHub repository and a Vercel account.",
    actions: [
      "Sign in to Vercel. Choose Add New → Project, connect GitHub and grant access to the repository you want to deploy.",
      "Import the repository. Check that Vercel detects Next.js and that the root directory contains package.json. Keep the default build settings for this simple site.",
      "Select Deploy. If the build fails, copy the relevant build log into your agent and fix the source, then commit and push again.",
      "Open the supplied .vercel.app address. Test navigation, mobile layout and video playback on the deployed site.",
    ],
    result: "A public website at a .vercel.app address.",
    detail: {
      title: "This is where the workflow clicks",
      text: "Once GitHub and Vercel are connected, a push to the production branch can automatically build and publish the next version. Other branches can get preview links so you can review changes before they reach the main site.",
    },
    link: {
      label: "How Vercel Git deployments work",
      href: "https://vercel.com/docs/deployments/git",
    },
  },
  {
    id: "domain",
    number: "05",
    name: "Domain",
    title: "Make the address your own.",
    summary: "Connect a domain to the site you have just published.",
    objective: "Let people find your website at an address you own.",
    needs: "A registered domain and access to its DNS settings.",
    actions: [
      "Buy a domain from a registrar, or use one you already own. In Vercel, open your project’s Settings → Domains and add it.",
      "Vercel will show the DNS records it needs. At the provider managing your DNS, copy the exact record types, names and values it gives you.",
      "Keep unrelated records, especially those for email. If you want both the root domain and www, add both in Vercel and choose the primary address.",
      "Wait for DNS verification and HTTPS to complete, then visit the domain. Update your site’s canonical domain configuration and redeploy if it has changed.",
    ],
    result: "Your own domain opens your website securely over HTTPS.",
    detail: {
      title: "Why does it sometimes take a while?",
      text: "DNS changes need time to reach different networks. Use Vercel’s domain status to check progress. If verification fails, confirm which provider actually manages your nameservers and compare every record with Vercel’s instructions. Use the values shown for your project; do not copy a random IP address from an old guide.",
    },
    link: {
      label: "Vercel’s domain setup guide",
      href: "https://vercel.com/docs/domains/working-with-domains/add-a-domain",
    },
  },
];
