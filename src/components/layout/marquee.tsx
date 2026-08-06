"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee({
  items,
  speed = 22,
}: {
  items: React.ReactNode[];
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    const ctx = gsap.context(() => {
      const loopWidth = track.scrollWidth / 2;
      const tween = gsap.to(track, {
        x: -loopWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const dir = self.direction === 1 ? 1 : -2.5;
          gsap.to(tween, { timeScale: dir, duration: 0.4, overwrite: true });
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [speed]);

  const doubled = [...items, ...items];

  return (
    <div ref={wrapRef} className="relative overflow-hidden border-y border-border py-6">
      <div ref={trackRef} className="flex w-max items-center gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            {item}
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </div>
  );
}
