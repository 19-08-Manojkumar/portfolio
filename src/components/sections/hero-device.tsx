"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const HERO_VISUAL_SRC = "/hero/typing.png";

export default function HeroDevice() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(el, {
        rotateY: 6 + x * 4,
        rotateX: -3 - y * 3,
        x: x * 14,
        duration: 0.9,
        ease: "power2.out",
        transformPerspective: 1200,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, x: 60, rotateY: 6, rotateX: -3 },
      { opacity: 1, x: 0, duration: 1.3, delay: 0.9, ease: "expo.out" }
    );
  }, []);

  if (failed) return null;

  return (
    <div
      className="pointer-events-none absolute -right-10 top-1/2 hidden w-[38vw] max-w-2xl -translate-y-1/2 lg:block"
      style={{ perspective: 1400 }}
    >
      <div ref={wrapRef} style={{ transformStyle: "preserve-3d" }}>
        <div
          className="absolute -inset-16 -z-10 rounded-full opacity-30 blur-[100px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        />

        <div
          className="beam-border beam-radius-2xl glass relative aspect-[3/2] w-full overflow-hidden rounded-2xl p-1.5 shadow-2xl shadow-black/60"
          style={{ ["--beam-delay" as string]: "0.45s" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <Image
              src={HERO_VISUAL_SRC}
              alt=""
              fill
              sizes="38vw"
              className="object-cover"
              onError={() => setFailed(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
