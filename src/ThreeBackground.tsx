import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Starfield = ({ count = 4000 }) => {
  const mesh = useRef<THREE.Points>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);
  
  // Generate random positions and colors for stars
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      // Spread stars in a wide cylinder/tunnel shape
      pos[i * 3] = (Math.random() - 0.5) * 100;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
      
      // Retro palette: White, Green, subtle Purple
      const r = Math.random();
      if (r > 0.9) color.set('#22c55e'); // Terminal Green
      else if (r > 0.8) color.set('#8b5cf6'); // Purple
      else color.set('#a1a1aa'); // Dim white
      
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: cols };
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // Rotate the entire starfield slowly
    mesh.current.rotation.z += delta * 0.05;
    
    // Warp effect: Move stars towards camera
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      // Move Z towards positive (camera is at +Z)
      let z = positions[i * 3 + 2];
      z += delta * 5; // Speed of travel
      
      // Reset if passed camera (camera is approx at 4 or 5)
      if (z > 20) {
        z = -80;
        // Reshuffle X/Y slightly to avoid patterns
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      }
      positions[i * 3 + 2] = z;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

const NeuralCore = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (innerRef.current) {
       innerRef.current.rotation.x -= delta * 0.1;
       innerRef.current.rotation.y -= delta * 0.2;
       // Pulse effect
       const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
       innerRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Outer Wireframe */}
      <mesh ref={meshRef} scale={[2, 2, 2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#22c55e" wireframe={true} transparent opacity={0.15} />
      </mesh>
      
      {/* Inner Glowing Core */}
      <mesh ref={innerRef} scale={[1, 1, 1]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#0f3018" wireframe={true} transparent opacity={0.3} />
      </mesh>
      
      {/* Central Light Point */}
      <pointLight color="#22c55e" intensity={2} distance={10} decay={2} />
    </group>
  );
};

const Scene = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true }}>
        <fog attach="fog" args={['#000000', 5, 50]} />
        <Starfield />
        <NeuralCore />
        <ambientLight intensity={0.2} />
      </Canvas>
      {/* Vignette & Scanlines managed by CSS in index.html, but we add a gradient overlay here for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
    </div>
  );
};

export default Scene;