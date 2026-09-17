"use client";

import { useState } from "react";
import { clipEmbedUrl, clipShareUrl, type LessonClip } from "@/content/video";

export function LessonVideo({ clip, compact = false, decorative = false }: { clip: LessonClip; compact?: boolean; decorative?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure className={`lesson-video${compact ? " lesson-video-compact" : ""}`}>
      <div className="lesson-video-player">
        {loaded && !decorative ? (
          <iframe
            title={clip.title}
            src={clipEmbedUrl(clip)}
            allow="encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button onClick={() => setLoaded(true)} tabIndex={decorative ? -1 : undefined} aria-label={`Load clip: ${clip.title}`}>
            <span aria-hidden="true">▶</span>
            <strong>{clip.title}</strong>
            <span>Watch this step · {clip.duration}</span>
          </button>
        )}
      </div>
      <figcaption>
        {!compact && <p>{clip.summary}</p>}
        <a href={clipShareUrl(clip)} target="_blank" rel="noreferrer">{clip.youtubeId ? "Watch on YouTube" : "Open clip and transcript"} ↗</a>
        <span>From {clip.sourceTime} in the masterclass</span>
      </figcaption>
    </figure>
  );
}
