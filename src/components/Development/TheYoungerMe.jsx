import { Html } from "@react-three/drei";
import { useState } from "react";

export default function TheYoungerMe() {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={[-0.471, 0.494, -2.08]}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      visible={false}
    >
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial />
      {hovered && (
        <Html position={[-0.1, 0.05, 0]}>
          <div
            style={{
              width: 125,
              color: "white",
              background: "black",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "14px",
              textalign: "center",
              fontFamily: "'Delius Swash Caps', cursive",
            }}
          >
            The younger me
          </div>
        </Html>
      )}
    </mesh>
  );
}
