"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Terrain from "./Terrain";
import CherryPetals from "./CherryPetals";
import { Suspense, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";


function CameraRig({ targetPosition, targetLookAt }: { targetPosition: [number, number, number], targetLookAt: [number, number, number] }) {
  const cameraRef = useRef<any>(null);

  useFrame((state) => {
    state.camera.position.lerp({ x: targetPosition[0], y: targetPosition[1], z: targetPosition[2] } as any, 0.05);
    const scrollY = window.scrollY;
    state.camera.position.y += (scrollY * 0.005) - (state.camera.position.y - targetPosition[1]) * 0.1;
    state.camera.lookAt(targetLookAt[0], targetLookAt[1], targetLookAt[2]);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={targetPosition} fov={45} />;
}

export default function World3D() {
  const pathname = usePathname();
  const [targetPosition, setTargetPosition] = useState<[number, number, number]>([0, 8, 28]);
  const [targetLookAt, setTargetLookAt] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    if (pathname === "/") {
      setTargetPosition([0, 8, 28]);
      setTargetLookAt([0, 0, 0]);
    } else if (pathname?.startsWith("/shop") || pathname?.startsWith("/product")) {
      setTargetPosition([15, 6, 12]);
      setTargetLookAt([0, 0, -5]);
    } else {
      setTargetPosition([0, 8, 28]);
    }
  }, [pathname]);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-[#020308]">
      <Canvas shadows>
        <color attach="background" args={["#050814"]} />
        <Suspense fallback={null}>
          <CameraRig targetPosition={targetPosition} targetLookAt={targetLookAt} />
          
          <group>
            {/* Deep Night Atmosphere Lighting */}
            <ambientLight intensity={0.15} color="#4a5fc1" />
            
            {/* Soft Moonlight */}
            <directionalLight 
              position={[15, 30, -10]} 
              intensity={0.6} 
              color="#8ca4ff"
              castShadow 
              shadow-mapSize={[2048, 2048]}
              shadow-camera-left={-25}
              shadow-camera-right={25}
              shadow-camera-top={25}
              shadow-camera-bottom={-25}
            />

            {/* Warm Lantern / Neon Glows for high contrast */}
            <pointLight position={[5, 2, 5]} intensity={3.5} color="#ff8c00" distance={20} decay={2} castShadow />
            <pointLight position={[-8, 4, -4]} intensity={4.0} color="#ff2a7a" distance={25} decay={2} castShadow />
            <pointLight position={[10, 6, -10]} intensity={2.0} color="#ba34ff" distance={30} decay={2} />

            {/* Deep Purple/Black Fog instead of washed out blue */}
            <fog attach="fog" args={["#050814", 15, 60]} />

            {/* Minecraft + Ghibli environment */}
            <Terrain />
            <CherryPetals />
          </group>

          {/* Post Processing removed due to type conflicts in React 19 */}
        </Suspense>
      </Canvas>
    </div>
  );
}
