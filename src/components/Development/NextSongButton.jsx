import React from "react";
import { useGLTF } from "@react-three/drei";
import { validateModelPath } from "../../utils/security";
const modelPath = `${window.location.origin}/models/NextSongButton.gltf`;
export function NextSongButton(props) {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe 3D model:", modelPath);
    return null;
  }

  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group {...props} dispose={null}>
      <group position={[-3.752, 0, 0]} rotation={[-1.553, 0, -0.003]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[0, -2.735, 0.231]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[86.757, 2.871, 107.461]}
          >
            <mesh
              geometry={nodes.Cube_Main_1_0002.geometry}
              material={materials["Main_1.001"]}
            />
            <mesh
              geometry={nodes.Cube_Main_2_0002.geometry}
              material={materials["Main_2.001"]}
            />
          </group>
          <group
            position={[-6.003, 31.82, 0.717]}
            rotation={[0, 0, -2.356]}
            scale={[9.348, 9.191, 5.512]}
          >
            <mesh
              geometry={nodes.Play_button003.geometry}
              material={materials["Main_1.001"]}
              position={[1.294, -1.316, 0.006]}
              scale={1.309}
            />
          </group>
        </group>
      </group>
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials["Main_1.001"]}
        position={[-3.584, 0.326, 0.066]}
        scale={0.172}
      />
    </group>
  );
}

useGLTF.preload(modelPath);
