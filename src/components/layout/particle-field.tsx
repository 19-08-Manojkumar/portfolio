"use client";

import { useEffect, useRef } from "react";
import { THEME_CHANGE_EVENT } from "@/lib/theme";

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
};

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let mouse = { x: width / 2, y: height / 2 };
    let particleRgb = "217, 138, 75";

    const updateParticleColor = () => {
      particleRgb =
        getComputedStyle(document.documentElement).getPropertyValue("--particle-rgb").trim() ||
        "217, 138, 75";
    };

    updateParticleColor();

    const COUNT = Math.min(70, Math.floor((width * height) / 22000));
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: 0.3 + Math.random() * 0.7,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = (mouse.x - p.x) * 0.00025 * p.z;
        const dy = (mouse.y - p.y) * 0.00025 * p.z;

        ctx.beginPath();
        ctx.arc(p.x + dx * 60, p.y + dy * 60, p.z * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleRgb}, ${0.15 + p.z * 0.35})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const observer = new MutationObserver(updateParticleColor);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener(THEME_CHANGE_EVENT, updateParticleColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener(THEME_CHANGE_EVENT, updateParticleColor);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}
