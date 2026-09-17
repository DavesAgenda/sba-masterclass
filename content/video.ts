export type LessonClip = {
  title: string;
  shareId: string;
  youtubeId?: string;
  sourceTime: string;
  duration: string;
  summary: string;
};

// Source ranges were checked against word boundaries in the Descript transcript.
export const lessonClips: Record<string, LessonClip> = {
  tools: {
    title: "Meet the three tools", shareId: "tWPDahjdeDb", sourceTime: "09:24–10:59", duration: "1:35",
    summary: "Dave introduces the agent, GitHub and hosting: the tools used to take an idea to a website you control.",
  },
  prompt: {
    title: "Turn your design into a build brief", shareId: "6uwKLhaDA0c", sourceTime: "36:00–40:33", duration: "4:33",
    summary: "Ask ChatGPT to turn the chosen design into instructions, then copy the brief into Codex. The model and quota discussion reflects the recording; you do not need to match those settings.",
  },
  github: {
    title: "Let Codex save your site to GitHub", shareId: "wLr1wbym39L", sourceTime: "1:34:11–1:39:22", duration: "5:11",
    summary: "Create the repository, connect GitHub in Codex, and give Codex the repository URL. It handles saving and sending the files.",
  },
  deploy: {
    title: "Publish your site with Vercel", shareId: "kbZvjXWI0b7", sourceTime: "1:39:46–1:41:35", duration: "1:49",
    summary: "Sign in with GitHub, import the site, and select Deploy. Then open the new website address.",
  },
  domain: {
    title: "Connect your domain", shareId: "69c2nhnUKkY", sourceTime: "1:44:26–1:47:36", duration: "3:11",
    summary: "Dave copies Vercel’s DNS instructions into Cloudflare. He deliberately removes his demo website records to show the fix; you do not need to repeat that. Use the values for your own project and keep unrelated records, especially email.",
  },
  updates: {
    title: "Review changes and make them live", shareId: "d2uWhouGedA", sourceTime: "2:08:10–2:11:03", duration: "2:54",
    summary: "Check the updated pages in the preview, ask Codex to merge to main and clean up the branch, then check the published site.",
  },
};

export const clipShareUrl = (clip: LessonClip) => clip.youtubeId
  ? `https://www.youtube.com/watch?v=${clip.youtubeId}`
  : `https://share.descript.com/view/${clip.shareId}`;

export const clipEmbedUrl = (clip: LessonClip) => clip.youtubeId
  ? `https://www.youtube-nocookie.com/embed/${clip.youtubeId}?rel=0`
  : `https://share.descript.com/embed/${clip.shareId}`;
