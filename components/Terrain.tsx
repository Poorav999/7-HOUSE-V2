"use client";

import { useMemo, useRef, useEffect } from "react";
import { InstancedMesh, Object3D, Color } from "three";
import { useFrame } from "@react-three/fiber";

// A basic noise function could be implemented if needed, 
// but Math.sin/cos combinations can simulate decent rolling terrain without external libs

function generateTerrainData(width: number, depth: number) {
  const blocks: { position: [number, number, number], color: string }[] = [];
  const terrainHeight = 5;

  // Simple pseudo-random heightmap
  for (let x = -width / 2; x < width / 2; x++) {
    for (let z = -depth / 2; z < depth / 2; z++) {
      // Base rolling hills using trig
      const h = Math.floor(
        Math.sin(x * 0.15) * 3 +
        Math.cos(z * 0.15) * 3 +
        Math.sin((x + z) * 0.05) * 2
      );
      
      const y = Math.max(-2, Math.min(terrainHeight, h));

      // 1-2 blocks of dirt, then grass on top. We will just render the surface layer for performance.
      blocks.push({
        position: [x, y, z],
        color: "#83b160" // Ghibli soft green grass
      });
      // Optionally place dirt below surface if necessary, but surface is fine for flyover
      if (y > -2) {
        blocks.push({
          position: [x, y - 1, z],
          color: "#5e4b3c" // Soft dirt brown
        });
      }

      // Add a tree occasionally
      if (y > 0 && Math.random() < 0.02) {
        const treeHeight = Math.floor(Math.random() * 2) + 3; // 3 to 4 blocks tall
        // Trunk
        for (let th = 1; th <= treeHeight; th++) {
          blocks.push({ position: [x, y + th, z], color: "#483226" }); // Tree wood
        }
        // Leaves (Cherry Blossom)
        for (let lx = -1; lx <= 1; lx++) {
          for (let lz = -1; lz <= 1; lz++) {
            for (let ly = 0; ly <= 1; ly++) {
              if (Math.abs(lx) === 1 && Math.abs(lz) === 1 && ly === 1) continue; // round edges
              blocks.push({ 
                position: [x + lx, y + treeHeight + ly, z + lz], 
                color: "#ffb7c5" // Soft cherry pink 
              });
            }
          }
        }
      }
    }
  }
  return blocks;
}

export default function Terrain() {
  const meshRef = useRef<InstancedMesh>(null);
  const blocks = useMemo(() => generateTerrainData(60, 60), []);
  const dummy = useMemo(() => new Object3D(), []);
  const color = useMemo(() => new Color(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    blocks.forEach((block, i) => {
      dummy.position.set(block.position[0], block.position[1], block.position[2]);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, color.set(block.color));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [blocks, dummy, color]);

  // Gentle float effect for the whole island
  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5 - 2;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, blocks.length]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      {/* MeshStandardMaterial gives us shadows and lighting reactions */}
      <meshStandardMaterial roughness={0.8} />
    </instancedMesh>
  );
}
