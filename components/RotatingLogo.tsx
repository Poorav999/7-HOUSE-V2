"use client";

import React, { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Environment, Center, PresentationControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function LogoModel() {
  const modelRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  // Define the core gemstone colors we will cycle through
  const colors = useMemo(() => [
    new THREE.Color("#4a148c"), // Amethyst Purple (Base)
    new THREE.Color("#0d47a1"), // Sapphire Blue
    new THREE.Color("#b71c1c"), // Ruby Red
    new THREE.Color("#f5f5f5"), // Diamond White
  ], []);

  // Use the helvetiker font as a fallback (prevents the image_6.png 404 crash seen earlier)
  const FONT_URL = "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

  useFrame((state, delta) => {
    // 1. Gentle rotation
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.25;
    }

    // 2. Advanced Color Blending Logic
    if (materialRef.current) {
      // Create a smooth, repeating cycle based on elapsed time (e.g., total cycle in 12 seconds)
      const time = state.clock.getElapsedTime();
      const cycleTime = 12; // Time in seconds for one full loop through all colors
      const progress = (time % cycleTime) / cycleTime;
      
      // Map progress to colors array indices (0, 1, 2, 3)
      const numColors = colors.length;
      const index1 = Math.floor(progress * numColors);
      const index2 = (index1 + 1) % numColors;
      
      // Calculate interpolation factor between the two current colors (smooth blending)
      const lerpFactor = (progress * numColors) % 1;
      
      // Apply the blended color smoothly to the material base color
      materialRef.current.color.lerpColors(colors[index1], colors[index2], lerpFactor);
      
      // Optionally update sheen for extra brilliance on gemstone edges
      materialRef.current.sheenColor.lerpColors(colors[index1], colors[index2], lerpFactor);
    }
  });

  return (
    <group ref={modelRef}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={1.5}
          height={0.5}
          curveSegments={24}
          bevelEnabled
          bevelThickness={0.12}
          bevelSize={0.06}
          bevelOffset={0}
          bevelSegments={10}
        >
          {/* Material with initial transmission properties similar to crystal in image_6.png */}
          <meshPhysicalMaterial
            ref={materialRef}
            color={colors[0]} // initial color (starts purple)
            metalness={0.1}
            roughness={0.08}
            transmission={0.9} // high translucency for crystal look
            thickness={1.5}
            ior={1.76}
            clearcoat={1}
            clearcoatRoughness={0.1}
            sheen={1}
            sheenColor={colors[0]}
            specularIntensity={1.2}
            specularColor="#ffffff"
          />
          7H
        </Text3D>
      </Center>

      {/* detailed point lights act as "flare points" to create brilliant sparkles and highlights seen in reference image_6.png */}
      <pointLight position={[-1.5, 1.5, 1]} intensity={70} color="#e040fb" distance={10} decay={2}/>
      <pointLight position={[1.5, -1.5, 1]} intensity={65} color="#00e5ff" distance={10} decay={2}/>
      <pointLight position={[2, 2, -1]} intensity={50} color="#ff1744" distance={10} decay={2}/>
      <pointLight position={[-2, -2, -1]} intensity={45} color="#ffffff" distance={10} decay={2}/>
    </group>
  );
}

export default function RotatingLogo() {
  return (
    // Component root div: ensures seamless blending with no background "box"
    <div className="w-20 h-20 flex items-center justify-center relative z-50 bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        // crucial config: alpha=true enables background transparency
        gl={{ toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.2, antialias: true, alpha: true }}
        dpr={[1, 2]} // supports high-DPI screens
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          {/* Studio lighting setup for generating brilliant reflections on crystal surfaces */}
          <directionalLight position={[10, 10, 5]} intensity={2.0} color="#ffffff" castShadow />
          <spotLight position={[-10, 20, 15]} angle={0.25} penumbra={1} intensity={2.5} color="#ffffff" castShadow />
          <hemisphereLight groundColor="#000000" color="#ffffff" intensity={0.7} />

          {/* Preset environment creates reflections that bring gemstone structure to life */}
          <Environment preset="studio" blur={0.1} />

          <PresentationControls
            global
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <LogoModel />
          </PresentationControls>

          {/* Post-processing effect composition. High intensity Bloom creates brilliant star-like sparks */}
          <EffectComposer multisampling={4}>
            <Bloom
              intensity={1.8} // increased intensity for gemstone brilliance seen in reference image_6.png
              luminanceThreshold={0.5} // controls which points of light sparkle intensely
              luminanceSmoothing={0.9} // affects soft transition of sparkle glow
              mipmapBlur // required for creating the detailed starry light sparks seen in reference image_6.png
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}