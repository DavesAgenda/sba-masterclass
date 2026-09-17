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
    ];
    return pages.map((page) => ({
      source: page ? `/${page}` : "/",
      headers: [
        {
          key: "Link",
          value: `</${page || "index"}.md>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"`,
        },
      ],
    }));
  },
};
export default nextConfig;
