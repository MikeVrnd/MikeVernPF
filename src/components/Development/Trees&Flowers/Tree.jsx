// // 1 με σωστό κώδικα αλλά μόνο θέση
// import React, { useRef, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// // Δέντρα στη μέση
// // const TreeLower = Array.from({ length: 5 }, (_, i) => ({
// //   position: [0.9, 0, 40 + i * 10.5],
// //   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
// //   scale: [.77, .77, .77],
// // }));
// const TreeLower2 = Array.from({ length: 4 }, (_, i) => ({
//   position: [17.0, 0, 40 + i * 18],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const TreeLower3 = Array.from({ length: 5 }, (_, i) => ({
//   position: [34.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));

// const TreeLower4 = Array.from({ length: 5 }, (_, i) => ({
//   position: [52.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const TreeLower5 = Array.from({ length: 5 }, (_, i) => ({
//   position: [68.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const TreeLower6 = Array.from({ length: 5 }, (_, i) => ({
//   position: [84.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const TreeLower7 = Array.from({ length: 5 }, (_, i) => ({
//   position: [-20.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));

// const TreeLower8 = Array.from({ length: 5 }, (_, i) => ({
//   position: [-38.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const TreeLower9 = Array.from({ length: 5 }, (_, i) => ({
//   position: [-55.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const TreeLower10 = Array.from({ length: 5 }, (_, i) => ({
//   position: [-75.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const TreeLower11 = Array.from({ length: 5 }, (_, i) => ({
//   position: [-93.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));

// const TreeLower12 = Array.from({ length: 5 }, (_, i) => ({
//   position: [-66.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const TreeLower13 = Array.from({ length: 5 }, (_, i) => ({
//   position: [-78.5, 0, 40 + i * 10],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.66, 0.66, 0.66],
// }));
// const TreeLower14 = Array.from({ length: 5 }, (_, i) => ({
//   position: [-92.5, 0, 40 + i * 10],
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
//       {/* {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))} */}
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower2}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower3}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}

//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower4}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}

//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower5}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}

//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower6}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}

//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower7}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}

//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower8}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}

//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower9}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}

//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower10}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}

//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower11}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//       {/*
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower12}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower13}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={TreeLower14}
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
// 2ος
// import React, { useRef, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// const TreeMiddle = Array.from({ length: 2 }, () => ({
//   position: [(Math.random() + 0.0) * 65, 0, (Math.random() - 0.0) * 52],
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
// export default function Tree(props) {
//   const group = useRef();
//   const { scene } = useGLTF("Objects/Final/Tree2.glb");
//   useEffect(() => {}, [scene]);
//   return (
//     <>
//       <group ref={group} {...props} dispose={null} position={[0, 0, 26]}>
//         <InstancedTree scene={scene} />
//       </group>
//       {/* <group ref={group} {...props} dispose={null} position={[-90, 0,10 ]}>
// <InstancedTree scene={scene} />
// </group>
// <group ref={group} {...props} dispose={null} position={[20, 0,-90 ]}>
// <InstancedTree scene={scene} />
// </group> */}
//     </>
//   );
// }
// useGLTF.preload("Objects/Final/Tree2.glb");

// 3os
// import React, { useRef, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// const TreeMiddle = Array.from({ length: 120 }, () => ({
//   position: [(Math.random() + 0.0) * 65, 0, (Math.random() + 0.0) * 60],
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
// export default function Tree(props) {
//   const group = useRef();
//   const { scene } = useGLTF("Objects/Final/Tree2.glb");
//   useEffect(() => {}, [scene]);
//   return (
//     <>
//       <group ref={group} {...props} dispose={null} position={[20, 0, 45]}>
//         <InstancedTree scene={scene} />
//       </group>
//       {/*  <group ref={group} {...props} dispose={null} position={[-90, 0,10 ]}>
//  <InstancedTree scene={scene} />
//  </group>
//  <group ref={group} {...props} dispose={null} position={[20, 0,-90 ]}>
//  <InstancedTree scene={scene} />
//  </group> */}
//     </>
//   );
// }
// useGLTF.preload("Objects/Final/Tree2.glb");
// 3ος
// import React, { useRef, useEffect, useMemo } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// const TreeMiddle = Array.from({ length: 120 }, () => ({
//   position: [(Math.random() + 0.0) * 65, 0, (Math.random() + 0.0) * 60],
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

//     return () => {
//       if (meshRef.current) {
//         meshRef.current.geometry?.dispose();
//         if (Array.isArray(meshRef.current.material)) {
//           meshRef.current.material.forEach((m) => m.dispose());
//         } else {
//           meshRef.current.material?.dispose();
//         }
//       }
//     };
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
//   const instancedMeshes = useMemo(() => {
//     const result = [];
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         result.push({
//           geometry: child.geometry.clone(),
//           material: child.material.clone(),
//         });
//       }
//     });
//     return result;
//   }, [scene]);

//   if (instancedMeshes.length === 0) return null;

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

// export default function Tree(props) {
//   const group = useRef();
//   const { scene } = useGLTF("Objects/Final/Tree2.glb");

//   useEffect(() => {}, [scene]);

//   return (
//     <>
//       <group ref={group} {...props} dispose={null} position={[20, 0, 45]}>
//         <InstancedTree scene={scene} />
//       </group>
//       {/* <group ref={group} {...props} dispose={null} position={[-90, 0, 10]}> */}
//     </>
//   );
// }

// useGLTF.preload("Objects/Final/Tree2.glb");
// 6
// import { useLoader, useThree } from "@react-three/fiber";
// import { useEffect, useRef, useMemo } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
// import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

// const TreeMiddle = Array.from({ length: 1 }, () => ({
//   position: [(Math.random() - 1.3) * 65, 3, (Math.random() + 0.0) * 60],
//   rotation: [-Math.PI / 2, 0, 0], //[-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [3.66, 3.66, 3.66],
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

//     return () => {
//       if (meshRef.current) {
//         meshRef.current.geometry?.dispose();
//         if (Array.isArray(meshRef.current.material)) {
//           meshRef.current.material.forEach((m) => m.dispose());
//         } else {
//           meshRef.current.material?.dispose();
//         }
//       }
//     };
//   }, [data]);

//   return (
//     <instancedMesh
//       ref={meshRef}
//       args={[geometry, material, data.length]}
//       frustumCulled={false}
//     />
//   );
// };

// export default function Tree({ onLoad }) {
//   const { gl } = useThree();

//   const { scene } = useLoader(
//     GLTFLoader,
//     "/Objects/Final/Tree2_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
//     (loader) => {
//       const ktx2Loader = new KTX2Loader()
//         .setTranscoderPath("/basis/")
//         .detectSupport(gl);

//       loader.setKTX2Loader(ktx2Loader);
//       loader.setMeshoptDecoder(MeshoptDecoder);
//     }
//   );

//   const instancedMeshes = useMemo(() => {
//     const result = [];
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         result.push({
//           geometry: child.geometry.clone(),
//           material: child.material.clone(),
//         });
//       }
//     });
//     return result;
//   }, [scene]);

//   useEffect(() => {
//     if (onLoad) {
//       onLoad({ scene });
//     }
//   }, [scene, onLoad]);

//   if (instancedMeshes.length === 0) return null;

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
// }
// 7
// import { useLoader, useThree } from "@react-three/fiber";
// import { useEffect, useRef, useMemo } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
// import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

// const TreeMiddle = Array.from({ length: 80 }, () => ({
//   position: [(Math.random() - 1.5) * 65, 3.7, (Math.random() - 0.5) * 150],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [3.66, 3.66, 3.66],
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

//     return () => {
//       if (meshRef.current) {
//         meshRef.current.geometry?.dispose();
//         if (Array.isArray(meshRef.current.material)) {
//           meshRef.current.material.forEach((m) => m.dispose());
//         } else {
//           meshRef.current.material?.dispose();
//         }
//       }
//     };
//   }, [data]);

//   return (
//     <instancedMesh
//       ref={meshRef}
//       args={[geometry, material, data.length]}
//       frustumCulled={false}
//     />
//   );
// };

// export default function Tree({ onLoad }) {
//   const { gl } = useThree();

//   const { scene } = useLoader(
//     GLTFLoader,
//     "/Objects/Final/Tree3_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
//     (loader) => {
//       const ktx2Loader = new KTX2Loader()
//         .setTranscoderPath("/basis/")
//         .detectSupport(gl);

//       loader.setKTX2Loader(ktx2Loader);
//       loader.setMeshoptDecoder(MeshoptDecoder);
//     }
//   );

//   const instancedMeshes = useMemo(() => {
//     const result = [];
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         result.push({
//           geometry: child.geometry.clone(),
//           material: child.material.clone(),
//         });
//       }
//     });
//     return result;
//   }, [scene]);

//   useEffect(() => {
//     if (onLoad) {
//       onLoad({ scene });
//     }
//   }, [scene, onLoad]);

//   if (instancedMeshes.length === 0) return null;

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
// }

// 4ος
// import { useLoader, useThree } from "@react-three/fiber";
// import { useEffect, useRef, useMemo } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
// import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
// const TreeMiddle = Array.from({ length: 120 }, () => ({
//   position: [(Math.random() + 0.0) * 70, 3, (Math.random() + 0.0) * 120], // Y: 1.5
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [3.66, 3.66, 3.66],
// }));

// const TreeMiddle2 = Array.from({ length: 120 }, () => ({
//   position: [(Math.random() + 0.0) * 80, 3, (Math.random() + 0.0) * 40], // Y: 1.5
//   rotation: [-Math.PI / 2, 0, -Math.PI / 1.5],
//   scale: [3.7, 3.7, 3.7],
// }));
// const TreeMiddle3 = Array.from({ length: 120 }, () => ({
//   position: [(Math.random() + 0.0) * 80, 3, (Math.random() + 0.0) * 85], // Y: 1.5
//   rotation: [-Math.PI / 2, 0, -Math.PI / 1.5],
//   scale: [3.7, 3.7, 3.7],
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

//     return () => {
//       if (meshRef.current) {
//         meshRef.current.geometry?.dispose();
//         if (Array.isArray(meshRef.current.material)) {
//           meshRef.current.material.forEach((m) => m.dispose());
//         } else {
//           meshRef.current.material?.dispose();
//         }
//       }
//     };
//   }, [data]);

//   return (
//     <instancedMesh
//       ref={meshRef}
//       args={[geometry, material, data.length]}
//       frustumCulled={false}
//     />
//   );
// };

// const InstancedTree = ({ scene, data }) => {
//   const instancedMeshes = useMemo(() => {
//     const result = [];
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         result.push({
//           geometry: child.geometry.clone(),
//           material: child.material.clone(),
//         });
//       }
//     });
//     return result;
//   }, [scene]);

//   if (instancedMeshes.length === 0) return null;

//   return (
//     <>
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={data}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//     </>
//   );
// };

// export default function Tree({ onLoad }) {
//   const { gl } = useThree();

//   const { scene } = useLoader(
//     GLTFLoader,
//     "/Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
//     (loader) => {
//       const ktx2Loader = new KTX2Loader()
//         .setTranscoderPath("/basis/")
//         .detectSupport(gl);

//       loader.setKTX2Loader(ktx2Loader);
//       loader.setMeshoptDecoder(MeshoptDecoder);
//     }
//   );

//   useEffect(() => {
//     if (onLoad) {
//       onLoad({ scene });
//     }
//   }, [scene, onLoad]);

//   return (
//     <>
//       <group position={[-100, 0.5, -10]}>
//         <InstancedTree scene={scene} data={TreeMiddle} />
//       </group>
//       <group position={[10, 0.5, 48]}>
//         <InstancedTree scene={scene} data={TreeMiddle2} />
//       </group>
//       <group position={[16, 0.5, -68]}>
//         <InstancedTree scene={scene} data={TreeMiddle3} />
//       </group>
//       <group position={[-70, 0.5, -60]}>
//         <InstancedTree scene={scene} data={TreeMiddle2} />
//       </group>
//     </>
//   );
// }
// 5ος
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const TreeMiddle = Array.from({ length: 200 }, () => ({
  position: [(Math.random() + 0.0) * 70, 3, (Math.random() + 0.0) * 120], // Y: 1.5
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [3.66, 3.66, 3.66],
}));

const TreeMiddle2 = Array.from({ length: 100 }, () => ({
  position: [(Math.random() + 0.0) * 80, 3, (Math.random() + 0.0) * 60], // Y: 1.5
  rotation: [-Math.PI / 2, 0, -Math.PI / 1.5],
  scale: [3.7, 3.7, 3.7],
}));

const TreeMiddle20 = Array.from({ length: 100 }, () => ({
  position: [(Math.random() + 0.0) * 80, 3, (Math.random() + 0.0) * 40], // Y: 1.5
  rotation: [-Math.PI / 2, 0, -Math.PI / 1.5],
  scale: [3.7, 3.7, 3.7],
}));

const TreeMiddle3 = Array.from({ length: 180 }, () => ({
  position: [(Math.random() + 0.0) * 80, 3, (Math.random() + 0.0) * 85], // Y: 1.5
  rotation: [-Math.PI / 2, 0, -Math.PI / 1.5],
  scale: [3.7, 3.7, 3.7],
}));
// const TreeMiddle4 = Array.from({ length: 20 }, () => ({
//     position: [(Math.random() + 0.0) * 80, 3, (Math.random() + 0.0) * 85], // Y: 1.5
//     rotation: [-Math.PI / 2, 0, -Math.PI / 1.5],
//     scale: [3.7, 3.7, 3.7],
//   }));
const TreeMiddle4 = Array.from({ length: 4 }, (_, i) => ({
  position: [51.0 + i * 8, 3, 33.5],
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [3.7, 3.7, 3.7],
}));
const TreeMiddle40 = Array.from({ length: 50 }, (_, i) => ({
  position: [51.0 + i * 3, 3, 33.5 + i * 0.03],
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [3.7, 3.7, 3.7],
}));
const TreeMiddle50 = Array.from({ length: 20 }, (_, i) => ({
  position: [51.0, 3, 33.5 + i * 6],
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [3.7, 3.7, 3.7],
}));

const TreeMiddle5 = Array.from({ length: 10 }, () => ({
  position: [(Math.random() + 0.0) * 20, 3, (Math.random() + 0.0) * 20], // Y: 1.5
  rotation: [-Math.PI / 2, 0, -Math.PI / 1.5],
  scale: [3.7, 3.7, 3.7],
}));
const Trees4 = Array.from({ length: 4 }, (_, i) => ({
  position: [0.0, 3, 33.5 + i * 6],
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [3.7, 3.7, 3.7],
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

const LODInstancedTree = ({ scene, data, position }) => {
  const lodRef = useRef();
  const { camera } = useThree();

  // Create simplified geometries for LOD levels
  const lodLevels = useMemo(() => {
    if (!scene) return [];

    const levels = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        const originalGeometry = child.geometry.clone();
        const material = child.material.clone();

        // LOD Level 0 (High detail) - Original geometry
        const highDetail = {
          geometry: originalGeometry,
          material: material.clone(),
          distance: 180,
        };

        // LOD Level 1 (Medium detail) - Simplified geometry
        const mediumGeometry = originalGeometry.clone();
        // Simple vertex decimation by skipping every other vertex (basic simplification)
        if (mediumGeometry.attributes.position) {
          const positions = mediumGeometry.attributes.position.array;
          const simplifiedPositions = new Float32Array(
            Math.floor(positions.length * 0.7)
          );
          for (let i = 0, j = 0; i < positions.length; i += 3) {
            if (Math.random() > 0.3) {
              // Keep 70% of vertices randomly
              simplifiedPositions[j] = positions[i];
              simplifiedPositions[j + 1] = positions[i + 1];
              simplifiedPositions[j + 2] = positions[i + 2];
              j += 3;
            }
          }
          mediumGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(simplifiedPositions, 3)
          );
        }

        const mediumDetail = {
          geometry: mediumGeometry,
          material: material.clone(),
          distance: 400,
        };

        // LOD Level 2 (Low detail) - Very simplified geometry (box)
        const lowGeometry = new THREE.BoxGeometry(1, 2, 1);
        const lowMaterial = new THREE.MeshBasicMaterial({
          color: 0x2d5a27, // Tree-like green color
          // transparent: true,
          opacity: 0.8,
        });

        const lowDetail = {
          geometry: lowGeometry,
          material: lowMaterial,
          distance: 500,
        };

        levels.push([highDetail, mediumDetail, lowDetail]);
      }
    });

    return levels;
  }, [scene]);

  useFrame(() => {
    if (lodRef.current && camera) {
      const distance = lodRef.current.position.distanceTo(camera.position);

      // Update LOD based on distance
      lodRef.current.children.forEach((lod, index) => {
        if (lod.isLOD) {
          lod.update(camera);
        }
      });
    }
  });

  if (lodLevels.length === 0) return null;

  return (
    <group ref={lodRef} position={position}>
      {lodLevels.map((levels, meshIndex) => (
        <primitive
          key={meshIndex}
          object={(() => {
            const lod = new THREE.LOD();

            levels.forEach((level) => {
              const instancedMesh = new THREE.InstancedMesh(
                level.geometry,
                level.material,
                data.length
              );

              // Set up instanced matrices
              const matrix = new THREE.Matrix4();
              data.forEach((item, i) => {
                matrix.compose(
                  new THREE.Vector3(...item.position),
                  new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(...item.rotation)
                  ),
                  new THREE.Vector3(...item.scale)
                );
                instancedMesh.setMatrixAt(i, matrix);
              });
              instancedMesh.instanceMatrix.needsUpdate = true;
              instancedMesh.frustumCulled = false;

              lod.addLevel(instancedMesh, level.distance);
            });

            return lod;
          })()}
        />
      ))}
    </group>
  );
};

export default function Tree({ onLoad }) {
  const { gl } = useThree();

  const { scene } = useLoader(
    GLTFLoader,
    "/Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    (loader) => {
      const ktx2Loader = new KTX2Loader()
        .setTranscoderPath("/basis/")
        .detectSupport(gl);

      loader.setKTX2Loader(ktx2Loader);
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
  );

  useEffect(() => {
    if (onLoad) {
      onLoad({ scene });
    }
  }, [scene, onLoad]);

  return (
    <>
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle}
        position={[-91, 0.5, -10]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle20}
        position={[10, 0.5, 48]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle3}
        position={[16, 0.5, -68]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle2}
        position={[-60, 0.5, -73]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle4}
        position={[0, 0.5, -1.5]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle4}
        position={[-6, 0.5, 7]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle4}
        position={[0, 0.5, -8]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle4}
        position={[-30, 0.5, -12]}
      />

      <LODInstancedTree
        scene={scene}
        data={TreeMiddle5}
        position={[-35, 0.5, 10]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle5}
        position={[-20, 0.5, 50]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle40}
        position={[-115, 0.5, -110]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddle50}
        position={[-120, 0.5, -110]}
      />
      <LODInstancedTree scene={scene} data={Trees4} position={[1.5, 0.5, 25]} />
      <LODInstancedTree scene={scene} data={Trees4} position={[7.5, 0.5, 25]} />
    </>
  );
}
