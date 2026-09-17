"use client";

import { useState } from "react";
import { clipShareUrl, type LessonClip } from "@/content/video";

export function LessonVideo({ clip }: { clip: LessonClip }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure className="lesson-video">
      <div className="lesson-video-player">
        {loaded ? (
          <iframe
            title={clip.title}
            src={`https://share.descript.com/embed/${clip.shareId}`}
            allow="encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button onClick={() => setLoaded(true)} aria-label={`Load clip: ${clip.title}`}>
            <span aria-hidden="true">▶</span>
            <strong>{clip.title}</strong>
            <span>Watch this step · {clip.duration}</span>
          </button>
        )}
      </div>
      <figcaption>
        <p>{clip.summary}</p>
        <a href={clipShareUrl(clip)} target="_blank" rel="noreferrer">Open clip and transcript ↗</a>
        <span>From {clip.sourceTime} in the masterclass</span>
      </figcaption>
    </figure>
  );
}
