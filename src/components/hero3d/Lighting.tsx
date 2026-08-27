"use client";

import { memo, useRef } from "react";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/theme/theme-provider";
import { getScenePalette } from "@/lib/theme";

function Lighting({
  compact,
  motion,
  showGroundShadow = true,
}: {
  compact: boolean;
  motion: number;
  showGroundShadow?: boolean;
}) {
  const lights = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const palette = getScenePalette(theme);

  useFrame(({ clock }) => {
    if (!lights.current) return;
    lights.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.16 * motion;
  });

  return (
    <>
      <ambientLight intensity={0.32} color={palette.text} />
      <group ref={lights}>
        <directionalLight
          castShadow={!compact}
          color={palette.accentSoft}
          intensity={2.4}
          position={[4.5, 5.5, 4]}
          shadow-bias={-0.0002}
          shadow-mapSize-width={compact ? 512 : 1024}
          shadow-mapSize-height={compact ? 512 : 1024}
          shadow-radius={5}
        />
        <spotLight
          color={palette.jade}
          intensity={2.6}
          position={[-4.5, 1.8, 2.8]}
          angle={0.68}
          penumbra={1}
        />
        <pointLight color={palette.violet} intensity={1.5} position={[0, -3.2, -2]} />
      </group>

      <Environment resolution={compact ? 64 : 128} frames={1}>
        <color attach="background" args={[palette.background]} />
        <Lightformer
          form="ring"
          color={palette.accentSoft}
          intensity={3.5}
          scale={4}
          position={[0, 3, -4]}
          rotation-x={Math.PI / 2}
        />
        <Lightformer
          form="rect"
          color={palette.jade}
          intensity={2.2}
          scale={[3, 5, 1]}
          position={[-5, 0, 1]}
          rotation-y={Math.PI / 2}
        />
        <Lightformer
          form="rect"
          color={palette.accent}
          intensity={2.6}
          scale={[2, 4, 1]}
          position={[5, 1, 0]}
          rotation-y={-Math.PI / 2}
        />
      </Environment>

      {!compact && showGroundShadow && (
        <ContactShadows
          position={[0, -2.15, 0]}
          opacity={theme === "light" ? 0.12 : 0.3}
          scale={6.5}
          blur={2.8}
          far={5}
          resolution={512}
          color={palette.shadow}
        />
      )}
    </>
  );
}

export default memo(Lighting);
