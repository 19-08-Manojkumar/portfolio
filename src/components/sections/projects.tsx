"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ShoppingCart,
  FileStack,
  UsersRound,
  GraduationCap,
  Database,
  ChartNoAxesCombined,
  Layers,
  FolderGit2,
  type LucideIcon,
} from "lucide-react";
import { experience, ownProjects } from "@/lib/data";
import { SectionHeading } from "./about";
import BrowserMockup from "@/components/ui/browser-mockup";
import ScrollImageStack from "@/components/ui/scroll-image-stack";

gsap.registerPlugin(ScrollTrigger);

const featured: (typeof experience.projects[number] & {
  accentClass: string;
  icon: LucideIcon;
})[] = [
  { ...experience.projects[0], accentClass: "from-accent/25", icon: ShoppingCart },
  { ...experience.projects[1], accentClass: "from-jade/20", icon: FileStack },
  { ...experience.projects[2], accentClass: "from-violet/20", icon: UsersRound },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row, i) => {
        const image = row.querySelector(".project-image");
        const copy = row.querySelector(".project-copy");

        gsap.fromTo(
          image,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: row, start: "top 75%", once: true },
          }
        );
        gsap.fromTo(
          copy,
          { opacity: 0, x: i % 2 === 0 ? 40 : -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 70%", once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Selected Work" title="Systems built to carry real traffic." icon={FolderGit2} />

        <div className="mt-24 flex flex-col gap-32">
          {featured.map((project, i) => (
            <FeaturedProjectRow key={project.name} project={project} index={i} />
          ))}
        </div>

        <div className="mt-32">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
            Own Projects
          </p>
          {ownProjects.map((project) => (
            <OwnProjectRow key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectRow({
  project,
  index: i,
}: {
  project: (typeof featured)[number];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={rowRef}
      className={`project-row flex flex-col gap-10 md:gap-16 ${
        i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
      } md:items-center`}
    >
      <div className="project-image w-full md:w-3/5">
        <BrowserMockup title={project.name} tint={project.accentClass}>
          {project.images?.length ? (
            <ScrollImageStack images={project.images} alt={project.name} rowRef={rowRef} />
          ) : (
            <ProjectGlyph label={project.name} icon={project.icon} />
          )}
        </BrowserMockup>
      </div>

      <div className="project-copy w-full md:w-2/5">
        <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
        <h3 className="font-display mt-3 flex items-center gap-2.5 text-2xl font-semibold md:text-3xl">
          <project.icon className="h-6 w-6 text-accent" />
          {project.name}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 text-xs text-ink-muted"
            >
              <Layers className="h-3 w-3 text-ink-faint" />
              {t}
            </span>
          ))}
        </div>
        <div className="mt-8 flex gap-4">
          <a
            href="#experience"
            data-cursor-hover
            className="group flex items-center gap-1.5 rounded-full border border-border-strong px-5 py-2.5 text-sm hover:border-accent hover:text-accent"
          >
            Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function OwnProjectRow({ project }: { project: (typeof ownProjects)[number] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const projectIcons = {
    graduation: GraduationCap,
    database: Database,
    analytics: ChartNoAxesCombined,
  } as const;
  const ProjectIcon = projectIcons[project.icon];

  return (
    <div
      ref={rowRef}
      className="mt-8 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center"
    >
      <div>
        <h3 className="font-display flex items-center gap-2.5 text-2xl font-semibold">
          <ProjectIcon className="h-6 w-6 text-jade" />
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">{project.tagline}</p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-muted">
          {project.description}
        </p>
        <ul className="mt-5 space-y-2">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm text-ink-muted">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-jade" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1 text-xs text-ink-muted"
            >
              <Layers className="h-3 w-3 text-ink-faint" />
              {t}
            </span>
          ))}
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="group mt-7 inline-flex items-center gap-1.5 rounded-full border border-border-strong px-5 py-2.5 text-sm transition-colors hover:border-jade hover:text-jade"
          >
            Visit site
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>
      <BrowserMockup title={project.name} tint="from-jade/15">
        {project.images?.length ? (
          <ScrollImageStack images={project.images} alt={project.name} rowRef={rowRef} />
        ) : (
          <ProjectGlyph label={project.name} icon={ProjectIcon} />
        )}
      </BrowserMockup>
    </div>
  );
}

function ProjectGlyph({ label, icon: Icon }: { label: string; icon: LucideIcon }) {
  const initials = label
    .split(" ")
    .filter((w) => w[0] === w[0]?.toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Icon className="h-10 w-10 text-ink/25 md:h-14 md:w-14" strokeWidth={1.25} />
      <span className="font-display select-none text-4xl font-semibold text-ink/10 md:text-6xl">
        {initials || label.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
}
