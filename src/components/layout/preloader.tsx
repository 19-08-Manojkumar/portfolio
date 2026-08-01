"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const PRELOADER_DONE_EVENT = "preloader:done";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const obj = { val: 0 };
    const counterTween = gsap.to(obj, {
      val: 100,
      duration: 2.1,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.floor(obj.val)),
      onComplete: () => {
        const tl = gsap.timeline({
          onComplete: () => {
            document.documentElement.style.overflow = "";
            if (rootRef.current) rootRef.current.style.pointerEvents = "none";
            setFinished(true);
            window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
          },
        });
        tl.to(wrapRef.current, { opacity: 0, duration: 0.4, ease: "power1.out" }, 0.15)
          .to(
            panelTopRef.current,
            { yPercent: -100, duration: 0.9, ease: "expo.inOut" },
            0
          )
          .to(
            panelBottomRef.current,
            { yPercent: 100, duration: 0.9, ease: "expo.inOut" },
            0
          );
      },
    });

    return () => {
      counterTween.kill();
    };
  }, []);

  if (finished) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200]" data-preloader aria-hidden="true">
      <div ref={panelTopRef} className="absolute inset-x-0 top-0 h-1/2 bg-bg" />
      <div ref={panelBottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-bg" />
      <div
        ref={wrapRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
      >
        <span className="font-display text-sm uppercase tracking-[0.4em] text-ink-faint">
          Manojkumar
        </span>
        <span className="font-display text-7xl font-semibold tabular-nums text-ink md:text-8xl">
          {count.toString().padStart(2, "0")}
        </span>
        <div className="h-px w-40 overflow-hidden bg-border">
          <div
            className="h-full bg-accent transition-[width] duration-100 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}
