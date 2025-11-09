import React from "react";
import { useGLTF } from "@react-three/drei";
import { validateModelPath } from "../../utils/security";

const modelPath = `${window.location.origin}/Objects/Final/DoorSign.glb`;
export default function DoorSign(props) {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe 3D model:", modelPath);
    return null;
  }

  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials["SignPlato.001"]}
        position={[-7.223, 2.09, 1.651]}
        scale={[0.519, 0.16, 0.017]}
      />
    </group>
  );
}
if (validateModelPath(modelPath)) {
  useGLTF.preload(modelPath);
}
