// // 2 με σωστό κώδικα αλλά μόνο θέση
// import React, { useRef, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// // Δέντρα στη μέση
// const TreeMiddle = Array.from({ length: 7 }, (_, i) => ({
//   position: [-0.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));

// const InstancedMeshGroup = ({ data, geometry, material }) => {
//   const meshRef = useRef();

//   useEffect(() => {
//     if (!meshRef.current) return;
//     // console.log("Setting matrices for instanced mesh");

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

// const InstancedTree = ({ scene }) => {
//   const instancedMeshes = [];

//   scene.traverse((child) => {
//     if (child.isMesh) {
//       // console.log("Found mesh:", child.name);
//       instancedMeshes.push({
//         geometry: child.geometry,
//         material: child.material,
//       });
//     }
//   });

//   if (instancedMeshes.length === 0) {
//     console.warn("No meshes found in the scene!");
//     return null;
//   }

//   return (
//     <>
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeMiddle}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//       {/* {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeMiddle2}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))} */}
//       {/*
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeMiddle3}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))} */}
//     </>
//   );
// };

// export default function TreeClicked(props) {
//   const group = useRef();
//   const { scene } = useGLTF("Objects/Final/Tree2.glb");

//   useEffect(() => {
//     // console.log("GLTF scene loaded:", scene);
//   }, [scene]);

//   return (
//     <>
//       <group ref={group} {...props} dispose={null}>
//         <InstancedTree scene={scene} />
//       </group>

//       <group ref={group} {...props} dispose={null} position={[10, 0, 0]}>
//         <InstancedTree scene={scene} />
//       </group>
//     </>
//   );
// }

// useGLTF.preload("Objects/Final/Tree2.glb");
// 3ος
// import React, { useRef, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// const TreeLower2 = Array.from({ length: 5 }, (_, i) => ({
//   position: [0.0, 0, 28 + i * 12],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const InstancedMeshGroup = ({ data, geometry, material }) => {
//   const meshRef = useRef();
//   useEffect(() => {
//     if (!meshRef.current) return; // console.log("Setting matrices for instanced mesh");
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
// const InstancedTree = ({ scene }) => {
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
//     console.warn("No meshes found in the scene!");
//     return null;
//   }
//   return (
//     <>
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower2}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//     </>
//   );
// };
// export default function TreeClicked(props) {
//   const group = useRef();
//   const { scene } = useGLTF("Objects/Final/Tree2.glb");
//   useEffect(() => {}, [scene]);
//   return (
//     <>
//       <group ref={group} {...props} dispose={null} position={[0, 0, 10]}>
//         <InstancedTree scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[9, 0, 10]}>
//         <InstancedTree scene={scene} />
//       </group>
//     </>
//   );
// }
// useGLTF.preload("Objects/Final/Tree2.glb");
// 4ος
import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const TreeLower2 = Array.from({ length: 5 }, (_, i) => ({
  position: [0.0, 0, 28 + i * 12],
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

const InstancedTree = ({ scene }) => {
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

  if (instancedMeshes.length === 0) {
    console.warn("No meshes found in the scene!");
    return null;
  }

  return (
    <>
      {instancedMeshes.map((mesh, index) => (
        <InstancedMeshGroup
          key={index}
          data={TreeLower2}
          geometry={mesh.geometry}
          material={mesh.material}
        />
      ))}
    </>
  );
};

export default function TreeClicked(props) {
  const group = useRef();
  const { scene } = useGLTF(
    "Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb"
  );

  useEffect(() => {}, [scene]);

  return (
    <>
      <group ref={group} {...props} dispose={null} position={[0, 0, 10]}>
        <InstancedTree scene={scene} />
      </group>
      <group ref={group} {...props} dispose={null} position={[9, 0, 10]}>
        <InstancedTree scene={scene} />
      </group>
    </>
  );
}

// useGLTF.preload(
//   "Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb"
// );
