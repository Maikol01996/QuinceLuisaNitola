'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import type { Mesh } from 'three';

type EnvelopeModelProps = {
  modelPath: string;
};

function Model({ modelPath }: EnvelopeModelProps) {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Control rotation speed
    }
  });

  return <primitive object={scene} ref={meshRef} scale={1.5} />;
}

export function EnvelopeModel({ modelPath }: EnvelopeModelProps) {
  return (
    <Canvas>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Model modelPath={modelPath} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
}
