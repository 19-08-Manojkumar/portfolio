"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    gsap.set(dot, pos);
    gsap.set(ring, pos);

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.1, overwrite: true });
    };

    const ticker = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    };

    const spawnRipple = (x: number, y: number) => {
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      document.body.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0.3, opacity: 0.6 },
        {
          scale: 2.2,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    const onDown = (e: MouseEvent) => {
      gsap.to(ring, { scale: 0.7, duration: 0.2, ease: "power2.out" });
      spawnRipple(e.clientX, e.clientY);
    };
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(2)" });

    const onEnterInteractive = (el: Element) => {
      const text = el.getAttribute("data-cursor-text");
      ring.classList.add("cursor-ring--active");
      gsap.to(ring, {
        width: text ? 84 : 56,
        height: text ? 84 : 56,
        borderColor: "var(--color-accent)",
        backgroundColor: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
        duration: 0.3,
        ease: "power3.out",
      });
      if (text) setLabel(text);
    };
    const onLeaveInteractive = () => {
      ring.classList.remove("cursor-ring--active");
      gsap.to(ring, {
        width: 32,
        height: 32,
        borderColor: "var(--color-border-strong)",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power3.out",
      });
      setLabel("");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    gsap.ticker.add(ticker);

    const bound = new WeakSet<Element>();
    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        if (bound.has(el)) return;
        bound.add(el);
        el.addEventListener("mouseenter", () => onEnterInteractive(el));
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      gsap.ticker.remove(ticker);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:flex md:items-center md:justify-center">
        <span
          ref={labelRef}
          className="font-mono pointer-events-none select-none text-[9px] uppercase tracking-widest text-accent"
        >
          {label}
        </span>
      </div>
    </>
  );
}
