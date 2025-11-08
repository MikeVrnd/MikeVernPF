import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
const VioletMiddle = Array.from({ length: 1000 }, () => ({
  position: [(Math.random() + 0.0) * 11, 0, (Math.random() - 0.0) * 1.5],
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [0.26, 0.26, 0.26],
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
      // ✅ Cleanup instancedMesh explicitly
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
const InstancedViolet = ({ scene, data }) => {
  const instancedMeshes = useMemo(() => {
    const result = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        result.push({
          geometry: child.geometry.clone(), // clone so we can dispose later
          material: child.material.clone(),
        });
      }
    });
    return result;
  }, [scene]);

  if (instancedMeshes.length === 0) {
    return null;
  }

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
export default function Violet(props) {
  const group = useRef();
  const { scene } = useGLTF("Objects/DecimatedScene/Optimized/Violet.glb");

  useEffect(() => {}, [scene]);

  return (
    <>
      <group ref={group} {...props} dispose={null} position={[-7.5, 0, -7.5]}>
        <InstancedViolet scene={scene} data={VioletMiddle} />
      </group>
    </>
  );
}
useGLTF.preload("Objects/DecimatedScene/Optimized/Violet.glb");
