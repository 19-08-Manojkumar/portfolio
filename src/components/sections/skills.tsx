"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Code2, Server, Database, Cloud, Boxes, Layers, type LucideIcon } from "lucide-react";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "./about";
import ParallaxTexture from "@/components/layout/parallax-texture";

const groupIcons: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  cloud: Cloud,
  other: Boxes,
};

const skillLogos: Record<string, string> = {
  "React.js": "/stack/react.svg",
  "Next.js": "/stack/nextjs.svg",
  "TypeScript": "/stack/typescript.svg",
  "Node.js": "/stack/nodejs.svg",
  "NestJS": "/stack/nestjs.svg",
  "MongoDB": "/stack/mongodb.svg",
  "AWS SQS": "/stack/aws.svg",
  "Git": "/stack/git.svg",
};

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-pill",
        { opacity: 0, y: 16, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.04,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [active]);

  const activeGroup = skillGroups.find((g) => g.id === active)!;

  return (
    <section id="stack" ref={sectionRef} className="relative isolate px-6 py-32">
      <ParallaxTexture src="/accents/blueprint.avif" opacity={0.90} targetRef={sectionRef} />
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Tech Stack" title="Tools I reach for when it matters." icon={Layers} />

        <div className="mt-14 flex flex-wrap gap-3">
          {skillGroups.map((group) => {
            const Icon = groupIcons[group.id] ?? Code2;
            return (
              <button
                key={group.id}
                type="button"
                data-cursor-hover
                onClick={() => setActive(group.id)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                  active === group.id
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border-strong text-ink-muted hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                {group.label}
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex min-h-[240px] flex-wrap items-center gap-4">
          {activeGroup.skills.map((skill, i) => (
            <SkillBubble key={skill} label={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBubble({ label, index }: { label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const sizes = ["px-6 py-3 text-base", "px-7 py-4 text-lg", "px-5 py-2.5 text-sm"];
  const size = sizes[index % sizes.length];
  const logo = skillLogos[label];

  return (
    <div
      ref={ref}
      data-cursor-hover
      className={`skill-pill card-border font-display flex cursor-default items-center gap-2.5 rounded-full bg-surface/60 ${size} transition-colors hover:border-accent hover:text-accent`}
    >
      {logo ? (
        <Image src={logo} alt="" width={18} height={18} className="h-[1em] w-[1em] object-contain" />
      ) : (
        <Code2 className="h-[0.9em] w-[0.9em] text-accent/70" />
      )}
      {label}
    </div>
  );
}
