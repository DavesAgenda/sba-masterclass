"use client";
import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
export function CopyBlock({
  text,
  label = "Prompt",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const code = useRef<HTMLElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      if (code.current) {
        const range = document.createRange();
        range.selectNodeContents(code.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setStatus("error");
    }
  }
  return (
    <div className="copy-block">
      <div className="copy-header">
        <span>{label}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${label.toLowerCase()}`}
        >
          {status === "copied" ? (
            <Check aria-hidden="true" size={14} />
          ) : (
            <Copy aria-hidden="true" size={14} />
          )}
          <span>{status === "copied" ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre tabIndex={0} aria-label={label}>
        <code ref={code}>{text}</code>
      </pre>
      <span
        className={status === "error" ? "copy-error" : "sr-only"}
        role="status"
      >
        {status === "copied"
          ? "Copied to clipboard."
          : status === "error"
            ? "Clipboard access is unavailable. Text selected — use your device’s copy command."
            : ""}
      </span>
    </div>
  );
}
