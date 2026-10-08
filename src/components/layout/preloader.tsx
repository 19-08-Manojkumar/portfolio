"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LoadingArchitecture from "./loading-architecture";

export const PRELOADER_DONE_EVENT = "preloader:done";

export default function Preloader() {
  const [finished, setFinished] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<SVGSVGElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const durationMs = prefersReducedMotion ? 2000 : 5000;
    const msPerCount = durationMs / 100;
    let animationFrame = 0;
    let previousTime: number | null = null;
    let elapsed = 0;
    let displayedCount = 0;
    const phases = Array.from({ length: 5 }, (_, phase) =>
      Array.from(
        drawingRef.current?.querySelectorAll<SVGGeometryElement>(
          `[data-draw-line][data-draw-phase="${phase}"]`
        ) ?? []
      )
    );

    if (countRef.current) countRef.current.textContent = "00";

    const ctx = gsap.context(() => {
      const drawTimeline = gsap.timeline({ paused: true });
      const allLines = phases.flat();
      const revealTimeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          document.documentElement.style.overflow = previousOverflow;
          if (rootRef.current) rootRef.current.style.pointerEvents = "none";
          setFinished(true);
          window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
        },
      });

      // Leave 100 and the completed drawing visible before opening the panels.
      revealTimeline.to(
        wrapRef.current,
        { opacity: 0, duration: prefersReducedMotion ? 0.18 : 0.38, ease: "power1.out" },
        0.3
      );

      if (prefersReducedMotion) {
        gsap.set(allLines, { strokeDashoffset: 0 });
        revealTimeline.to(
          [panelTopRef.current, panelBottomRef.current],
          { opacity: 0, duration: 0.18, ease: "none" },
          0.3
        );
      } else {
        revealTimeline
          .to(panelTopRef.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 0.18)
          .to(panelBottomRef.current, { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, 0.18);

        const phaseTiming = [
          { start: 0, spread: 0.75, minDuration: 0.34, speed: 290 },
          { start: 0.48, spread: 1.25, minDuration: 0.32, speed: 285 },
          { start: 1.05, spread: 1.7, minDuration: 0.34, speed: 300 },
          { start: 2.05, spread: 1.05, minDuration: 0.32, speed: 285 },
          { start: 2.62, spread: 0.92, minDuration: 0.34, speed: 285 },
        ];

        phases.forEach((lines, phase) => {
          const timing = phaseTiming[phase];

          lines.forEach((line, index) => {
            const length = line.getTotalLength();
            gsap.set(line, {
              strokeDasharray: `${length} ${length}`,
              strokeDashoffset: length,
            });

            const position =
              timing.start + (index / Math.max(lines.length - 1, 1)) * timing.spread;
            const duration = Math.min(
              1.15,
              Math.max(timing.minDuration, length / timing.speed)
            );

            drawTimeline.to(
              line,
              { strokeDashoffset: 0, duration, ease: "none" },
              position
            );
          });
        });
      }

      const drawingDuration = drawTimeline.duration() || 1;
      drawTimeline.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: drawingDuration, ease: "none" },
        0
      );

      if (!prefersReducedMotion) {
        drawTimeline.fromTo(
          drawingRef.current,
          { "--landmark-pan": "25%" },
          { "--landmark-pan": "-25%", duration: drawingDuration, ease: "none" },
          0
        );
      }

      const advance = (time: number) => {
        if (document.hidden) {
          previousTime = null;
          animationFrame = requestAnimationFrame(advance);
          return;
        }

        const delta = previousTime === null ? 0 : time - previousTime;
        previousTime = time;
        // A slow frame can advance at most one number, keeping the drawing in sync.
        elapsed = Math.min(durationMs, elapsed + Math.min(delta, msPerCount));
        const count = Math.min(displayedCount + 1, Math.floor(elapsed / msPerCount));

        if (count !== displayedCount) {
          displayedCount = count;
          if (countRef.current) countRef.current.textContent = count.toString().padStart(2, "0");
        }

        drawTimeline.progress(elapsed / durationMs);

        if (displayedCount === 100) {
          revealTimeline.play(0);
        } else {
          animationFrame = requestAnimationFrame(advance);
        }
      };

      animationFrame = requestAnimationFrame(advance);
    }, rootRef);

    return () => {
      cancelAnimationFrame(animationFrame);
      ctx.revert();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  if (finished) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200]" data-preloader aria-hidden="true">
      <div ref={panelTopRef} className="absolute inset-x-0 top-0 h-1/2 bg-[#08090b]" />
      <div ref={panelBottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-[#08090b]" />
      <div
        ref={wrapRef}
        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-5 py-7 text-white sm:px-10 md:px-16"
      >
        <div className="mb-3 flex w-full max-w-[1120px] items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/45 sm:text-xs">
          <span>Manojkumar Portfolio</span>
          <span>Loading</span>
        </div>

        <LoadingArchitecture ref={drawingRef} />

        <div className="mt-2 flex w-full max-w-[1120px] items-end justify-between border-t border-white/15 pt-4 sm:mt-3 sm:pt-5">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/40 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Loading portfolio
          </div>
          <span ref={countRef} className="font-display text-5xl font-light leading-none tabular-nums text-white sm:text-6xl md:text-7xl">
            00
          </span>
        </div>

        <div className="mt-4 h-px w-full max-w-[1120px] overflow-hidden bg-white/10">
          <div
            ref={progressRef}
            className="h-full origin-left bg-white will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
