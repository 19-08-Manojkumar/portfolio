"use client";

import { memo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/theme/theme-provider";
import { getScenePalette } from "@/lib/theme";

function Globe({ compact, motion }: { compact: boolean; motion: number }) {
  const globe = useRef<THREE.Group>(null);
  const haloMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const reflection = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const palette = getScenePalette(theme);

  useFrame(({ clock }, delta) => {
    if (globe.current) {
      globe.current.rotation.y += delta * 0.11 * motion;
      globe.current.rotation.x = 0.08 + Math.sin(clock.elapsedTime * 0.25) * 0.025 * motion;
    }
    if (reflection.current) {
      reflection.current.rotation.z -= delta * 0.045 * motion;
    }
    if (haloMaterial.current) {
      haloMaterial.current.opacity =
        0.055 + Math.sin(clock.elapsedTime * 1.15) * 0.018 * motion;
    }
  });

  return (
    <group>
      <group ref={globe}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.55, compact ? 48 : 96, compact ? 32 : 64]} />
          <meshPhysicalMaterial
            color={palette.surface}
            emissive={palette.accent}
            emissiveIntensity={0.075}
            metalness={0.72}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.12}
            envMapIntensity={1.25}
          />
        </mesh>

        <mesh scale={1.006}>
          <icosahedronGeometry args={[1.55, compact ? 3 : 5]} />
          <meshBasicMaterial
            color={palette.accentSoft}
            transparent
            opacity={compact ? 0.055 : 0.075}
            wireframe
            depthWrite={false}
          />
        </mesh>

        <mesh scale={0.985}>
          <sphereGeometry args={[1.55, 48, 32]} />
          <meshStandardMaterial
            color={palette.jade}
            emissive={palette.jade}
            emissiveIntensity={0.16}
            roughness={0.38}
            metalness={0.25}
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      <group ref={reflection} rotation={[1.08, 0.2, -0.25]}>
        <mesh>
          <torusGeometry args={[1.86, 0.012, 8, compact ? 80 : 140]} />
          <meshBasicMaterial
            color={palette.accentSoft}
            transparent
            opacity={0.34}
            depthWrite={false}
          />
        </mesh>
        {!compact && (
          <mesh rotation={[0.38, 0.9, 0.2]}>
            <torusGeometry args={[2.03, 0.006, 8, 160]} />
            <meshBasicMaterial
              color={palette.jade}
              transparent
              opacity={0.18}
              depthWrite={false}
            />
          </mesh>
        )}
      </group>

      <mesh scale={1.22}>
        <sphereGeometry args={[1.55, 40, 28]} />
        <meshBasicMaterial
          ref={haloMaterial}
          color={palette.accent}
          transparent
          opacity={0.055}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

    </group>
  );
}

export default memo(Globe);
