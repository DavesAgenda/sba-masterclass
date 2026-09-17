import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  turbopack: { root: process.cwd() },
  async headers() {
    const pages = [
      "",
      "about",
      "get-help",
      "guide",
      "prompts",
      "faq",
      "agents",
      "contact",
      "privacy",
    ];
    return pages.map((page) => ({
      source: page ? `/${page}` : "/",
      headers: [
        // Declare this at the CDN layer as well as Proxy: static HTML delivery
        // on Vercel can replace headers set by NextResponse.next().
        { key: "Vary", value: "Accept, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" },
        {
          key: "Link",
          value: `</${page || "index"}.md>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"`,
        },
      ],
    }));
  },
};
export default nextConfig;
