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
    needs: "An idea, ChatGPT for planning, and the Codex desktop app for building.",
    actions: [
      "Start in ChatGPT. Describe who the site is for, what it should say and what visitors should do. Ask for a short plan.",
      "Ask ChatGPT for design mockups. Share your colours, logo or a site you like, then choose a direction. In the stream, Dave explored several ideas before choosing the book layout.",
      "Ask ChatGPT to turn the chosen design into a build brief for Codex, using Next.js and Vercel. You can copy these names without learning the technology.",
      "Create a project folder in Codex. Paste in the brief and attach the design reference. Ask it to build the site and show you a preview.",
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
    title: "Ask Codex to show you the site.",
    summary: "Preview locally and work with the agent to refine it.",
    objective: "Turn the first draft into a site you are happy to share.",
    needs: "Your Codex project and the brief from step 1.",
    actions: [
      "Ask Codex to build the site, start the preview and open it for you. In the stream, Codex ran the local web server and checked the site itself.",
      "If Codex asks you to sign in, approve access or finish a setup step, follow its instructions. Ask it to explain anything unfamiliar.",
      "Read the page and try the links. Check it at phone and desktop sizes. Describe changes in ordinary language, or attach a screenshot.",
      "Ask Codex to check the site and fix errors before publishing. Review the result yourself too.",
    ],
    snippet: "Start the site and open a preview for me. Check that it works on a phone and a computer, fix any errors, and explain anything I need to do in plain English.",
    snippetLabel: "Ask Codex",
    result: "A working local preview, with a successful production build.",
    detail: {
      title: "You can use normal language",
      text: "Try ‘Make the heading smaller’, ‘Reduce the spacing between these sections’, or ‘Stack this layout on mobile’. Make one clear request at a time and check it. If a command fails, share the full error with your agent instead of guessing at a fix.",
    },
  },
  {
    id: "github",
    number: "03",
    name: "GitHub",
    title: "Give your code a home.",
    summary: "Keep the source code versioned, backed up and portable.",
    objective: "Save a version of your site outside your computer.",
    needs: "A GitHub account connected to Codex.",
    actions: [
      "Create an empty repository on GitHub: a folder online for your site and its history. Dave made this demo public so viewers could read the source; choose the visibility that suits your project.",
      "In Codex, connect the GitHub plugin and complete the sign-in and access prompts, as demonstrated in the stream.",
      "Copy your repository’s URL into Codex and ask it to save the site there. Codex handled the Git setup, commit and push in the demonstration.",
      "Open the repository in your browser and confirm the files arrived. You do not need to type Git commands to follow this walkthrough.",
    ],
    snippet: "Here is my GitHub repository: [paste URL]. Save this site there. Check that passwords and private files are excluded, push the project, and tell me when I can see it on GitHub.",
    snippetLabel: "Ask Codex",
    result: "Your source files and a first commit are visible on GitHub.",
    detail: {
      title: "Repository, commit and push",
      text: "The repository holds the project. A commit saves a snapshot of changes. A push sends it to GitHub. Ask Codex to handle both after meaningful updates so you have a history to return to. A private repository can also be connected to Vercel.",
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
      "Sign in to Vercel with GitHub, as Dave did. Choose Add New → Project and allow access to your site’s repository.",
      "Import your repository. Vercel recognised this Next.js site, so Dave kept the suggested settings.",
      "Select Deploy. If it fails, share the error with Codex and ask it to fix the site and save the update to GitHub.",
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
      "Wait for Vercel to confirm the connection, then visit your domain. Tell Codex the final address and ask it to update the site’s links and settings if needed.",
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
