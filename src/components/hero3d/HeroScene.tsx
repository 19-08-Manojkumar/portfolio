"use client";

import { memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { experience, ownProjects, skillGroups, stackLogos } from "@/lib/data";
import CameraRig from "./CameraRig";
import Effects from "./Effects";
import FloatingTechIcons from "./FloatingTechIcons";
import Globe from "./Globe";
import InteractionRig from "./InteractionRig";
import Lighting from "./Lighting";
import Particles from "./Particles";
import TechExperiencePanel from "./TechExperiencePanel";
import type { SelectedTech } from "./TechExperiencePanel";

function useScenePreferences() {
  const [preferences, setPreferences] = useState({ compact: false, reduceMotion: false });

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setPreferences({
        compact: compactQuery.matches,
        reduceMotion: motionQuery.matches,
      });

    update();
    compactQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      compactQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return preferences;
}

function normalizeTech(value: string) {
  return value.toLowerCase().replace(/\.?js\b/g, "").replace(/[^a-z0-9]/g, "");
}

function isMatchingTech(iconName: string, technology: string) {
  const icon = normalizeTech(iconName);
  const candidate = normalizeTech(technology);
  return candidate === icon || candidate.startsWith(icon) || icon.startsWith(candidate);
}

function buildTechDetails(): SelectedTech[] {
  const projects = [...experience.projects, ...ownProjects];

  return stackLogos.map((icon) => {
    const relatedProjects = projects
      .filter((project) => project.tech.some((technology) => isMatchingTech(icon.name, technology)))
      .map((project) => project.name);
    const skillArea = skillGroups.find((group) =>
      group.skills.some((technology) => isMatchingTech(icon.name, technology))
    );

    return {
      ...icon,
      area: skillArea?.label ?? "Project technology",
      projects: relatedProjects,
      role: experience.role,
      period: experience.period,
    };
  });
}

const TECH_DETAILS = buildTechDetails();

function Scene({
  compact,
  reduceMotion,
  selectedTech,
  onSelectTech,
  onClearSelection,
}: {
  compact: boolean;
  reduceMotion: boolean;
  selectedTech: SelectedTech | null;
  onSelectTech: (name: string) => void;
  onClearSelection: () => void;
}) {
  const motion = reduceMotion ? 0 : 1;

  return (
    <>
      <CameraRig compact={compact} motion={motion} />
      <Lighting compact={compact} motion={motion} />
      <group scale={compact ? 0.76 : 1}>
        <InteractionRig motion={motion} onClearSelection={onClearSelection}>
          <Globe compact={compact} motion={motion} />
          <FloatingTechIcons
            icons={stackLogos}
            compact={compact}
            motion={motion}
            selectedName={selectedTech?.name ?? null}
            onSelect={onSelectTech}
          />
          <Particles compact={compact} motion={motion} />
        </InteractionRig>
      </group>
      <Effects compact={compact} />
      <AdaptiveDpr pixelated={false} />
      <Preload all />
    </>
  );
}

function HeroScene() {
  const { compact, reduceMotion } = useScenePreferences();
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const selectedTech = useMemo(
    () => TECH_DETAILS.find((technology) => technology.name === selectedName) ?? null,
    [selectedName]
  );
  const selectTech = useCallback((name: string) => {
    setSelectedName((current) => (current === name ? null : name));
  }, []);
  const clearSelection = useCallback(() => setSelectedName(null), []);

  useEffect(() => {
    if (!selectedName) return;
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!sceneRef.current?.contains(event.target as Node)) clearSelection();
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [clearSelection, selectedName]);

  return (
    <div
      ref={sceneRef}
      role="application"
      aria-label="Interactive developer technology globe. Drag to rotate and select an icon to view related experience."
      data-cursor-hover
      className="pointer-events-none absolute -right-28 top-24 h-[25rem] w-[25rem] cursor-grab touch-none select-none opacity-75 active:cursor-grabbing sm:-right-16 sm:h-[32rem] sm:w-[32rem] md:pointer-events-auto lg:-right-12 lg:top-1/2 lg:h-[min(48rem,82vh)] lg:w-[min(48rem,52vw)] lg:-translate-y-1/2 lg:opacity-100"
    >
      <Canvas
        camera={{ fov: 38, near: 0.1, far: 40, position: [0, 0, 8.4] }}
        dpr={compact ? [1, 1.25] : [1, 1.75]}
        gl={{
          alpha: true,
          antialias: !compact,
          powerPreference: "high-performance",
          premultipliedAlpha: false,
        }}
        shadows={compact ? false : "percentage"}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <Scene
            compact={compact}
            reduceMotion={reduceMotion}
            selectedTech={selectedTech}
            onSelectTech={selectTech}
            onClearSelection={clearSelection}
          />
        </Suspense>
      </Canvas>
      {!compact && selectedTech && <TechExperiencePanel detail={selectedTech} />}
      <span className="sr-only" aria-live="polite">
        {selectedTech
          ? `${selectedTech.name}. ${selectedTech.area}. Related projects: ${selectedTech.projects.join(
              ", "
            ) || "core portfolio capability"}.`
          : "No technology selected."}
      </span>
    </div>
  );
}

export default memo(HeroScene);
