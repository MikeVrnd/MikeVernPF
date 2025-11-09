import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const TreeMiddle = Array.from({ length: 150 }, () => ({
  position: [(Math.random() + 0.0) * 68, 0, (Math.random() - 0.0) * 112],
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [0.66, 0.66, 0.66],
}));

const TreeMiddle2 = Array.from({ length: 90 }, () => ({
  position: [(Math.random() + 0.0) * 30, 0, (Math.random() - 0.0) * 106],
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [0.66, 0.66, 0.66],
}));

const InstancedMeshGroup = ({ data, geometry, material }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (!meshRef.current) return;

    const matrix = new THREE.Matrix4();
    data.forEach((item, i) => {
      matrix.compose(
        new THREE.Vector3(...item.position),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(...item.rotation)),
        new THREE.Vector3(...item.scale)
      );
      meshRef.current.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;

    return () => {
      if (meshRef.current) {
        meshRef.current.geometry?.dispose();
        if (Array.isArray(meshRef.current.material)) {
          meshRef.current.material.forEach((m) => m.dispose());
        } else {
          meshRef.current.material?.dispose();
        }
      }
    };
  }, [data]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, data.length]}
      frustumCulled={false}
    />
  );
};

const InstancedTree = ({ scene, data }) => {
  const instancedMeshes = useMemo(() => {
    const result = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        result.push({
          geometry: child.geometry.clone(),
          material: child.material.clone(),
        });
      }
    });
    return result;
  }, [scene]);

  if (instancedMeshes.length === 0) return null;

  return (
    <>
      {instancedMeshes.map((mesh, index) => (
        <InstancedMeshGroup
          key={index}
          data={data}
          geometry={mesh.geometry}
          material={mesh.material}
        />
      ))}
    </>
  );
};

export default function Tree(props) {
  const { scene } = useGLTF(
    "/Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb"
  );

  return (
    <>
      <group {...props} position={[-90, 0, -105]}>
        <InstancedTree scene={scene} data={TreeMiddle} />
      </group>
      <group {...props} position={[-90, 0, 10]}>
        <InstancedTree scene={scene} data={TreeMiddle} />
      </group>
      <group {...props} position={[20, 0, -90]}>
        <InstancedTree scene={scene} data={TreeMiddle} />
      </group>
      <group {...props} position={[-15, 0, -120]}>
        <InstancedTree scene={scene} data={TreeMiddle2} />
      </group>
    </>
  );
}

useGLTF.preload(
  "/Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb"
);
