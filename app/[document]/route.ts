import { agentDocuments } from "@/lib/agent-content";
import { siteUrl } from "@/lib/site-config";

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return [...agentDocuments.keys()].map((document) => ({ document }));
}
export async function GET(
  _request: Request,
  context: { params: Promise<{ document: string }> },
) {
  const { document } = await context.params;
  const resource = agentDocuments.get(document);
  if (!resource)
    return new Response("Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  return new Response(resource.body, {
    headers: {
      "Content-Type": `${document.endsWith(".md") ? "text/markdown" : "text/plain"}; charset=utf-8`,
      "X-Content-Type-Options": "nosniff",
      Link: `<${resource.canonical}>; rel="canonical", <${siteUrl}/llms.txt>; rel="describedby"`,
    },
  });
}
