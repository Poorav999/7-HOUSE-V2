"use client";

import { useMemo, useRef, useEffect } from "react";
import { InstancedMesh, Object3D } from "three";
import { useFrame } from "@react-three/fiber";

export default function CherryPetals() {
  const petalCount = 300; // Less clutter, higher quality
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  
  const particlesRef = useRef<any[]>([]);
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < petalCount; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = Math.random() * 20;
      const z = (Math.random() - 0.5) * 60;
      const speed = Math.random() * 0.02 + 0.01;
      const swaySpeed = Math.random() * 0.5 + 0.2;
      const rotSpeed = Math.random() * 0.05;
      temp.push({ x, y, z, speed, swaySpeed, rotSpeed, offset: Math.random() * Math.PI * 2 });
    }
    particlesRef.current = temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const particles = particlesRef.current;
    particles.forEach((p, i) => {
      // falling math
      p.y -= p.speed;
      if (p.y < -5) {
        p.y = 20; // reset to top
        p.x = (Math.random() - 0.5) * 60;
        p.z = (Math.random() - 0.5) * 60;
      }
      p.x += Math.sin(state.clock.elapsedTime * p.swaySpeed + p.offset) * 0.01;

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.x += p.rotSpeed;
      dummy.rotation.y += p.rotSpeed;
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, petalCount]} receiveShadow>
      {/* 0.2x0.2 plane rotated to look like a small block/petal */}
      <boxGeometry args={[0.2, 0.05, 0.2]} />
      <meshStandardMaterial color="#ff2a7a" emissive="#ff2a7a" emissiveIntensity={0.5} roughness={0.8} />
    </instancedMesh>
  );
}
