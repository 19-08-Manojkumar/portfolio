"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useTilt<T extends HTMLElement>(strength = 12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateX: -py * strength,
        rotateY: px * strength,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}
