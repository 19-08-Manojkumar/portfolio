"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LoadingArchitecture from "./loading-architecture";

export const PRELOADER_DONE_EVENT = "preloader:done";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obj = { val: 0 };
    const phases = Array.from({ length: 5 }, (_, phase) =>
      Array.from(
        drawingRef.current?.querySelectorAll<SVGGeometryElement>(
          `[data-draw-line][data-draw-phase="${phase}"]`
        ) ?? []
      )
    );
    const reveal = () => {
      gsap.timeline({
          onComplete: () => {
            document.documentElement.style.overflow = "";
            if (rootRef.current) rootRef.current.style.pointerEvents = "none";
            setFinished(true);
            window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
          },
        })
        .to(wrapRef.current, { opacity: 0, duration: 0.38, ease: "power1.out" }, 0.12)
        .to(panelTopRef.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 0)
        .to(panelBottomRef.current, { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, 0);
    };

    const drawTimeline = gsap.timeline({ onComplete: reveal });
    const allLines = phases.flat();

    if (prefersReducedMotion) {
      drawTimeline
        .set(allLines, { strokeDashoffset: 0 })
        .to(obj, {
          val: 100,
          duration: 0.65,
          ease: "none",
          onUpdate: () => setCount(Math.floor(obj.val)),
        });
    } else {
      const phaseTiming = [
        { start: 0, spread: 0.75, minDuration: 0.34, speed: 290 },
        { start: 0.48, spread: 1.25, minDuration: 0.32, speed: 285 },
        { start: 1.05, spread: 1.7, minDuration: 0.34, speed: 300 },
        { start: 2.05, spread: 1.05, minDuration: 0.32, speed: 285 },
        { start: 2.62, spread: 0.92, minDuration: 0.34, speed: 285 },
      ];

      allLines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: `${length} ${length}`,
          strokeDashoffset: length,
        });
      });

      phases.forEach((lines, phase) => {
        const timing = phaseTiming[phase];

        lines.forEach((line, index) => {
          const length = line.getTotalLength();
          const position =
            timing.start + (index / Math.max(lines.length - 1, 1)) * timing.spread;
          const duration = Math.min(
            1.15,
            Math.max(timing.minDuration, length / timing.speed)
          );

          drawTimeline.to(
            line,
            {
              strokeDashoffset: 0,
              duration,
              ease: "none",
            },
            position
          );
        });

      });

      drawTimeline.to(
        obj,
        {
          val: 100,
          duration: 4.2,
          ease: "power1.inOut",
          onUpdate: () => setCount(Math.floor(obj.val)),
        },
        0
      );
    }

    return () => {
      drawTimeline.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (finished) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200] bg-[#08090b]" data-preloader aria-hidden="true">
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
          <span className="font-display text-5xl font-light leading-none tabular-nums text-white sm:text-6xl md:text-7xl">
            {count.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="mt-4 h-px w-full max-w-[1120px] overflow-hidden bg-white/10">
          <div
            className="h-full bg-white transition-[width] duration-100 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}
