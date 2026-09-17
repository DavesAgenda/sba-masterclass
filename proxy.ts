import { NextRequest, NextResponse } from "next/server";
import { agentDocuments } from "@/lib/agent-content";
import { siteUrl } from "@/lib/site-config";
import { prefersMarkdown } from "@/lib/accept-markdown";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  if (!["GET", "HEAD"].includes(request.method)) return NextResponse.next();
  const aliases: Record<string, string> = { "/for-agents": "/agents", "/how-it-works": "/guide" };
  if (aliases[path]) return NextResponse.redirect(new URL(aliases[path], request.url), 308);
  // Assets and explicit resources keep their own MIME types and caching rules.
  if (path.startsWith("/_next/") || path.includes(".")) return NextResponse.next();
  if (request.headers.get("rsc") === "1") return NextResponse.next();
  if (!prefersMarkdown(request.headers.get("accept") || "")) {
    const response = NextResponse.next();
    response.headers.append("Vary", "Accept");
    return response;
  }
  const resource = agentDocuments.get(path === "/" ? "index.md" : `${path.slice(1)}.md`);
  const body = resource?.body ?? `# Page not found\n\nThis address does not match a public page on Sites by Agents.\n\n- [Written guide](${siteUrl}/guide)\n- [Content index](${siteUrl}/llms.txt)\n- [Sitemap](${siteUrl}/sitemap.xml)\n`;
  return new NextResponse(request.method === "HEAD" ? null : body, {
    status: resource ? 200 : 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "Link": `${resource ? `<${resource.canonical}>; rel="canonical", ` : ""}<${siteUrl}/llms.txt>; rel="describedby"`,
    },
  });
}

export const config = { matcher: "/((?!_next/static|_next/image|images/|social/).*)" };
