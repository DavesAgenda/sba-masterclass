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
        // Request format variation where supported. Vercel's static HTML layer
        // supplies its own Vary; its CDN includes Accept in the cache key.
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
