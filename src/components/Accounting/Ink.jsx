import React from "react";
import { useGLTF } from "@react-three/drei";
import { validateModelPath } from "../../utils/security";

const modelPath = "https://mike-vern-pf.vercel.app/Objects/Final/Ink9.glb";
export function Ink(props) {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Plane001.geometry}
        material={materials["Material.018"]}
        position={[-3.078, 1.081, -3.943]}
        scale={0.304}
      />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials.Ink}
        position={[-3.468, 1.103, -3.886]}
        rotation={[-1.587, 0.015, -0.757]}
        scale={0.03}
      />
      <group
        position={[-3.509, 1.126, -3.859]}
        rotation={[0, 0, -1.576]}
        scale={0.03}
      >
        <mesh geometry={nodes.Cube004.geometry} material={materials.Ink} />
        <mesh
          geometry={nodes.Cube004_1.geometry}
          material={materials["Material.017"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);
