"use client";

import { memo, type ReactNode, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

function InteractionRig({
  children,
  motion,
  onClearSelection,
}: {
  children: ReactNode;
  motion: number;
  onClearSelection: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const dragRotation = useRef(new THREE.Vector2(0.04, 0));
  const pointer = useRef(new THREE.Vector2());
  const dragging = useRef(false);
  const activePointer = useRef<number | null>(null);
  const lastPosition = useRef(new THREE.Vector2());

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
    dragRotation.current.y += deltaX * 0.0065;
    dragRotation.current.x = THREE.MathUtils.clamp(
      dragRotation.current.x + deltaY * 0.005,
      -0.62,
      0.62
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

  useFrame((_, delta) => {
    if (!group.current) return;
    const hoverX = -pointer.current.y * 0.1 * motion;
    const hoverY = pointer.current.x * 0.14 * motion;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      dragRotation.current.x + hoverX,
      dragging.current ? 11 : 4.5,
      delta
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      dragRotation.current.y + hoverY,
      dragging.current ? 11 : 4.5,
      delta
    );
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
      <mesh
        position={[0, 0, -3.2]}
        onClick={(event) => {
          event.stopPropagation();
          if (event.delta <= 4) onClearSelection();
        }}
      >
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
      </mesh>
      <group ref={group}>{children}</group>
    </group>
  );
}

export default memo(InteractionRig);
