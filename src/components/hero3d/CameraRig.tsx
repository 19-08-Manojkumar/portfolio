"use client";

import { memo, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CameraRig({ compact, motion }: { compact: boolean; motion: number }) {
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth - 0.5) * 2,
        (event.clientY / window.innerHeight - 0.5) * 2
      );
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, []);

  useFrame(({ camera, clock }, delta) => {
    const time = clock.elapsedTime;
    const parallax = compact ? 0.12 : 0.28;
    const targetX =
      pointer.current.x * parallax * motion + Math.sin(time * 0.18) * 0.08 * motion;
    const targetY =
      -pointer.current.y * parallax * 0.62 * motion + Math.cos(time * 0.16) * 0.06 * motion;
    const targetZ = compact ? 8.9 : 8.4;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.2, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default memo(CameraRig);
