// import React, { useRef, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// const RoseMiddle = Array.from({ length: 1000 }, () => ({
//   position: [(Math.random() + 0.0) * 1, 0, (Math.random() - 0.0) * 8.4],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.33, 0.33, 0.33],
// }));

// const InstancedMeshGroup = ({ data, geometry, material }) => {
//   const meshRef = useRef();

//   useEffect(() => {
//     if (!meshRef.current) return;
//     const matrix = new THREE.Matrix4();
//     data.forEach((item, i) => {
//       matrix.compose(
//         new THREE.Vector3(...item.position),
//         new THREE.Quaternion().setFromEuler(new THREE.Euler(...item.rotation)),
//         new THREE.Vector3(...item.scale)
//       );
//       meshRef.current.setMatrixAt(i, matrix);
//     });
//     meshRef.current.instanceMatrix.needsUpdate = true;
//   }, [data]);

//   return (
//     <instancedMesh
//       ref={meshRef}
//       args={[geometry, material, data.length]}
//       frustumCulled={false}
//     />
//   );
// };

// const InstancedRose = ({ scene }) => {
//   const instancedMeshes = [];

//   scene.traverse((child) => {
//     if (child.isMesh) {
//       instancedMeshes.push({
//         geometry: child.geometry,
//         material: child.material,
//       });
//     }
//   });

//   if (instancedMeshes.length === 0) {
//     return null;
//   }

//   return (
//     <>
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={RoseMiddle}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//     </>
//   );
// };

// export default function Rose(props) {
//   const group = useRef();
//   const { scene } = useGLTF("Objects/DecimatedScene/Optimized/Rose.glb");

//   useEffect(() => {}, [scene]);

//   return (
//     <>
//       {/* <group ref={group} {...props} dispose={null}>
// <InstancedRose scene={scene} />
// </group> */}
//       {/* <group ref={group} {...props} dispose={null} position={[18, 0, 0]}>
// <InstancedRose scene={scene} />
// </group> */}
//       <group ref={group} {...props} dispose={null} position={[3.8, 0, -7.4]}>
//         <InstancedRose scene={scene} />
//       </group>

//       <group ref={group} {...props} dispose={null} position={[-14.8, 0, -5]}>
//         <InstancedRose scene={scene} />
//       </group>
//     </>
//   );
// }

// useGLTF.preload("Objects/DecimatedScene/Optimized/Rose.glb");

import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const RoseMiddle = Array.from({ length: 1000 }, () => ({
  position: [(Math.random() + 0.0) * 1, 0, (Math.random() - 0.0) * 8.4],
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [0.33, 0.33, 0.33],
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

const InstancedRose = ({ scene, data }) => {
  // Extract meshes only once
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

export default function Rose(props) {
  const { scene } = useGLTF("Objects/DecimatedScene/Optimized/Rose.glb");

  return (
    <>
      <group {...props} position={[3.8, 0, -7.4]}>
        <InstancedRose scene={scene} data={RoseMiddle} />
      </group>
      <group {...props} position={[-14.8, 0, -5]}>
        <InstancedRose scene={scene} data={RoseMiddle} />
      </group>
    </>
  );
}

useGLTF.preload("Objects/DecimatedScene/Optimized/Rose.glb");
