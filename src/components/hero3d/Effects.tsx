"use client";

import { memo } from "react";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function Effects({ compact }: { compact: boolean }) {
  if (compact) return null;

  return (
    <EffectComposer multisampling={4} enableNormalPass={false}>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.28}
        mipmapBlur
      />
    </EffectComposer>
  );
}

export default memo(Effects);
