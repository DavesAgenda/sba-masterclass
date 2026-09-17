// Prefer HTML for browser-style ties; only explicit Markdown requests opt in.
export function prefersMarkdown(accept: string) {
  const entries = accept.toLowerCase().split(",").map((part) => {
    const [type, ...parameters] = part.trim().split(";");
    const quality = parameters.find((value) => value.trim().startsWith("q="));
    const q = quality ? Number(quality.trim().slice(2)) : 1;
    return { type, q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0 };
  });
  const markdown = Math.max(0, ...entries.filter((e) => e.type === "text/markdown").map((e) => e.q));
  const html = entries.find((e) => e.type === "text/html")?.q
    ?? entries.find((e) => e.type === "text/*")?.q
    ?? entries.find((e) => e.type === "*/*")?.q
    ?? 0;
  return markdown > 0 && markdown > html;
}
