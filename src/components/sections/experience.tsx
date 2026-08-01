"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Layers, TrendingUp, Briefcase } from "lucide-react";
import { experience } from "@/lib/data";
import { SectionHeading } from "./about";
import ParallaxTexture from "@/components/layout/parallax-texture";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const scrollAmount = track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${scrollAmount + window.innerHeight}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.3, scale: 0.92 },
            {
              opacity: 1,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 80%",
                end: "left 40%",
                scrub: true,
              },
            }
          );
        });

        return () => tween.scrollTrigger?.kill();
      });

      mm.add("(max-width: 899px)", () => {
        gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            }
          );
        });
      });

      return () => mm.revert();
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative isolate">
      <ParallaxTexture src="/accents/code-texture.avif" opacity={0.4} targetRef={sectionRef} />
      <div className="px-6 pt-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Experience" title={experience.company} icon={Briefcase} />
          <p className="font-mono mt-4 text-sm text-ink-muted">
            {experience.role} · {experience.period}
          </p>
        </div>
      </div>

      <div ref={wrapRef} className="relative mt-12 md:h-screen md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-8 px-6 md:h-full md:w-max md:flex-row md:items-center md:gap-10 md:px-[8vw]"
        >
          {experience.projects.map((project, i) => (
            <article
              key={project.name}
              className="exp-card card-border relative flex w-full flex-shrink-0 flex-col rounded-3xl bg-surface/50 p-8 md:h-[70vh] md:w-[70vw] md:p-12 lg:w-[52vw]"
            >
              <span className="font-mono text-xs text-ink-faint">
                0{i + 1} / 0{experience.projects.length}
              </span>
              <h3 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted md:text-base">
                {project.description}
              </p>

              <ul className="mt-6 grid gap-2.5 md:grid-cols-2">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-8">
                <div className="flex flex-wrap gap-2">
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

                {project.metrics.length > 0 && (
                  <div className="flex gap-6">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-right">
                        <div className="font-display flex items-center justify-end gap-1.5 text-2xl font-semibold text-accent">
                          <TrendingUp className="h-4 w-4" />
                          {m.value}
                        </div>
                        <div className="max-w-[8rem] text-[11px] leading-tight text-ink-faint">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
