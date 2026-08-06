"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollImageStack({
  images,
  alt,
  rowRef,
}: {
  images: string[];
  alt: string;
  rowRef: React.RefObject<HTMLElement | null>;
}) {
  const stackRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const trigger = rowRef.current;
    const stack = stackRef.current;
    if (!trigger || !stack || images.length < 2) return;
    const imageElements = imgRefs.current.slice(0, images.length);

    const ctx = gsap.context(() => {
      gsap.set(imageElements, { opacity: 0, rotateY: 18, scale: 0.94 });
      gsap.set(imageElements[0], { opacity: 1, rotateY: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      imageElements.forEach((el, i) => {
        if (i === 0) return;
        const prev = imageElements[i - 1];
        tl.to(prev, { opacity: 0, rotateY: -18, scale: 0.94, duration: 1, ease: "power1.inOut" }, i - 1)
          .to(el, { opacity: 1, rotateY: 0, scale: 1, duration: 1, ease: "power1.inOut" }, i - 1);
      });
    }, stack);

    return () => ctx.revert();
  }, [images, rowRef]);

  return (
    <div ref={stackRef} className="relative h-full w-full" style={{ perspective: 1000 }}>
      {images.map((src, i) => (
        <div
          key={src}
          ref={(el) => {
            if (el) imgRefs.current[i] = el;
          }}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={src}
            alt={`${alt} — screen ${i + 1}`}
            fill
            sizes="(max-width: 768px) 90vw, 60vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
