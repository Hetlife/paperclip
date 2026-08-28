"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, useAnimations } from "@react-three/drei";
import type { Group } from "three";

/**
 * Renders a rigged, looping-animation 3D model for a specimen, once a real
 * asset exists at `modelUrl`. Until then, nothing in the app calls this —
 * see SpecimenMedia.tsx, which is the actual fallback chain in use today
 * (photo -> themed gradient). Wire a specimen up by setting
 * `assets.interactive3dModelUrl` to a .glb path; SpecimenMedia will prefer
 * this viewer over the flat image automatically once that field is set.
 *
 * Where the model comes from is not solved by this component. See
 * apps/atelier-fauna/ROADMAP.md for what a real species-to-3D pipeline
 * requires — this file only assumes a finished, rigged .glb with an
 * "Idle" animation clip already exists.
 */
export function Specimen3DViewer({
  modelUrl,
  idleClipName = "Idle",
}: {
  modelUrl: string;
  idleClipName?: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 2.4], fov: 35 }}
      dpr={[1, 2]}
      className="h-full w-full"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1.1} />
      <Suspense fallback={null}>
        <SpecimenModel modelUrl={modelUrl} idleClipName={idleClipName} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}

function SpecimenModel({
  modelUrl,
  idleClipName,
}: {
  modelUrl: string;
  idleClipName: string;
}) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, group);

  // Play the idle loop if the asset ships one; otherwise apply a gentle
  // procedural sway so an unrigged/static model still reads as "alive"
  // rather than inert, matching the spec's "ambient idle loops" principle.
  const hasIdleClip = Boolean(actions[idleClipName]);

  useFrame((state) => {
    if (hasIdleClip) {
      if (!actions[idleClipName]?.isRunning()) {
        actions[idleClipName]?.reset().fadeIn(0.4).play();
      }
      return;
    }
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      group.current.position.y = Math.sin(t * 0.8) * 0.02;
    }
  });

  return <primitive ref={group} object={scene} />;
}
