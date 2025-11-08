// // // 2 με σωστό κώδικα αλλά μόνο θέση
// // import React, { useRef, useEffect } from "react";
// // import { useGLTF } from "@react-three/drei";
// // import * as THREE from "three";

// // // Δέντρα στη μέση
// // // const TreeMiddle = Array.from({ length: 6 }, (_, i) => ({
// // //   position: [0.9, 0, 40 + i * 7.5],
// // //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// // //   scale: [0.66, 0.66, 0.66],
// // // }));
// // const TreeMiddle2 = Array.from({ length: 12 }, (_, i) => ({
// //   position: [-90 + i * 7, 0, 30],
// //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// //   scale: [0.66, 0.66, 0.66],
// // }));
// // const TreeMiddle3 = Array.from({ length: 10 }, (_, i) => ({
// //   position: [-90 + i * 7, 0, 8],
// //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// //   scale: [0.66, 0.66, 0.66],
// // }));

// // const TreeMiddle4 = Array.from({ length: 9 }, (_, i) => ({
// //   position: [-90 + i * 7, 0, -13],
// //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// //   scale: [0.66, 0.66, 0.66],
// // }));

// // const TreeMiddle5 = Array.from({ length: 9 }, (_, i) => ({
// //   position: [33.5 + i * 7, 0.38, 26],
// //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// //   scale: [0.66, 0.66, 0.66],
// // }));
// // const TreeMiddle6 = Array.from({ length: 10 }, (_, i) => ({
// //   position: [23.5 + i * 7, 0.38, 6],
// //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// //   scale: [0.66, 0.66, 0.66],
// // }));
// // const TreeMiddle7 = Array.from({ length: 10 }, (_, i) => ({
// //   position: [23.5 + i * 7, 0.38, -16],
// //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// //   scale: [0.66, 0.66, 0.66],
// // }));
// // const TreeMiddle8 = Array.from({ length: 26 }, (_, i) => ({
// //   position: [-90 + i * 7, 0.38, -34],
// //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// //   scale: [0.66, 0.66, 0.66],
// // }));
// // const TreeMiddle9 = Array.from({ length: 26 }, (_, i) => ({
// //   position: [-90 + i * 7, 0.38, -52],
// //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// //   scale: [0.66, 0.66, 0.66],
// // }));
// // const TreeMiddle10 = Array.from({ length: 26 }, (_, i) => ({
// //   position: [-90 + i * 7, 0.38, -70],
// //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// //   scale: [0.66, 0.66, 0.66],
// // }));

// // const InstancedMeshGroup = ({ data, geometry, material }) => {
// //   const meshRef = useRef();

// //   useEffect(() => {
// //     if (!meshRef.current) return; // console.log("Setting matrices for instanced mesh");
// //     const matrix = new THREE.Matrix4();
// //     data.forEach((item, i) => {
// //       matrix.compose(
// //         new THREE.Vector3(...item.position),
// //         new THREE.Quaternion().setFromEuler(new THREE.Euler(...item.rotation)),
// //         new THREE.Vector3(...item.scale)
// //       );
// //       meshRef.current.setMatrixAt(i, matrix);
// //     });
// //     meshRef.current.instanceMatrix.needsUpdate = true;
// //   }, [data]);

// //   return (
// //     <instancedMesh
// //       ref={meshRef}
// //       args={[geometry, material, data.length]}
// //       frustumCulled={false}
// //     />
// //   );
// // };

// // const InstancedTree = ({ scene }) => {
// //   const instancedMeshes = [];

// //   scene.traverse((child) => {
// //     if (child.isMesh) {
// //       // console.log("Found mesh:", child.name);
// //       instancedMeshes.push({
// //         geometry: child.geometry,
// //         material: child.material,
// //       });
// //     }
// //   });

// //   if (instancedMeshes.length === 0) {
// //     console.warn("No meshes found in the scene!");
// //     return null;
// //   }

// //   return (
// //     <>
// //       {/* {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))} */}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle2}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle3}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle4}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle5}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle6}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle7}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle8}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle9}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}

// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle10}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {/*

// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle11}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle12}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle13}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))}
// //       {instancedMeshes.map((mesh, index) => (
// //         <InstancedMeshGroup
// //           key={index}
// //           data={TreeMiddle14}
// //           geometry={mesh.geometry}
// //           material={mesh.material}
// //         />
// //       ))} */}
// //     </>
// //   );
// // };

// // export default function TreeMiddle(props) {
// //   const group = useRef();
// //   const { scene } = useGLTF("Objects/Final/Tree2.glb");

// //   useEffect(() => {
// //     // console.log("GLTF scene loaded:", scene);
// //   }, [scene]);

// //   return (
// //     <>
// //       <group ref={group} {...props} dispose={null} position={[0, 0, 10]}>
// //         <InstancedTree scene={scene} />
// //       </group>
// //       <group ref={group} {...props} dispose={null} position={[0, 0, -1]}>
// //         <InstancedTree scene={scene} />
// //       </group>
// //     </>
// //   );
// // }

// // useGLTF.preload("Objects/Final/Tree2.glb");

// import React, { useRef, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// // const TreeMiddle = Array.from({ length: 5554 }, () => ({
// // position: [(Math.random() + 0.1) * 60, 0, (Math.random() - 0.55) * 158],
// // rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// // scale: [0.66, 0.66, 0.66],
// // }));
// const TreeMiddle = Array.from({ length: 150 }, () => ({
//   position: [(Math.random() + 0.0) * 68, 0, (Math.random() - 0.0) * 112],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const TreeMiddle2 = Array.from({ length: 90 }, () => ({
//   position: [(Math.random() + 0.0) * 30, 0, (Math.random() - 0.0) * 106],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
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
//     </>
//   );
// };
// const InstancedTree2 = ({ scene }) => {
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
//           data={TreeMiddle2}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//     </>
//   );
// };
// export default function Tree(props) {
//   const group = useRef();
//   const { scene } = useGLTF("Objects/Final/Tree2.glb");
//   useEffect(() => {}, [scene]);
//   return (
//     <>
//       <group ref={group} {...props} dispose={null} position={[-90, 0, -105]}>
//         <InstancedTree scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[-90, 0, 10]}>
//         <InstancedTree scene={scene} />
//       </group>

//       <group ref={group} {...props} dispose={null} position={[20, 0, -90]}>
//         <InstancedTree scene={scene} />
//       </group>

//       <group ref={group} {...props} dispose={null} position={[-15, 0, -120]}>
//         <InstancedTree2 scene={scene} />
//       </group>
//     </>
//   );
// }
// useGLTF.preload("Objects/Final/Tree2.glb");

// 3ος
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

const InstancedTree = ({ scene, data }) => {
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

export default function Tree(props) {
  const { scene } = useGLTF(
    "Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb"
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
  "Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb"
);
