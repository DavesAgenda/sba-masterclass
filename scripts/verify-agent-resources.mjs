import assert from "node:assert/strict";

const base = process.argv[2] || "http://localhost:3002";
const canonical = "https://sitesbyagents.com";
const pages = ["about", "get-help", "guide", "prompts", "faq", "agents", "contact", "privacy"];
const documents = [
  "index.md",
  ...pages.map((p) => `${p}.md`),
  "llms.txt",
  "llms-full.txt",
];
const results = new Map();

for (const name of documents) {
  const response = await fetch(`${base}/${name}`);
  assert.equal(response.status, 200, name);
  assert.match(
    response.headers.get("content-type"),
    name.endsWith(".md") ? /text\/markdown.*utf-8/ : /text\/plain.*utf-8/,
  );
  assert.match(response.headers.get("link"), /rel="canonical"/);
  assert.match(response.headers.get("link"), /llms\.txt.*rel="describedby"/);
  const body = await response.text();
  assert.ok(body.startsWith("# "), `${name}: Markdown heading`);
  assert.ok(
    !body.includes("<!DOCTYPE") && !body.includes("<script"),
    `${name}: plain content`,
  );
  results.set(name, body);
  const head = await fetch(`${base}/${name}`, { method: "HEAD" });
  assert.equal(head.status, 200, `${name}: HEAD`);
  assert.equal(await head.text(), "", `${name}: HEAD body`);
}

for (const name of ["index.md", ...pages.map((p) => `${p}.md`)]) {
  assert.ok(
    results.get("llms-full.txt").includes(results.get(name)),
    `${name}: full bundle parity`,
  );
}

for (const match of results
  .get("llms.txt")
  .matchAll(/\]\((https:\/\/sitesbyagents\.com[^)]+)\)/g)) {
  const response = await fetch(match[1].replace(canonical, base));
  assert.equal(response.status, 200, `Index link: ${match[1]}`);
}

for (const slug of ["", ...pages]) {
  const markdownResponse = await fetch(`${base}/${slug}`, { headers: { Accept: "text/markdown" } });
  assert.equal(markdownResponse.status, 200);
  assert.match(markdownResponse.headers.get("content-type"), /text\/markdown/);
  assert.match(markdownResponse.headers.get("vary"), /Accept/i);
  assert.equal(await markdownResponse.text(), results.get(`${slug || "index"}.md`), `${slug}: negotiated parity`);
  const response = await fetch(`${base}/${slug}`);
  assert.equal(response.status, 200, `HTML: ${slug || "/"}`);
  assert.match(
    response.headers.get("link"),
    /rel="alternate"; type="text\/markdown"/,
  );
  const html = await response.text();
  assert.match(response.headers.get("vary"), /Accept/i);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  const canonicalTag = html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0];
  const canonicalHref = canonicalTag?.match(/href="([^"]+)"/)?.[1];
  assert.equal(
    canonicalHref?.replace(/\/$/, ""),
    `${canonical}/${slug}`.replace(/\/$/, ""),
    `${slug}: canonical`,
  );
  assert.match(
    html,
    /rel="alternate"[^>]*type="text\/markdown"|type="text\/markdown"[^>]*rel="alternate"/,
  );
  assert.ok(html.includes('rel="describedby"'), `${slug}: index discovery`);
  assert.ok(html.includes("valid-agenda-white.svg"), `${slug}: logo`);
  const scripts = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  assert.ok(scripts.length > 0, `${slug}: structured data`);
  for (const script of scripts) JSON.parse(script[1]);
  if (slug) {
    const markdownTitle = results.get(`${slug}.md`).split("\n")[0].slice(2);
    const htmlTitle = html
      .match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]
      .replaceAll("&#x27;", "'")
      .replaceAll("&amp;", "&");
    assert.equal(
      htmlTitle,
      markdownTitle,
      `${slug}: visible/Markdown title parity`,
    );
  }
}
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
for (const accept of ["text/markdown", "text/html"]) {
  const missing = await fetch(`${base}/missing-agent-check-page`, { headers: { Accept: accept } });
  assert.equal(missing.status, 404);
  assert.ok(missing.headers.get("content-type").includes(accept));
  assert.match(await missing.text(), /guide/);
}
for (const accept of ["text/markdown;q=0, text/html", "text/html, text/markdown;q=0.5", "text/html, text/markdown"]) {
  const html = await fetch(base, { headers: { Accept: accept } });
  assert.match(html.headers.get("content-type"), /text\/html/);
}
const negotiatedHead = await fetch(base, { method: "HEAD", headers: { Accept: "text/markdown" } });
assert.equal(negotiatedHead.status, 200);
assert.equal(await negotiatedHead.text(), "");
assert.match(negotiatedHead.headers.get("content-type"), /text\/markdown/);
for (const [from, to] of [["for-agents", "agents"], ["how-it-works", "guide"]]) {
  const redirect = await fetch(`${base}/${from}`, { redirect: "manual" });
  assert.equal(redirect.status, 308);
  assert.ok(redirect.headers.get("location").endsWith(`/${to}`));
}
for (const slug of pages)
  assert.ok(sitemap.includes(`${canonical}/${slug}`), `Sitemap: ${slug}`);
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.ok(robots.includes(`Sitemap: ${canonical}/sitemap.xml`));
assert.ok(robots.includes("Allow: /"));
assert.equal((await fetch(`${base}/not-a-document.md`)).status, 404);
assert.equal(
  (await fetch(`${base}/images/valid-agenda-white.svg`)).status,
  200,
);
console.log(
  `Verified ${documents.length} text resources, ${pages.length + 1} HTML pages, metadata, JSON-LD, parity, discovery links, sitemap, robots, HEAD and unknown-resource handling.`,
);
