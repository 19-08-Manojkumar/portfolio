"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Billboard, useTexture } from "@react-three/drei";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

type TechIcon = { name: string; src: string };

function FloatingTechIcons({
  icons,
  compact,
  motion,
  selectedName,
  onSelect,
}: {
  icons: readonly TechIcon[];
  compact: boolean;
  motion: number;
  selectedName: string | null;
  onSelect: (name: string) => void;
}) {
  const visibleIcons = useMemo(() => icons.slice(0, compact ? 5 : 8), [compact, icons]);
  const textures = useTexture(visibleIcons.map((icon) => icon.src)) as THREE.Texture[];
  const iconRefs = useRef<Array<THREE.Group | null>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { gl } = useThree();
  const orbitPoint = useMemo(() => new THREE.Vector3(), []);
  const orbitTilt = useMemo(() => new THREE.Euler(0.18, -0.55, 0.1), []);

  useEffect(() => {
    const anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = anisotropy;
      texture.needsUpdate = true;
    });
  }, [gl, textures]);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime * 0.16 * motion;
    const count = visibleIcons.length;

    iconRefs.current.forEach((icon, index) => {
      if (!icon) return;
      const angle = time + (index / count) * Math.PI * 2;
      const radius = compact ? 2.14 : 2.28;
      orbitPoint.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0).applyEuler(orbitTilt);
      orbitPoint.y += Math.sin(clock.elapsedTime * 0.8 + index) * 0.055 * motion;
      icon.position.copy(orbitPoint);
      icon.rotation.z = Math.sin(clock.elapsedTime * 0.45 + index) * 0.08 * motion;
      const isActive = hoveredIndex === index || selectedName === visibleIcons[index]?.name;
      const targetScale = isActive ? 1.16 : 1;
      icon.scale.setScalar(THREE.MathUtils.damp(icon.scale.x, targetScale, 8, 1 / 60));
    });
  });

  const showPointer = (event: ThreeEvent<PointerEvent>, index: number) => {
    event.stopPropagation();
    setHoveredIndex(index);
  };

  const restorePointer = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHoveredIndex(null);
  };

  return (
    <group>
      {visibleIcons.map((icon, index) => (
        <group
          key={icon.name}
          ref={(node) => {
            iconRefs.current[index] = node;
          }}
          onPointerOver={(event) => showPointer(event, index)}
          onPointerOut={restorePointer}
          onClick={(event) => {
            event.stopPropagation();
            if (event.delta <= 4) onSelect(icon.name);
          }}
        >
          <Billboard follow>
            <mesh scale={compact ? 0.72 : 0.82}>
              <circleGeometry args={[0.42, 32]} />
              <meshPhysicalMaterial
                color={selectedName === icon.name ? "#2b1b10" : "#121417"}
                emissive="#d98a4b"
                emissiveIntensity={selectedName === icon.name ? 0.3 : 0.025}
                metalness={0.35}
                roughness={0.32}
                transparent
                opacity={0.9}
                envMapIntensity={0.85}
              />
            </mesh>
            <mesh position={[0, 0, 0.018]} scale={compact ? 0.38 : 0.44}>
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial
                map={textures[index]}
                alphaTest={0.04}
                transparent
                toneMapped={false}
                depthWrite={false}
              />
            </mesh>
          </Billboard>
        </group>
      ))}
    </group>
  );
}

export default memo(FloatingTechIcons);
