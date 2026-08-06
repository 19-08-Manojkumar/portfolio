"use client";

import { memo, useRef } from "react";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Lighting({ compact, motion }: { compact: boolean; motion: number }) {
  const lights = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!lights.current) return;
    lights.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.16 * motion;
  });

  return (
    <>
      <ambientLight intensity={0.32} color="#f3f2ee" />
      <group ref={lights}>
        <directionalLight
          castShadow={!compact}
          color="#f0b184"
          intensity={2.4}
          position={[4.5, 5.5, 4]}
          shadow-bias={-0.0002}
          shadow-mapSize-width={compact ? 512 : 1024}
          shadow-mapSize-height={compact ? 512 : 1024}
          shadow-radius={5}
        />
        <spotLight
          color="#7fdcc0"
          intensity={2.6}
          position={[-4.5, 1.8, 2.8]}
          angle={0.68}
          penumbra={1}
        />
        <pointLight color="#a599e9" intensity={1.5} position={[0, -3.2, -2]} />
      </group>

      <Environment resolution={compact ? 64 : 128} frames={1}>
        <color attach="background" args={["#08090b"]} />
        <Lightformer
          form="ring"
          color="#f0b184"
          intensity={3.5}
          scale={4}
          position={[0, 3, -4]}
          rotation-x={Math.PI / 2}
        />
        <Lightformer
          form="rect"
          color="#7fdcc0"
          intensity={2.2}
          scale={[3, 5, 1]}
          position={[-5, 0, 1]}
          rotation-y={Math.PI / 2}
        />
        <Lightformer
          form="rect"
          color="#d98a4b"
          intensity={2.6}
          scale={[2, 4, 1]}
          position={[5, 1, 0]}
          rotation-y={-Math.PI / 2}
        />
      </Environment>

      {!compact && (
        <ContactShadows
          position={[0, -2.15, 0]}
          opacity={0.3}
          scale={6.5}
          blur={2.8}
          far={5}
          resolution={512}
          color="#000000"
        />
      )}
    </>
  );
}

export default memo(Lighting);
