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
  | "agent-ready"
  | "agent-scan"
  | "updates"
  | "publish-update"
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
    title: "Let Codex run the preview.",
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
    kind: "agent-ready",
    chapter: "AFTER LAUNCH",
    label: "HELP AI ASSISTANTS HELP VISITORS",
    title: "Make your site useful to agents.",
  },
  {
    kind: "agent-scan",
    chapter: "CHECK THE LIVE SITE",
    label: "SCAN. FIX. CHECK AGAIN.",
    title: "Ask an agent to check it.",
  },
  {
    kind: "updates",
    chapter: "AFTER LAUNCH",
    label: "PREVIEW BEFORE PUBLISHING",
    title: "Try a change safely.",
  },
  {
    kind: "publish-update",
    chapter: "MAKE IT LIVE",
    label: "REVIEW. APPROVE. PUBLISH.",
    title: "Happy with it? Make it live.",
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
  { label: "Watch", page: 14, hash: "webinar" },
  { label: "Prompts", page: 15, hash: "prompts" },
  { label: "About", page: 19, hash: "about" },
];

// Concise book instructions keep a full step legible on a single printed page.
export const bookInstructions: Record<string, string[]> = {
  build: [
    "Ask Codex to build the site and open a preview. It handled the local server in the stream.",
    "Follow any setup or access prompts. Ask Codex to explain anything unfamiliar.",
    "Read the copy, try the links and check the phone layout. Describe what you want changed.",
    "Ask Codex to run its checks and fix errors. Review the result before publishing.",
  ],
  github: [
    "Create an empty repository on GitHub. This is the project’s home: source files and change history.",
    "Connect the GitHub plugin in Codex and follow the sign-in prompts.",
    "Give Codex your repository URL. Ask it to save the site there and exclude private files. It handles the Git commands.",
    "Refresh the repository in your browser and check that the files arrived.",
  ],
  deploy: [
    "Sign in to Vercel. Choose Add New → Project, connect GitHub and grant access to your repository.",
    "Import it. Vercel recognised the site in the stream, so Dave kept the suggested settings.",
    "Select Deploy. If it fails, share the error with Codex and ask it to fix and save the update.",
    "Open the .vercel.app address and test it. Future pushes to the production branch can automatically publish updates.",
  ],
  domain: [
    "Register a domain or use one you own. In your Vercel project, open Settings → Domains and add it.",
    "At the provider managing your DNS, add the exact record types, names and values Vercel gives you.",
    "Keep unrelated records, especially email. Add the root and www names if wanted, and choose the primary address.",
    "Wait for Vercel to confirm the connection, then visit your domain. Tell Codex the final address so it can update the site’s settings.",
  ],
};
