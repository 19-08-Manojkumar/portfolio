"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Orbit, RotateCcw, Telescope } from "lucide-react";
import ParallaxTexture from "@/components/layout/parallax-texture";
import { SectionHeading } from "./about";
import { stackGalaxyGroups } from "@/lib/stack-galaxy";
import { stackOverview } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const StackGalaxyScene = dynamic(() => import("@/components/stack3d/StackGalaxyScene"), {
  ssr: false,
});

function sectionStage(progress: number) {
  if (progress < 0.32) {
    return {
      label: "Overview",
      description: "The stack starts as one galaxy, with each specialty grouped into its own orbit.",
    };
  }
  if (progress < 0.68) {
    return {
      label: "Solar Systems",
      description: "Each stack area separates so the planets are easier to explore.",
    };
  }
  return {
    label: "Planet Details",
    description: "Pick a planet to see its project count and related work.",
  };
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const relatedWorkRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<1 | -1>(1);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 25%",
      scrub: 0.45,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        setScrollDirection(self.direction === -1 ? -1 : 1);
      },
    });

    return () => trigger.kill();
  }, []);

  const autoIndex = Math.min(
    stackGalaxyGroups.length - 1,
    Math.floor(scrollProgress * stackGalaxyGroups.length)
  );
  const focusedGroupId = expandedGroupId ?? stackGalaxyGroups[autoIndex]?.id ?? stackGalaxyGroups[0].id;
  const selectedGroup = useMemo(
    () => stackGalaxyGroups.find((group) => group.id === activeGroupId) ?? null,
    [activeGroupId]
  );
  const selectedTool = useMemo(
    () => selectedGroup?.tools.find((tool) => tool.id === selectedToolId) ?? null,
    [selectedGroup, selectedToolId]
  );
  const stage = useMemo(() => sectionStage(scrollProgress), [scrollProgress]);
  const totalTools = stackGalaxyGroups.reduce((sum, group) => sum + group.tools.length, 0);
  const sharedPanelHeight = "h-[36rem] sm:h-[40rem] lg:h-[46rem]";

  const openGroup = (groupId: string) => {
    setActiveGroupId(groupId);
    setExpandedGroupId(groupId);
    setSelectedToolId(null);
  };

  const resetView = () => {
    setActiveGroupId(null);
    setExpandedGroupId(null);
    setSelectedToolId(null);
  };

  const trapPanelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const panel = relatedWorkRef.current;
    if (!panel) return;

    const { deltaY } = event;
    const canScroll = panel.scrollHeight > panel.clientHeight;
    if (!canScroll) return;

    panel.scrollTop += deltaY;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <section id="stack" ref={sectionRef} className="relative isolate overflow-hidden px-6 py-32">
      <ParallaxTexture src="/accents/blueprint.avif" opacity={0.9} targetRef={sectionRef} />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(83,134,255,0.16),transparent_26%),radial-gradient(circle_at_72%_20%,rgba(217,138,75,0.18),transparent_25%),radial-gradient(circle_at_52%_62%,rgba(127,220,192,0.12),transparent_22%),linear-gradient(180deg,rgba(4,7,12,0.94),rgba(7,8,11,0.98))]" />
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              "radial-gradient(rgba(240,177,132,0.26) 0.8px, transparent 0.8px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="absolute left-[-8%] top-[12%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(83,134,255,0.18),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-9%] top-[10%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(217,138,75,0.16),transparent_72%)] blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Tech Stack" title="Tools I reach for when it matters." icon={Layers} />

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.95fr)_minmax(19rem,0.78fr)] lg:items-start">
          <div className={`relative ${sharedPanelHeight} lg:-mr-20 xl:-mr-24`}>
            <div className="absolute inset-0">
              <StackGalaxyScene
                groups={stackGalaxyGroups}
                progress={scrollProgress}
                direction={scrollDirection}
                focusedGroupId={focusedGroupId}
                expandedGroupId={expandedGroupId}
                selectedToolId={selectedToolId}
                onSelectGroup={openGroup}
                onSelectTool={(toolId) => {
                  const groupForTool = stackGalaxyGroups.find((group) =>
                    group.tools.some((tool) => tool.id === toolId)
                  );
                  if (groupForTool) {
                    setActiveGroupId(groupForTool.id);
                    setExpandedGroupId(groupForTool.id);
                  }
                  setSelectedToolId(toolId);
                }}
                onResetGroup={resetView}
              />
            </div>
          </div>

          <div className={`relative z-10 lg:sticky lg:top-24 ${sharedPanelHeight}`}>
            <div className={`flex ${sharedPanelHeight} flex-col overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,9,11,0.82),rgba(8,9,11,0.95))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent-soft">
                    {selectedTool
                      ? "Selected Planet"
                      : selectedGroup
                        ? "Selected Solar System"
                        : "Stack Overview"}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-semibold text-ink">
                    {selectedTool?.name ?? selectedGroup?.label ?? "Full Stack Galaxy"}
                  </h3>
                </div>
                {(selectedGroup || selectedTool) && (
                  <button
                    type="button"
                    data-cursor-hover
                    onClick={resetView}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] text-ink-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {selectedTool
                  ? `${selectedTool.name} is one of the planets inside the ${selectedGroup?.label.toLowerCase()} solar system.`
                  : selectedGroup
                    ? selectedGroup.description
                    : "This galaxy groups the technologies I know into solar systems like frontend, backend, database, cloud, and other tools. Scroll to rotate the galaxy, then click a solar system or a logo planet to inspect it here."}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-surface/70 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">
                    Projects
                  </p>
                  <p className="font-display mt-2 text-3xl font-semibold text-ink">
                    {selectedTool
                      ? selectedTool.projectCountLabel
                      : selectedGroup
                        ? selectedGroup.projectCountLabel
                        : stackOverview.totalProjectsLabel}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-surface/70 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">
                    Planets
                  </p>
                  <p className="font-display mt-2 text-3xl font-semibold text-ink">
                    {selectedTool
                      ? selectedGroup?.tools.length ?? 0
                      : selectedGroup
                        ? selectedGroup.tools.length
                        : totalTools}
                  </p>
                </div>
              </div>

              <div
                ref={relatedWorkRef}
                onWheelCapture={trapPanelScroll}
                className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-[1.5rem] border border-white/8 bg-surface/72 p-4"
              >
                <div className="flex items-center gap-2 text-accent">
                  <Telescope className="h-4 w-4" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em]">
                    {selectedTool
                      ? "Related work"
                      : selectedGroup
                        ? "Planets in this system"
                        : "Solar systems"}
                  </p>
                </div>

                {!selectedGroup && !selectedTool && (
                  <div className="mt-4 space-y-3">
                    {stackGalaxyGroups.map((group) => (
                      <button
                        key={group.id}
                        type="button"
                        data-cursor-hover
                        onClick={() => openGroup(group.id)}
                        className="flex w-full items-start justify-between rounded-2xl border border-white/8 bg-bg/45 px-4 py-3 text-left transition-colors hover:border-white/14 hover:bg-bg/60"
                      >
                        <div>
                          <p className="font-display text-base font-medium text-ink">
                            {group.label}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                            {group.tools.length} planets · {group.projectCountLabel} shipped projects
                          </p>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-soft">
                          {group.eyebrow}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {selectedGroup && !selectedTool && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {selectedGroup.tools.map((tool) => (
                      <button
                        key={tool.id}
                        type="button"
                        data-cursor-hover
                        onClick={() => setSelectedToolId(tool.id)}
                        className="flex items-center gap-2 rounded-full border border-white/8 bg-bg/45 px-3 py-2 text-sm text-ink-muted transition-colors hover:border-white/14 hover:text-ink"
                      >
                        {tool.logo ? (
                          <Image
                            src={tool.logo}
                            alt=""
                            width={18}
                            height={18}
                            className="h-[1.1rem] w-[1.1rem] object-contain"
                          />
                        ) : (
                          <span className="flex h-[1.1rem] w-[1.1rem] items-center justify-center rounded-full bg-accent/15 text-[9px] text-accent">
                            {tool.shortName.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                        <span>{tool.shortName}</span>
                      </button>
                    ))}
                  </div>
                )}

                {selectedTool && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-bg/45 px-4 py-3">
                      {selectedTool.logo ? (
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-surface">
                          <Image
                            src={selectedTool.logo}
                            alt=""
                            width={24}
                            height={24}
                            className="h-6 w-6 object-contain"
                          />
                        </span>
                      ) : (
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-surface font-mono text-xs text-accent">
                          {selectedTool.shortName.slice(0, 3).toUpperCase()}
                        </span>
                      )}
                      <div>
                        <p className="font-display text-base font-medium text-ink">
                          {selectedTool.name}
                        </p>
                        <p className="mt-1 text-xs text-ink-muted">
                          {selectedTool.projectCountLabel} shipped projects across company and own work
                        </p>
                      </div>
                    </div>

                    {selectedTool.experienceNote && (
                      <p className="rounded-2xl border border-white/8 bg-bg/45 px-4 py-3 text-sm leading-relaxed text-ink-muted">
                        {selectedTool.experienceNote}
                      </p>
                    )}

                    {selectedTool.projects.length > 0 ? (
                      selectedTool.projects.map((project) => (
                        <p key={project} className="flex items-start gap-2 text-sm text-ink-muted">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                          <span>{project}</span>
                        </p>
                      ))
                    ) : (
                      <p className="text-sm leading-relaxed text-ink-muted">
                        This tool is part of the stack I work with, even where the project list is broader than one named technology.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 rounded-[1.4rem] border border-white/8 bg-surface/60 p-4">
                <div className="flex items-center gap-3 text-accent-soft">
                  <Orbit className="h-4 w-4" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em]">
                    {stage.label}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {stage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
