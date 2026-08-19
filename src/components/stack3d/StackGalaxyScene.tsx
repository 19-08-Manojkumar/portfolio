"use client";

import { memo, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AdaptiveDpr, Billboard, Preload, Text, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import Effects from "@/components/hero3d/Effects";
import Lighting from "@/components/hero3d/Lighting";
import type { StackGalaxyGroup } from "@/lib/stack-galaxy";

function useScenePreferences() {
  const [preferences, setPreferences] = useState({ compact: false, reduceMotion: false });

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 1023px)");
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

function smoothMix(value: number, start: number, end: number) {
  if (value <= start) return 0;
  if (value >= end) return 1;
  return (value - start) / (end - start);
}

function labelForPlanet(value: string) {
  const words = value.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function orbitRadiusForIndex(index: number, compact: boolean) {
  const ring = Math.floor(index / 3);
  const slot = index % 3;
  const base = compact ? 1.95 : 2.15;
  const ringGap = compact ? 0.72 : 0.9;
  const slotGap = compact ? 0.36 : 0.48;
  return base + ring * ringGap + slot * slotGap;
}

function selectedSystemExtent(toolCount: number, compact: boolean) {
  if (toolCount <= 0) return compact ? 2.8 : 3.1;
  return orbitRadiusForIndex(toolCount - 1, compact) + (compact ? 0.8 : 0.95);
}

function planetBubbleScale(size: number, compact: boolean) {
  return Math.max(compact ? 0.24 : 0.28, size * (compact ? 0.74 : 0.88));
}

function planetIconScale(size: number, compact: boolean) {
  return Math.max(compact ? 0.19 : 0.23, size * (compact ? 0.82 : 0.94));
}

function planetLabelOffset(size: number, compact: boolean) {
  return Math.max(compact ? 0.34 : 0.4, size * 1.35);
}

function planetFallbackFontSize(size: number, compact: boolean) {
  return Math.max(compact ? 0.11 : 0.125, size * 0.56);
}

function seededValue(index: number, offset: number) {
  const value = Math.sin(index * 9283.17 + offset * 37.41) * 43758.5453;
  return value - Math.floor(value);
}

function StackGalaxyScene({
  groups,
  progress,
  direction,
  focusedGroupId,
  expandedGroupId,
  selectedToolId,
  onSelectGroup,
  onSelectTool,
  onResetGroup,
}: {
  groups: StackGalaxyGroup[];
  progress: number;
  direction: 1 | -1;
  focusedGroupId: string;
  expandedGroupId: string | null;
  selectedToolId: string | null;
  onSelectGroup: (groupId: string) => void;
  onSelectTool: (toolId: string) => void;
  onResetGroup: () => void;
}) {
  const { compact, reduceMotion } = useScenePreferences();

  return (
    <div
      className="absolute inset-0"
      data-cursor-hover
      aria-label="Interactive stack galaxy showing technology groups and tool planets."
      role="application"
    >
      <Canvas
        camera={{ fov: compact ? 42 : 36, near: 0.1, far: 40, position: [0, 0.2, compact ? 9 : 8.1] }}
        dpr={compact ? [1, 1.35] : [1, 1.8]}
        gl={{
          alpha: true,
          antialias: !compact,
          powerPreference: "high-performance",
          premultipliedAlpha: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.04;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            compact={compact}
            motion={reduceMotion ? 0 : 1}
            groups={groups}
            progress={progress}
            direction={direction}
            focusedGroupId={focusedGroupId}
            expandedGroupId={expandedGroupId}
            selectedToolId={selectedToolId}
            onSelectGroup={onSelectGroup}
            onSelectTool={onSelectTool}
            onResetGroup={onResetGroup}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneContent({
  compact,
  motion,
  groups,
  progress,
  direction,
  focusedGroupId,
  expandedGroupId,
  selectedToolId,
  onSelectGroup,
  onSelectTool,
  onResetGroup,
}: {
  compact: boolean;
  motion: number;
  groups: StackGalaxyGroup[];
  progress: number;
  direction: 1 | -1;
  focusedGroupId: string;
  expandedGroupId: string | null;
  selectedToolId: string | null;
  onSelectGroup: (groupId: string) => void;
  onSelectTool: (toolId: string) => void;
  onResetGroup: () => void;
}) {
  const root = useRef<THREE.Group>(null);
  const selectedMode = expandedGroupId !== null;
  const systemMix = smoothMix(progress, 0.18, 0.62);
  const focusMix = expandedGroupId ? 1 : smoothMix(progress, 0.68, 0.92) * 0.35;
  const activeGroup = groups.find((group) => group.id === (expandedGroupId ?? focusedGroupId)) ?? groups[0];
  const fitRadius = selectedSystemExtent(activeGroup.tools.length, compact);

  useFrame(({ camera, clock }, delta) => {
    if (!root.current) return;
    const targetY = compact ? 0 : selectedMode ? -0.02 : -0.1;
    const orbitSpeed = selectedMode
      ? 0
      : (0.08 + systemMix * 0.09 + focusMix * 0.07) * direction * motion;

    root.current.rotation.y += delta * orbitSpeed;
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      selectedMode ? 0.42 : 0.96,
      3.2,
      delta
    );
    root.current.rotation.z = THREE.MathUtils.damp(
      root.current.rotation.z,
      selectedMode ? 0.04 : compact ? 0.1 : 0.18,
      3.2,
      delta
    );
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, targetY, 3.4, delta);

    const selectedTargetZ = compact
      ? Math.max(8.6, fitRadius * 2.3)
      : Math.max(7.8, fitRadius * 2.05);
    const targetZ = selectedMode
      ? selectedTargetZ
      : compact
        ? 8.8 - focusMix * 0.45
        : 8.1 - focusMix * 0.55;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      selectedMode ? 0 : Math.sin(clock.elapsedTime * 0.14) * 0.08 * motion,
      2.8,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      selectedMode ? 0.08 : 0.18 + Math.cos(clock.elapsedTime * 0.16) * 0.06 * motion,
      2.8,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.8, delta);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Lighting compact={compact} motion={motion} />
      <group>
        <mesh
          position={[0, 0, -5]}
          onClick={(event) => {
            event.stopPropagation();
            if (event.delta > 4) return;
            onResetGroup();
          }}
        >
          <planeGeometry args={[22, 22]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
        </mesh>

        <group ref={root} scale={compact ? 0.86 : 1}>
          <GalaxyDust
            compact={compact}
            motion={motion}
            direction={direction}
            systemMix={systemMix}
            focusMix={focusMix}
            isolated={selectedMode}
          />

          {!selectedMode &&
            groups.map((group, index) => (
              <ClusterSystem
                key={group.id}
                group={group}
                index={index}
                compact={compact}
                motion={motion}
                direction={direction}
                systemMix={systemMix}
                focusMix={focusMix}
                active={group.id === focusedGroupId}
                expanded={group.id === expandedGroupId}
                onSelectGroup={onSelectGroup}
              />
            ))}

          {expandedGroupId && (
            <ToolSolarSystem
              compact={compact}
              motion={motion}
              direction={direction}
              group={activeGroup}
              fitRadius={fitRadius}
              selectedToolId={selectedToolId}
              onSelectTool={onSelectTool}
            />
          )}
        </group>
      </group>
      <Effects compact={compact} />
      <AdaptiveDpr pixelated={false} />
      <Preload all />
    </>
  );
}

function GalaxyDust({
  compact,
  motion,
  direction,
  systemMix,
  focusMix,
  isolated,
}: {
  compact: boolean;
  motion: number;
  direction: 1 | -1;
  systemMix: number;
  focusMix: number;
  isolated: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => {
    const count = compact ? 1800 : 3200;
    const data = new Float32Array(count * 3);
    const armCount = 4;

    for (let index = 0; index < count; index += 1) {
      const t = index / count;
      const arm = index % armCount;
      const radius = Math.pow(seededValue(index, 1), 0.55) * 4.8;
      const spin = radius * 1.55;
      const base = (arm / armCount) * Math.PI * 2;
      const angle = base + spin + t * Math.PI * 0.5 + (seededValue(index, 2) - 0.5) * 0.5;
      const thickness = (seededValue(index, 3) - 0.5) * (compact ? 0.24 : 0.32);

      data[index * 3] = Math.cos(angle) * radius * 1.35;
      data[index * 3 + 1] = thickness;
      data[index * 3 + 2] = Math.sin(angle) * radius * 0.52;
    }

    return data;
  }, [compact]);

  useFrame(({ clock }, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * (0.06 + systemMix * 0.07) * direction * motion;
      group.current.rotation.z = Math.sin(clock.elapsedTime * 0.18) * 0.08 * motion;
      const scaleX = isolated ? 1.16 : 1 - focusMix * 0.12;
      const scaleY = isolated ? 0.82 : 1 - focusMix * 0.3;
      const scaleZ = isolated ? 1.08 : 1 - focusMix * 0.08;
      group.current.scale.x = THREE.MathUtils.damp(group.current.scale.x, scaleX, 3.4, delta);
      group.current.scale.y = THREE.MathUtils.damp(group.current.scale.y, scaleY, 3.4, delta);
      group.current.scale.z = THREE.MathUtils.damp(group.current.scale.z, scaleZ, 3.4, delta);
    }
    if (material.current) {
      material.current.opacity = THREE.MathUtils.damp(
        material.current.opacity,
        isolated ? (compact ? 0.22 : 0.28) : compact ? 0.48 - focusMix * 0.14 : 0.6 - focusMix * 0.2,
        4,
        delta
      );
    }
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={material}
          color="#f0b184"
          size={compact ? 0.026 : 0.03}
          sizeAttenuation
          transparent
          opacity={compact ? 0.48 : 0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <mesh scale={isolated ? [1.18, 0.26, 0.48] : [0.78, 0.2, 0.36]}>
        <sphereGeometry args={[1.18, 32, 32]} />
        <meshBasicMaterial
          color="#f4c49d"
          transparent
          opacity={isolated ? 0.14 : 0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ClusterSystem({
  group,
  index,
  compact,
  motion,
  direction,
  systemMix,
  focusMix,
  active,
  expanded,
  onSelectGroup,
}: {
  group: StackGalaxyGroup;
  index: number;
  compact: boolean;
  motion: number;
  direction: 1 | -1;
  systemMix: number;
  focusMix: number;
  active: boolean;
  expanded: boolean;
  onSelectGroup: (groupId: string) => void;
}) {
  const cluster = useRef<THREE.Group>(null);
  const halo = useRef<THREE.MeshBasicMaterial>(null);
  const galaxyPosition = useMemo(() => {
    const angle = -1.4 + index * 1.15;
    const radius = 1.35 + index * 0.68;
    return new THREE.Vector3(Math.cos(angle) * radius * 1.3, (index - 2) * 0.06, Math.sin(angle) * radius * 0.45);
  }, [index]);
  const orbitPosition = useMemo(() => {
    const angle = (-Math.PI / 1.8) + (index / 5) * Math.PI * 1.35;
    const radius = compact ? 2.4 : 3.2;
    return new THREE.Vector3(Math.cos(angle) * radius, (index - 2) * 0.18, Math.sin(angle) * radius * 0.38);
  }, [compact, index]);
  const expandedPosition = useMemo(
    () => (expanded ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(galaxyPosition.x * 1.7, galaxyPosition.y, galaxyPosition.z - 2.1)),
    [expanded, galaxyPosition]
  );

  useFrame(({ clock }, delta) => {
    if (!cluster.current) return;

    const target = galaxyPosition
      .clone()
      .lerp(orbitPosition, systemMix)
      .lerp(expandedPosition, expanded ? 1 : focusMix * 0.24);

    cluster.current.position.lerp(target, 1 - Math.exp(-delta * 3.4));
    cluster.current.rotation.y += delta * (0.18 + index * 0.04) * direction * motion;
    cluster.current.rotation.z = Math.sin(clock.elapsedTime * 0.45 + index) * 0.06 * motion;

    const targetScale = expanded ? 1.68 : active ? 1.18 + systemMix * 0.12 : 0.92;
    cluster.current.scale.setScalar(
      THREE.MathUtils.damp(cluster.current.scale.x, targetScale, expanded ? 7 : 4.5, delta)
    );

    if (halo.current) {
      halo.current.opacity = THREE.MathUtils.damp(
        halo.current.opacity,
        expanded ? 0.25 : active ? 0.18 : 0.08,
        4.2,
        delta
      );
    }
  });

  return (
    <group ref={cluster}>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          if (event.delta <= 4) onSelectGroup(group.id);
        }}
      >
        <sphereGeometry args={[0.22, compact ? 18 : 26, compact ? 18 : 26]} />
        <meshPhysicalMaterial
          color="#121417"
          emissive={group.accent}
          emissiveIntensity={expanded ? 1.2 : active ? 0.78 : 0.36}
          metalness={0.36}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[0.48, 0.014, 8, 90]} />
        <meshBasicMaterial
          color={group.glow}
          transparent
          opacity={expanded ? 0.42 : active ? 0.32 : 0.18}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={2.2}>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshBasicMaterial
          ref={halo}
          color={group.accent}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      <Billboard follow>
        <Text
          position={[0, 0.52, 0]}
          fontSize={compact ? 0.115 : 0.145}
          color={expanded || active ? "#f3f2ee" : "#b8bbc0"}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {group.label}
        </Text>
      </Billboard>
    </group>
  );
}

function ToolSolarSystem({
  compact,
  motion,
  direction,
  group,
  fitRadius,
  selectedToolId,
  onSelectTool,
}: {
  compact: boolean;
  motion: number;
  direction: 1 | -1;
  group: StackGalaxyGroup;
  fitRadius: number;
  selectedToolId: string | null;
  onSelectTool: (toolId: string) => void;
}) {
  const system = useRef<THREE.Group>(null);
  const rig = useRef<THREE.Group>(null);
  const orbitGroup = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Group>(null);
  const haloMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const toolRefs = useRef<Array<THREE.Group | null>>([]);
  const dragRotation = useRef(new THREE.Vector2(0.12, 0));
  const pointer = useRef(new THREE.Vector2());
  const dragging = useRef(false);
  const activePointer = useRef<number | null>(null);
  const lastPosition = useRef(new THREE.Vector2());
  const { gl } = useThree();
  const toolsWithLogos = group.tools.filter((tool) => tool.logo);
  const textures = useTexture(toolsWithLogos.map((tool) => tool.logo!)) as THREE.Texture[];
  const textureMap = useMemo(() => {
    return new Map(group.tools.map((tool) => [tool.id, textures[toolsWithLogos.findIndex((item) => item.id === tool.id)] ?? null]));
  }, [group.tools, textures, toolsWithLogos]);

  useEffect(() => {
    const anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = anisotropy;
      texture.needsUpdate = true;
    });
  }, [gl, textures]);

  const startDrag = (event: ThreeEvent<PointerEvent>) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    dragging.current = true;
    activePointer.current = event.pointerId;
    lastPosition.current.set(event.clientX, event.clientY);
    (event.target as Element).setPointerCapture(event.pointerId);
  };

  const updatePointer = (event: ThreeEvent<PointerEvent>) => {
    pointer.current.copy(event.pointer);
    if (!dragging.current || activePointer.current !== event.pointerId) return;
    event.stopPropagation();
    const deltaX = event.clientX - lastPosition.current.x;
    const deltaY = event.clientY - lastPosition.current.y;
    dragRotation.current.y += deltaX * 0.0062;
    dragRotation.current.x = THREE.MathUtils.clamp(
      dragRotation.current.x + deltaY * 0.0044,
      -0.42,
      0.46
    );
    lastPosition.current.set(event.clientX, event.clientY);
  };

  const stopDrag = (event: ThreeEvent<PointerEvent>) => {
    if (activePointer.current !== event.pointerId) return;
    event.stopPropagation();
    dragging.current = false;
    activePointer.current = null;
    const target = event.target as Element;
    if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
  };

  useFrame(({ clock }, delta) => {
    if (rig.current) {
      const hoverX = -pointer.current.y * 0.1 * motion;
      const hoverY = pointer.current.x * 0.14 * motion;
      rig.current.rotation.x = THREE.MathUtils.damp(
        rig.current.rotation.x,
        dragRotation.current.x + hoverX,
        dragging.current ? 11 : 4.5,
        delta
      );
      rig.current.rotation.y = THREE.MathUtils.damp(
        rig.current.rotation.y,
        dragRotation.current.y + hoverY,
        dragging.current ? 11 : 4.5,
        delta
      );
    }
    if (system.current) {
      const fitScale = compact
        ? THREE.MathUtils.clamp(3.35 / fitRadius, 0.72, 0.94)
        : THREE.MathUtils.clamp(3.95 / fitRadius, 0.78, 1.02);
      system.current.scale.setScalar(
        THREE.MathUtils.damp(system.current.scale.x, fitScale, 4.5, delta)
      );
      system.current.rotation.y = THREE.MathUtils.damp(system.current.rotation.y, 0.12, 3.4, delta);
    }
    if (orbitGroup.current) {
      orbitGroup.current.rotation.y += delta * 0.26 * direction * motion;
    }
    if (shell.current) {
      shell.current.rotation.y += delta * 0.12 * motion;
      shell.current.rotation.z -= delta * 0.05 * motion;
    }
    if (haloMaterial.current) {
      haloMaterial.current.opacity =
        0.12 + Math.sin(clock.elapsedTime * 1.05) * 0.03 * motion;
    }

    toolRefs.current.forEach((planet, index) => {
      if (!planet) return;
      const tool = group.tools[index];
      const orbitSpeed = (0.42 - Math.floor(index / 3) * 0.06) * direction * motion;
      const angle = clock.elapsedTime * orbitSpeed + index * 1.42;
      const radius = orbitRadiusForIndex(index, compact);

      planet.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
      planet.scale.setScalar(
        THREE.MathUtils.damp(
          planet.scale.x,
          selectedToolId === tool.id ? 1.18 : 1,
          6.5,
          delta
        )
      );
    });
  });

  return (
    <group
      onPointerDown={startDrag}
      onPointerMove={updatePointer}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onPointerOut={() => {
        if (!dragging.current) pointer.current.set(0, 0);
      }}
    >
      <mesh position={[0, 0, -3.6]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>
      <group ref={rig}>
        <group ref={system} position={[0, 0, 0]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.76, compact ? 38 : 58, compact ? 32 : 52]} />
            <meshPhysicalMaterial
              color="#121417"
              emissive={group.accent}
              emissiveIntensity={0.34}
              metalness={0.62}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={1.18}
            />
          </mesh>

          <group ref={shell}>
            <mesh scale={1.008}>
              <icosahedronGeometry args={[0.77, compact ? 3 : 5]} />
              <meshBasicMaterial
                color={group.glow}
                transparent
                opacity={0.1}
                wireframe
                depthWrite={false}
              />
            </mesh>

            <mesh scale={0.985}>
              <sphereGeometry args={[0.77, 32, 24]} />
              <meshStandardMaterial
                color={group.glow}
                emissive={group.glow}
                emissiveIntensity={0.18}
                roughness={0.35}
                metalness={0.22}
                transparent
                opacity={0.08}
                side={THREE.BackSide}
              />
            </mesh>
          </group>

          <group rotation={[1.02, 0.2, -0.25]}>
            <mesh>
              <torusGeometry args={[1.22, 0.018, 8, compact ? 90 : 150]} />
              <meshBasicMaterial
                color={group.glow}
                transparent
                opacity={0.32}
                depthWrite={false}
              />
            </mesh>
            <mesh rotation={[0.34, 0.92, 0.14]}>
              <torusGeometry args={[1.42, 0.008, 8, 180]} />
              <meshBasicMaterial
                color={group.accent}
                transparent
                opacity={0.18}
                depthWrite={false}
              />
            </mesh>
          </group>

          <mesh scale={1.4}>
            <sphereGeometry args={[0.77, 24, 24]} />
            <meshBasicMaterial
              ref={haloMaterial}
              color={group.glow}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.BackSide}
            />
          </mesh>

          <group ref={orbitGroup} rotation={[Math.PI / 2, 0, 0]}>
            {group.tools.map((tool, index) => (
              <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[orbitRadiusForIndex(index, compact), 0.009, 8, 180]} />
                <meshBasicMaterial
                  color={selectedToolId === tool.id ? group.accent : group.glow}
                  transparent
                  opacity={selectedToolId === tool.id ? 0.32 : 0.12}
                  depthWrite={false}
                />
              </mesh>
            ))}

            {group.tools.map((tool, index) => (
              <group
                key={tool.id}
                ref={(node) => {
                  toolRefs.current[index] = node;
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  if (event.delta <= 4) onSelectTool(tool.id);
                }}
              >
                <Billboard follow>
                  <mesh scale={planetBubbleScale(tool.size, compact)}>
                    <circleGeometry args={[1, 32]} />
                    <meshPhysicalMaterial
                      color={selectedToolId === tool.id ? "#2b1b10" : "#121417"}
                      emissive="#d98a4b"
                      emissiveIntensity={selectedToolId === tool.id ? 0.28 : 0.04}
                      metalness={0.35}
                      roughness={0.32}
                      transparent
                      opacity={0.92}
                      envMapIntensity={0.85}
                    />
                  </mesh>

                  {textureMap.get(tool.id) ? (
                    <mesh position={[0, 0, 0.03]} scale={planetIconScale(tool.size, compact)}>
                      <planeGeometry args={[1, 1]} />
                      <meshBasicMaterial
                        map={textureMap.get(tool.id)!}
                        alphaTest={0.04}
                        transparent
                        toneMapped={false}
                        depthWrite={false}
                      />
                    </mesh>
                  ) : (
                    <Text
                      position={[0, 0, 0.03]}
                      fontSize={planetFallbackFontSize(tool.size, compact)}
                      color="#f3f2ee"
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={1.5}
                    >
                      {labelForPlanet(tool.shortName)}
                    </Text>
                  )}

                  {selectedToolId === tool.id && (
                    <Text
                      position={[0, planetLabelOffset(tool.size, compact), 0]}
                      fontSize={compact ? 0.075 : 0.09}
                      color="#f3f2ee"
                      anchorX="center"
                      anchorY="middle"
                      maxWidth={2.4}
                    >
                      {tool.shortName}
                    </Text>
                  )}
                </Billboard>
              </group>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}

export default memo(StackGalaxyScene);
