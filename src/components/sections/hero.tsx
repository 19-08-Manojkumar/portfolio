"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { FolderGit2, Download, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
import { PRELOADER_DONE_EVENT } from "@/components/layout/preloader";
import ParticleField from "@/components/layout/particle-field";
import HeroBackground from "@/components/layout/hero-background";

const HeroScene = dynamic(() => import("@/components/hero3d/HeroScene"), {
  ssr: false,
});

const CODE_SNIPPETS = [
  "const app = express();",
  "export default function Page() {",
  "@Controller('contracts')",
  "await Promise.all(jobs);",
  "interface User { id: string }",
  "SELECT * FROM orders WHERE status = 'paid';",
  "useEffect(() => { ... }, []);",
  "async function connect() {",
  "npm run build",
  "class OrdersService {",
  "type Props = { children: ReactNode }",
  "git commit -m 'feat: checkout flow'",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 35 : 65;
    const pause = 1400;

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => i + 1);
      }, speed);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = nameRef.current?.querySelectorAll(".name-char");
    if (!chars) return;

    const revealEls = gsap.utils.toArray<HTMLElement>(".hero-reveal");
    gsap.set(revealEls, { opacity: 0, y: 24 });
    gsap.set(chars, { yPercent: 120, opacity: 0, rotateZ: 8 });

    const play = () => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.045,
      }).to(
        revealEls,
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.12 },
        "-=0.6"
      );
    };

    const preloader = document.querySelector("[data-preloader]");
    if (!preloader) {
      play();
      return;
    }
    window.addEventListener(PRELOADER_DONE_EVENT, play, { once: true });
    return () => window.removeEventListener(PRELOADER_DONE_EVENT, play);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      gsap.to(el, {
        "--mx": `${x * 30}px`,
        "--my": `${y * 30}px`,
        duration: 0.6,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const name = profile.name.split("");

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-24"
      style={{ ["--mx" as string]: "0px", ["--my" as string]: "0px" }}
    >
      <HeroBackground />
      <ParticleField />
      <HeroScene />

      <div className="pointer-events-none absolute inset-0 -z-10 select-none opacity-[0.14]">
        {CODE_SNIPPETS.map((snippet, i) => (
          <span
            key={snippet}
            className="hero-copy-faint font-mono absolute whitespace-nowrap text-xs md:text-sm"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              transform: `translate3d(calc(var(--mx) * ${((i % 5) - 2) / 2}), calc(var(--my) * ${((i % 3) - 1) / 2}), 0)`,
            }}
          >
            {snippet}
          </span>
        ))}
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <p className="hero-reveal font-mono mb-6 text-sm uppercase tracking-[0.3em] text-accent">
          Hi, I&apos;m
        </p>

        <h1
          ref={nameRef}
          className="hero-copy-text font-display flex flex-wrap text-[15vw] font-semibold leading-[0.9] tracking-tighter sm:text-[12vw] lg:text-[9rem]"
        >
          {name.map((char, i) => (
            <span key={i} className="name-char inline-block overflow-hidden">
              <span className="inline-block">{char}</span>
            </span>
          ))}
        </h1>

        <div className="hero-reveal hero-copy-muted mt-6 flex h-10 items-center gap-2 text-xl sm:text-2xl md:text-3xl">
          <span className="font-display">{typed}</span>
          <span className="inline-block h-[1em] w-[2px] animate-pulse bg-accent" />
        </div>

        <p className="hero-reveal hero-copy-muted mt-8 max-w-xl text-base leading-relaxed">
          {profile.summary}
        </p>

        <div className="hero-reveal mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="#projects" primary text="VIEW">
            <FolderGit2 className="h-4 w-4" />
            View Projects
          </MagneticButton>
          <MagneticButton href={profile.resume} download text="GET">
            <Download className="h-4 w-4" />
            Download Resume
          </MagneticButton>
          <MagneticButton href="#contact" text="HIRE">
            <Sparkles className="h-4 w-4" />
            Hire Me
          </MagneticButton>
        </div>
      </div>

      <a
        href="#about"
        data-cursor-hover
        className="hero-reveal hero-copy-faint absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em]"
      >
        Scroll
        <span className="relative h-10 w-[1px] overflow-hidden bg-border-strong">
          <span className="absolute inset-x-0 top-0 h-4 w-full animate-[scrollLine_1.8s_ease-in-out_infinite] bg-accent" />
        </span>
      </a>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(150%); }
        }
      `}</style>
    </section>
  );
}

function MagneticButton({
  href,
  children,
  primary,
  download,
  text,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  download?: boolean;
  text?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      data-cursor-hover
      data-cursor-text={text}
      className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
        primary
          ? "bg-ink text-bg hover:bg-accent"
          : "hero-outline-button border"
      }`}
    >
      {children}
    </a>
  );
}
