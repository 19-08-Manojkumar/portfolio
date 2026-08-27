"use client";

import type { CSSProperties } from "react";
import { useTilt } from "@/hooks/use-tilt";

export default function BrowserMockup({
  title,
  tint,
  children,
}: {
  title: string;
  tint: string;
  children: React.ReactNode;
}) {
  const tiltRef = useTilt<HTMLDivElement>(8);
  const beamStyle = {
    "--beam-delay": "0.3s",
  } as CSSProperties;

  return (
    <div style={{ perspective: 800 }}>
      <div
        ref={tiltRef}
        className="beam-border beam-radius-2xl card-border overflow-hidden rounded-2xl bg-surface shadow-2xl shadow-black/40 transition-shadow duration-300 hover:shadow-accent/10"
        style={{ transformStyle: "preserve-3d", willChange: "transform", ...beamStyle }}
      >
        <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="font-mono ml-3 truncate text-xs text-ink-faint">{title}</span>
        </div>
        <div className={`relative aspect-[16/10] w-full bg-gradient-to-br ${tint} to-transparent`}>
          {children}
        </div>
      </div>
    </div>
  );
}
