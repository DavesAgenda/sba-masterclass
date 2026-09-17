export type BookPageKind =
  | "intro"
  | "process"
  | "brief"
  | "starter"
  | "build"
  | "refine"
  | "github"
  | "deploy"
  | "domain"
  | "dns"
  | "webinar"
  | "mobile"
  | "design"
  | "preflight"
  | "tools"
  | "about";
export type BookPage = {
  kind: BookPageKind;
  chapter: string;
  label: string;
  title: string;
};
export const bookPages: BookPage[] = [
  {
    kind: "intro",
    chapter: "CHAPTER 01",
    label: "GET FROM IDEA TO LIVE SITE",
    title: "Build a real website with an AI agent.",
  },
  {
    kind: "process",
    chapter: "THE PROCESS",
    label: "FIVE STEPS TO YOUR WEBSITE",
    title: "From an idea to a live website, in five steps.",
  },
  {
    kind: "brief",
    chapter: "CHAPTER 02",
    label: "01 / PROMPT",
    title: "Tell the agent what you’re building.",
  },
  {
    kind: "starter",
    chapter: "YOUR FIRST PROMPT",
    label: "COPY. ADAPT. BUILD.",
    title: "A good place to start.",
  },
  {
    kind: "build",
    chapter: "CHAPTER 03",
    label: "02 / BUILD",
    title: "Get it working locally.",
  },
  {
    kind: "refine",
    chapter: "MAKE IT YOURS",
    label: "LOOK. ASK. REPEAT.",
    title: "Now change it.",
  },
  {
    kind: "github",
    chapter: "CHAPTER 04",
    label: "03 / GITHUB",
    title: "Give your code a home.",
  },
  {
    kind: "deploy",
    chapter: "GO LIVE",
    label: "04 / DEPLOY",
    title: "Put your site on the internet.",
  },
  {
    kind: "domain",
    chapter: "CHAPTER 05",
    label: "05 / DOMAIN",
    title: "Make the address your own.",
  },
  {
    kind: "dns",
    chapter: "THE LAST CONNECTION",
    label: "DOMAIN → DNS → WEBSITE",
    title: "Your address. Your website.",
  },
  {
    kind: "webinar",
    chapter: "CHAPTER 06",
    label: "WATCH THE WALKTHROUGH",
    title: "Watch this site being built.",
  },
  {
    kind: "mobile",
    chapter: "CHAPTER 07",
    label: "USEFUL PROMPTS / 01",
    title: "Make it work everywhere.",
  },
  {
    kind: "design",
    chapter: "USEFUL PROMPTS / 02",
    label: "GIVE IT SOME CHARACTER",
    title: "Make it feel like you.",
  },
  {
    kind: "preflight",
    chapter: "USEFUL PROMPTS / 03",
    label: "BEFORE YOU PUBLISH",
    title: "One last check.",
  },
  {
    kind: "tools",
    chapter: "THE TOOLKIT",
    label: "KNOW WHAT EACH TOOL DOES",
    title: "A small, capable stack.",
  },
  {
    kind: "about",
    chapter: "THE NEXT CHAPTER",
    label: "IS YOURS TO WRITE",
    title: "Make something worth putting online.",
  },
];
export const bookNavigation = [
  { label: "How it works", page: 1, hash: "how-it-works" },
  { label: "Watch", page: 10, hash: "webinar" },
  { label: "Prompts", page: 11, hash: "prompts" },
  { label: "About", page: 15, hash: "about" },
];

// Concise book instructions keep a full step legible on a single printed page.
export const bookInstructions: Record<string, string[]> = {
  build: [
    "Install Node.js LTS. Open a terminal in the folder your agent created.",
    "Run the commands below. Open the local address printed in the terminal and leave the terminal running.",
    "Review the copy, links and layout on desktop and mobile. Ask the agent for changes, then check the result.",
    "Ask the agent to run npm run build and the project’s lint command. Resolve errors before publishing.",
  ],
  github: [
    "Create an empty repository on GitHub. This is the project’s home: source files and change history.",
    "Ask your agent to initialise Git. Review the files; exclude passwords, .env files, node_modules and build output.",
    "Make a commit, a named snapshot of your changes. Connect the local project to your new repository.",
    "Push the commit to GitHub. Open the repository online and confirm your source files are there. Your agent can often help with these operations.",
  ],
  deploy: [
    "Sign in to Vercel. Choose Add New → Project, connect GitHub and grant access to your repository.",
    "Import it. Confirm Vercel detects Next.js and the root directory contains package.json. Keep the default build settings for this site.",
    "Select Deploy. If it fails, share the build log with your agent, fix the source, then commit and push again.",
    "Open the .vercel.app address and test it. Future pushes to the production branch can automatically publish updates.",
  ],
  domain: [
    "Register a domain or use one you own. In your Vercel project, open Settings → Domains and add it.",
    "At the provider managing your DNS, add the exact record types, names and values Vercel gives you.",
    "Keep unrelated records, especially email. Add the root and www names if wanted, and choose the primary address.",
    "Wait for DNS verification and HTTPS, then visit your domain. Update the site’s canonical domain configuration and redeploy if it has changed.",
  ],
};
