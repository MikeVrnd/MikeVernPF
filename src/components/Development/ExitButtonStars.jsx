// 3ος
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
// Create shared resources outside components
const sharedPlaneGeometry = new THREE.PlaneGeometry(0.2, 0.2);
const sharedLineMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  emissive: "white",
  emissiveIntensity: 10.5,
  side: THREE.DoubleSide,
});

function VerticalLine({ x = 0, y = 0, z = 0, height = 5, step = 0.05 }) {
  // Changed from 0.01 to 0.05 (80% fewer instances)
  const positions = useMemo(() => {
    const pts = [];
    for (let i = -height / 2; i <= height / 2; i += step) {
      pts.push([x, y + i, z]); // vertical points
    }
    return pts;
  }, [x, y, z, height, step]);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.8) * 0.6;
      ref.current.position.y = y + Math.sin(t * 4) * 0.8;
    }
  });

  return (
    <Instances
      ref={ref}
      limit={positions.length}
      geometry={sharedPlaneGeometry}
      material={sharedLineMaterial}
    >
      {positions.map((pos, i) => (
        <Instance key={i} position={pos} />
      ))}
    </Instances>
  );
}
function HorizontalLine({ x = 0, y = 0, z = 0, width = 5, step = 0.05 }) {
  const positions = useMemo(() => {
    const pts = [];
    for (let i = -width / 2; i <= width / 2; i += step) {
      pts.push([x + i, y, z]);
    }
    return pts;
  }, [x, y, z, width, step]);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.8) * 0.6;
      ref.current.position.y = y + Math.sin(t * 4) * 0.8;
    }
  });

  return (
    <Instances
      ref={ref}
      limit={positions.length}
      geometry={sharedPlaneGeometry}
      material={sharedLineMaterial}
    >
      {positions.map((pos, i) => (
        <Instance key={i} position={pos} />
      ))}
    </Instances>
  );
}
function DiagonalLine({
  x = 0,
  y = 0,
  z = 0,
  length = 5,
  step = 0.05,
  slope = 1,
}) {
  const positions = useMemo(() => {
    const pts = [];
    for (let i = -length / 2; i <= length / 2; i += step) {
      pts.push([x + i, y + slope * i, z]);
    }
    return pts;
  }, [x, y, z, length, step, slope]);

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.8) * 0.6;
      ref.current.position.y = y + Math.sin(t * 4) * 0.8;
    }
  });

  return (
    <Instances
      ref={ref}
      limit={positions.length}
      geometry={sharedPlaneGeometry}
      material={sharedLineMaterial}
    >
      {positions.map((pos, i) => (
        <Instance key={i} position={pos} />
      ))}
    </Instances>
  );
}

function ExitButtonStars({ onClick }) {
  const signRef = useRef();
  const beamMaterialRef = useRef();
  const meshRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (signRef.current) {
      signRef.current.position.y = Math.sin(time * 0.5) * 0.05;
    }

    if (beamMaterialRef.current && beamMaterialRef.current.uniforms) {
      // Create pulsing effect for the beam
      const intensity = 0.5 + Math.sin(time * 3) * 0.5;
      beamMaterialRef.current.opacity = intensity * 0.8;
      // Add subtle noise to the beam for holographic effect
      if (beamMaterialRef.current.uniforms.time) {
        beamMaterialRef.current.uniforms.time.value = time * 0.8;
      }
    }
  });
  // Create the shader material outside of the component render
  const beamShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0.9, 0.4, 1.0) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        // Create scan lines effect
        float scanLine = sin(vUv.y * 200.0 + time * 5.0) * 0.1 + 0.9;
        
        // Create holographic grid pattern
        float grid = max(
          sin(vUv.x * 50.0 + time * 2.0) * 0.1,
          sin(vUv.y * 50.0 + time * 2.0) * 0.1
        ) + 0.8;
        
        // Create edge glow
        float edgeGlow = smoothstep(0.9, 0.95, 1.0 - length(vUv - 0.5)) * 0.5;
        
        // Combine effects
        float alpha = smoothstep(0.0, 0.2, vUv.y) * (1.0 - smoothstep(0.8, 1.0, vUv.y));
        alpha *= 0.6;
        
        vec3 finalColor = color * scanLine * grid + edgeGlow * vec3(0.5, 0.7, 1.0);
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return (
    <group position={[-22, 3, -7.2]}>
      {/* Holographic Light Beam */}
      <Sparkles
        position={[21, 3.5, 5.35]}
        position={[21, 2.1, 5.35]}
        count={20} // Changed from 50 to 20
        scale={[1.2, 7, 1.2]}
        size={2}
        speed={0.7}
        color="white"
      />
      {/* Main EXIT Sign positioned above the light */}
      <group ref={signRef} position={[21, 2.8, 5.35]} scale={0.1}>
        {/* E */}
        <VerticalLine x={-12} height={12} y={17} />
        {/* 1. Vertical line instancing */}
        <HorizontalLine x={-9.5} y={20} width={5} />
        {/* 2. Horizontal line instancing */}
        <HorizontalLine x={-9.5} y={17} width={5} />
        <HorizontalLine x={-9.5} y={14} width={5} />
        {/* X */}
        <DiagonalLine x={-1} y={17} length={6} slope={2} />
        {/* 3. Diagonal line instancing */}
        <DiagonalLine x={-1} y={17} length={6} slope={-2} />
        {/* I */}
        <VerticalLine x={5} y={17} height={12} />
        {/* T */}
        <HorizontalLine x={12} y={20} width={6} />
        <VerticalLine x={12} y={17} height={12} />
        <mesh
          ref={meshRef}
          position={[0, 32, 0]}
          visible={false}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
          onClick={onClick}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <boxGeometry args={[18, 18, 31]} /> {/* Width, Height */}
          <meshStandardMaterial color="white" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
export default ExitButtonStars;
