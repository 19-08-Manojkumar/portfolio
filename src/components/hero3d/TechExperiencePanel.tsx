"use client";

import { memo } from "react";
import Image from "next/image";

export type SelectedTech = {
  name: string;
  src: string;
  area: string;
  projects: string[];
  role: string;
  period: string;
  projectCountLabel: string;
  experienceNote?: string;
};

function TechExperiencePanel({ detail }: { detail: SelectedTech }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[13.5rem] -translate-x-1/2 -translate-y-1/2">
      <div
        key={detail.name}
        className="rounded-2xl border border-accent/50 bg-bg/95 p-4 text-left shadow-[0_18px_70px_rgba(0,0,0,0.75)] backdrop-blur-xl"
        style={{ animation: "techPanelIn 300ms cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface shadow-inner">
            <Image src={detail.src} alt="" width={25} height={25} />
          </span>
          <div className="min-w-0">
            <p className="font-display truncate text-base font-semibold text-ink">{detail.name}</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
              {detail.area}
            </p>
          </div>
        </div>

        <div className="mt-3 border-t border-border pt-3">
          <p className="text-[11px] leading-relaxed text-ink">{detail.role}</p>
          <p className="font-mono mt-1 text-[9px] text-ink-faint">{detail.period}</p>
        </div>

        <div className="mt-3 rounded-xl border border-border bg-surface/70 px-3 py-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent-soft">
            Project footprint
          </p>
          <p className="font-display mt-1 text-lg font-semibold text-ink">
            {detail.projectCountLabel} projects
          </p>
          {detail.experienceNote && (
            <p className="mt-1 text-[10px] leading-snug text-ink-muted">{detail.experienceNote}</p>
          )}
        </div>

        <div className="mt-3 space-y-1.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent-soft">
            Related experience
          </p>
          {detail.projects.length > 0 ? (
            detail.projects.slice(0, 3).map((project) => (
              <p key={project} className="flex gap-1.5 text-[10px] leading-snug text-ink-muted">
                <span className="text-accent">•</span>
                <span>{project}</span>
              </p>
            ))
          ) : (
            <p className="text-[10px] leading-snug text-ink-muted">
              Core technology in the portfolio skill set.
            </p>
          )}
        </div>
      </div>
      <style>{`
        @keyframes techPanelIn {
          from { opacity: 0; transform: scale(0.9) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default memo(TechExperiencePanel);
