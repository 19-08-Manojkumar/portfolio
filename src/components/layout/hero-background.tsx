"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { heroImages } from "@/lib/data";

export default function HeroBackground() {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % heroImages.length);
    }, 5200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(el, { x: x * -18, y: y * -18, duration: 1, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      <div ref={wrapRef} className="absolute -inset-6">
        {heroImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover transition-opacity duration-[1800ms] ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              filter: "var(--hero-image-filter)",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay-main)" }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "var(--hero-overlay-bottom)" }} />
    </div>
  );
}
