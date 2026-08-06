"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats, profile } from "@/lib/data";
import { useTilt } from "@/hooks/use-tilt";
import ParallaxTexture from "@/components/layout/parallax-texture";
import {
  GraduationCap,
  Code2,
  Award,
  Briefcase,
  Rocket,
  Calendar,
  Users,
  Database,
  Zap,
  Gauge,
  User,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const statIcons: Record<string, LucideIcon> = {
  calendar: Calendar,
  rocket: Rocket,
  users: Users,
  database: Database,
  zap: Zap,
  gauge: Gauge,
};

const timeline: { year: string; title: string; detail: string; icon: LucideIcon }[] = [
  {
    year: "2019",
    title: "Started B.E. in Electrical & Electronics",
    detail: "Anjalai Ammal Mahalingam Engineering College — where curiosity for how systems work took root.",
    icon: GraduationCap,
  },
  {
    year: "2022",
    title: "First lines of full-stack code",
    detail: "Taught myself the MERN stack alongside coursework, building small CRUD apps to understand the full request lifecycle.",
    icon: Code2,
  },
  {
    year: "2023",
    title: "Graduated, CGPA 8.02",
    detail: "Wrapped up my engineering degree and pivoted fully into software development.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Joined Bytize Technology Solutions",
    detail: "Started building production systems: e-commerce platforms, enterprise CLM tooling, and CRM systems at scale.",
    icon: Briefcase,
  },
  {
    year: "Now",
    title: "Full Stack Developer, 2+ years in",
    detail: "Shipping structured NestJS backends and performant Next.js frontends — with an eye on architecture, not just features.",
    icon: Rocket,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toString();
          },
        });
      });

      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 40, scale: 0.9, rotateZ: -3 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration: 0.8,
          ease: "back.out(1.6)",
          stagger: 0.08,
          scrollTrigger: { trigger: ".stat-card", start: "top 88%", once: true },
        }
      );

      gsap.fromTo(
        ".about-portrait",
        { opacity: 0, x: 60, rotateY: -12 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-portrait", start: "top 85%", once: true },
        }
      );

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }
        );
      });

      gsap.fromTo(
        ".timeline-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-wrap",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative isolate px-6 py-32">
      <ParallaxTexture src="/accents/glass-grain.avif" opacity={0.85} targetRef={sectionRef} />
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="A developer who reads the whole ticket." icon={User} />

        <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
            I&apos;m Manojkumar, based in Chennai, India. I care about the parts of
            software most people skip past — the schema design, the retry logic, the
            auth guard that quietly prevents a bad day. Two years in, I&apos;ve shipped
            systems that real businesses depend on daily.
          </p>

          <AboutPortrait />
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => {
            const Icon = statIcons[stat.icon] ?? Rocket;
            return (
            <div key={stat.label} className="stat-card card-border rounded-2xl bg-surface/40 p-6">
              <Icon className="mb-3 h-5 w-5 text-accent" />
              <div className="font-display text-3xl font-semibold text-ink md:text-4xl">
                <span className="stat-value" data-value={stat.value}>
                  0
                </span>
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <p className="mt-2 text-xs leading-snug text-ink-muted">{stat.label}</p>
            </div>
            );
          })}
        </div>

        <div className="timeline-wrap relative mt-32">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border md:block hidden" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 md:block hidden overflow-hidden">
            <div className="timeline-line-fill h-full w-full origin-top bg-accent" />
          </div>

          <div className="space-y-16 md:space-y-24">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`timeline-item relative flex flex-col gap-4 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16"
                }`}
              >
                <div
                  className={`absolute top-0 hidden h-7 w-7 items-center justify-center rounded-full border border-accent bg-bg text-accent md:flex ${
                    i % 2 === 0 ? "-right-3.5" : "-left-3.5"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                </div>
                <span
                  className={`flex items-center gap-1.5 font-mono text-sm text-accent ${
                    i % 2 === 0 ? "md:justify-end" : ""
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5 md:hidden" />
                  {item.year}
                </span>
                <h3 className="font-display text-xl font-medium">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPortrait() {
  const tiltRef = useTilt<HTMLDivElement>(6);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [isCentered, setIsCentered] = useState(false);
  const orbitSkills = ["React", "Node.js", "NestJS", "MongoDB"];

  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait) return;

    const trigger = ScrollTrigger.create({
      trigger: portrait,
      start: "center 70%",
      end: "center 30%",
      onToggle: (self) => setIsCentered(self.isActive),
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={portraitRef}
      className="about-portrait group relative mx-auto w-full max-w-xs"
      style={{ perspective: 900 }}
    >
      <div
        className={`pointer-events-none absolute -inset-5 rounded-[2.5rem] blur-2xl transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-60 ${
          isCentered ? "scale-105 opacity-60" : "scale-95 opacity-0"
        }`}
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
      />
      <div
        ref={tiltRef}
        data-cursor-hover
        className="glass relative aspect-square w-full overflow-hidden rounded-[2rem] p-1"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-surface-2">
          <Image
            src="/mypic.avif"
            alt={profile.name}
            fill
            sizes="(max-width: 768px) 60vw, 320px"
            className={`object-cover contrast-105 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 ${
              isCentered ? "scale-105 grayscale-0" : "scale-100 grayscale"
            }`}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/70 to-transparent p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
              {profile.location}
            </span>
          </div>
        </div>

        {orbitSkills.map((skill, i) => {
          const angle = (i / orbitSkills.length) * Math.PI * 2;
          const radius = 52;
          return (
            <span
              key={skill}
              className="font-mono glass absolute rounded-full px-3 py-1.5 text-[10px] text-ink-muted"
              style={{
                top: `${50 + Math.sin(angle) * radius}%`,
                left: `${50 + Math.cos(angle) * radius}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  icon?: LucideIcon;
}) {
  return (
    <div>
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h2 className="font-display mt-4 flex max-w-2xl items-center gap-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        {Icon && <Icon className="h-8 w-8 flex-shrink-0 text-accent md:h-9 md:w-9" />}
        {title}
      </h2>
    </div>
  );
}
