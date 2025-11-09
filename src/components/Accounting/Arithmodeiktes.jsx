import React from "react";
import { useGLTF } from "@react-three/drei";
import { validateModelPath } from "../../utils/security";

const modelPath = `${window.location.origin}/Objects/Final/Arithmodeiktes.glb`;

export function Arithmodeiktes(props) {
  const { nodes, materials } = useGLTF(modelPath);
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }

  return (
    <group {...props} dispose={null}>
      <group position={[-3.678, 1.632, -3.27]} scale={[0.021, 0.277, 0.46]}>
        <mesh
          geometry={nodes.Cube004.geometry}
          material={materials["Calendar.002"]}
        />
        <mesh
          geometry={nodes.Cube004_1.geometry}
          material={materials["black.002"]}
        />
        <mesh
          geometry={nodes.Cube004_2.geometry}
          material={materials["Black.001"]}
        />
        <mesh
          geometry={nodes.Cube004_3.geometry}
          material={materials["LineGraph.002"]}
        />
        <mesh
          geometry={nodes.Cube004_4.geometry}
          material={materials["Graphs.002"]}
        />
      </group>
    </group>
  );
}

if (validateModelPath(modelPath)) {
  useGLTF.preload(modelPath);
}
