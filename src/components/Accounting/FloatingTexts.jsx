import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { validateAssetPath } from "../../utils/security";

const FloatingTexts = () => {
  const textRefs = useRef([]);
  useFrame((state) => {
    const floatingHeight = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    textRefs.current.forEach((ref) => {
      if (ref) {
        ref.position.y = ref.userData.originalY + floatingHeight;
      }
    });
  });

  const textConfigs = [
    { content: "About me", position: [5.501, 3.45, 0.05], scale: 0.4 },
    { content: "Projects", position: [5.501, 2.47, 0.05], scale: 0.35 },
    { content: "Wisdom Nook", position: [5.501, 1.47, 0.05], scale: 0.3 },
    { content: "Exit", position: [5.501, 0.7, 0.05], scale: 0.35 },
  ];
  const fontPath = "/fonts/bodoni-mt-bold-italic.ttf";
  if (!validateAssetPath(fontPath)) {
    console.error("Blocked unsafe model path:", fontPath);
    return null;
  }
  return (
    <>
      {textConfigs.map((config, index) => (
        <Text
          key={index}
          ref={(el) => {
            textRefs.current[index] = el;
            if (el) {
              el.userData = { originalY: config.position[1] };
            }
          }}
          font={fontPath}
          position={config.position}
          rotation={[0, Math.PI / 3, 0]}
          textAlign="center"
          scale={config.scale}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          {config.content}

          <meshStandardMaterial
            color={"white"}
            emissive={"white"}
            emissiveIntensity={6}
            toneMapped={false}
          />
        </Text>
      ))}
      {/* Glowing Frame */}
      <mesh
        scale={[0.55, 0.7, 1]}
        position={[5.501, 1.98, -0.05]}
        rotation={[0, Math.PI / 3, 0]}
      >
        <planeGeometry args={[4.5, 5.5]} />
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.29}
          toneMapped={false}
        />
      </mesh>
      {/* Frame Glow Effect */}
      <mesh
        scale={[0.5, 0.65, 1]}
        position={[5.501, 1.98, -0.03]}
        rotation={[0, Math.PI / 3, 0]}
      >
        <planeGeometry args={[4.5, 5.5]} />
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>
    </>
  );
};
export default FloatingTexts;
