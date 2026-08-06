"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxTexture({
  src,
  opacity = 0.5,
  targetRef,
}: {
  src: string;
  opacity?: number;
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = targetRef.current;
    const img = imgRef.current;
    if (!trigger || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );
    });

    return () => ctx.revert();
  }, [targetRef]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div ref={imgRef} className="absolute -inset-y-[15%] inset-x-0">
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover brightness-[2.4] contrast-110 saturate-[1.2]"
          style={{ opacity }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/10 to-bg" />
    </div>
  );
}
