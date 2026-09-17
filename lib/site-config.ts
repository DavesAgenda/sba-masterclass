export const siteConfig = {
  name: "Sites by Agents",
  domain: "sitesbyagents.com",
  attribution: "Valid Agenda",
  description:
    "Learn how to build a website with an AI coding agent, publish it to GitHub, deploy it with Vercel and connect your own domain.",
  webinarUrl: "https://www.youtube.com/watch?v=W12o95rBnCA",
  githubUrl: "https://github.com/DavesAgenda/sba-masterclass",
};

export const siteUrl = `https://${siteConfig.domain}`;

// Accept standard YouTube watch, live, share and embed links. No arbitrary iframe origins.
export function youtubeEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = url.pathname.split("/")[1];
    if (
      ["youtube.com", "youtube-nocookie.com", "m.youtube.com"].includes(host)
    ) {
      id =
        url.searchParams.get("v") ??
        url.pathname.match(/^\/(?:live|embed|shorts)\/([^/]+)/)?.[1] ??
        null;
    }
    return id && /^[\w-]{11}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : null;
  } catch {
    return null;
  }
}

