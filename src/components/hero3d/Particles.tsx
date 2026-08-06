"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { Billboard, Line, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededValue(index: number, offset: number) {
  const value = Math.sin(index * 9283.17 + offset * 37.41) * 43758.5453;
  return value - Math.floor(value);
}

function Terminal({ motion }: { motion: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = 0.72 + Math.sin(clock.elapsedTime * 0.55) * 0.1 * motion;
    group.current.rotation.z = -0.09 + Math.sin(clock.elapsedTime * 0.35) * 0.025 * motion;
  });

  return (
    <group ref={group} position={[2.38, 0.72, -0.65]} scale={0.58}>
      <Billboard follow>
        <RoundedBox args={[1.55, 0.98, 0.08]} radius={0.1} smoothness={3}>
          <meshPhysicalMaterial
            color="#0e1013"
            metalness={0.38}
            roughness={0.3}
            transparent
            opacity={0.92}
          />
        </RoundedBox>
        <mesh position={[0, 0.29, 0.052]}>
          <planeGeometry args={[1.37, 0.035]} />
          <meshBasicMaterial color="#33373d" />
        </mesh>
        {[-0.52, -0.42, -0.32].map((x, index) => (
          <mesh key={x} position={[x, 0.39, 0.06]}>
            <circleGeometry args={[0.035, 12]} />
            <meshBasicMaterial color={index === 0 ? "#d98a4b" : "#6e7075"} />
          </mesh>
        ))}
        {[
          [-0.32, 0.1, 0.52, "#7fdcc0"],
          [-0.19, -0.08, 0.78, "#d98a4b"],
          [-0.36, -0.26, 0.42, "#a599e9"],
        ].map(([x, y, width, color]) => (
          <mesh key={`${x}-${y}`} position={[x as number, y as number, 0.06]}>
            <planeGeometry args={[width as number, 0.055]} />
            <meshBasicMaterial color={color as string} transparent opacity={0.72} />
          </mesh>
        ))}
      </Billboard>
    </group>
  );
}

function CodeGlyphs({ motion }: { motion: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.08 * motion;
    group.current.position.y = -1.2 + Math.cos(clock.elapsedTime * 0.5) * 0.08 * motion;
  });

  return (
    <group ref={group} position={[-2.34, -1.2, -0.3]} scale={0.56}>
      <Billboard follow>
        <Line
          points={[
            [-0.35, 0.48, 0],
            [-0.72, 0, 0],
            [-0.35, -0.48, 0],
          ]}
          color="#d98a4b"
          lineWidth={1.6}
          transparent
          opacity={0.72}
        />
        <Line
          points={[
            [0.35, 0.48, 0],
            [0.72, 0, 0],
            [0.35, -0.48, 0],
          ]}
          color="#f0b184"
          lineWidth={1.6}
          transparent
          opacity={0.72}
        />
        <Line
          points={[
            [0.12, 0.6, 0],
            [-0.14, -0.6, 0],
          ]}
          color="#7fdcc0"
          lineWidth={1.15}
          transparent
          opacity={0.55}
        />
      </Billboard>
    </group>
  );
}

function Particles({ compact, motion }: { compact: boolean; motion: number }) {
  const particleGroup = useRef<THREE.Group>(null);
  const cubes = useRef<THREE.InstancedMesh>(null);
  const cubeCount = compact ? 5 : 12;
  const particleCount = compact ? 45 : 110;

  const positions = useMemo(() => {
    const result = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.1 + seededValue(index, 1) * 2.25;
      const theta = seededValue(index, 2) * Math.PI * 2;
      const phi = Math.acos(seededValue(index, 3) * 2 - 1);
      result[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      result[index * 3 + 1] = radius * Math.cos(phi) * 0.78;
      result[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) * 0.46;
    }
    return result;
  }, [particleCount]);

  const cubeTransforms = useMemo(
    () =>
      Array.from({ length: cubeCount }, (_, index) => ({
        position: new THREE.Vector3(
          (seededValue(index, 7) - 0.5) * 6.6,
          (seededValue(index, 8) - 0.5) * 4.9,
          -0.8 + seededValue(index, 9) * 1.1
        ),
        rotation: new THREE.Euler(
          seededValue(index, 10) * Math.PI,
          seededValue(index, 11) * Math.PI,
          seededValue(index, 12) * Math.PI
        ),
        scale: 0.035 + seededValue(index, 13) * 0.085,
      })),
    [cubeCount]
  );

  useEffect(() => {
    if (!cubes.current) return;
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    cubeTransforms.forEach((transform, index) => {
      quaternion.setFromEuler(transform.rotation);
      matrix.compose(
        transform.position,
        quaternion,
        new THREE.Vector3(transform.scale, transform.scale, transform.scale)
      );
      cubes.current?.setMatrixAt(index, matrix);
    });
    cubes.current.instanceMatrix.needsUpdate = true;
  }, [cubeTransforms]);

  useFrame(({ clock }, delta) => {
    if (particleGroup.current) {
      particleGroup.current.rotation.y += delta * 0.025 * motion;
      particleGroup.current.rotation.z = Math.sin(clock.elapsedTime * 0.1) * 0.04 * motion;
    }
    if (cubes.current) {
      cubes.current.rotation.y -= delta * 0.05 * motion;
      cubes.current.rotation.x = Math.sin(clock.elapsedTime * 0.16) * 0.12 * motion;
    }
  });

  return (
    <group>
      <group ref={particleGroup}>
        <points frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#f0b184"
            size={compact ? 0.018 : 0.024}
            sizeAttenuation
            transparent
            opacity={0.52}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      <instancedMesh ref={cubes} args={[undefined, undefined, cubeCount]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#d98a4b"
          emissive="#d98a4b"
          emissiveIntensity={0.18}
          metalness={0.62}
          roughness={0.3}
          transparent
          opacity={0.58}
        />
      </instancedMesh>

      {!compact && (
        <>
          <Terminal motion={motion} />
          <CodeGlyphs motion={motion} />
        </>
      )}
    </group>
  );
}

export default memo(Particles);
