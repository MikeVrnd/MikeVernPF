// // 2 με σωστό κώδικα αλλά μόνο θέση
// import React, { useRef, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// // Δέντρα στη μέση
// const GrassMiddle = Array.from({ length: 90 }, (_, i) => ({
//   position: [-90.5, 0, -90 + i * 2],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.33, 0.33, 0.33],
// }));
// const GrassMiddle2 = Array.from({ length: 90 }, (_, i) => ({
//   position: [-88, 0, -90 + i * 2],
//   rotation: [-Math.PI / 2, 0, -Math.PI / 2],
//   scale: [0.33, 0.33, 0.33],
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

// const InstancedGrass = ({ scene }) => {
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
//           data={GrassMiddle}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={GrassMiddle2}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))}
//       {/*
//       {instancedMeshes.map((mesh, index) => (
//         <InstancedMeshGroup
//           key={index}
//           data={GrassMiddle3}
//           geometry={mesh.geometry}
//           material={mesh.material}
//         />
//       ))} */}
//     </>
//   );
// };

// export default function GrassClicked(props) {
//   const group = useRef();
//   const { scene } = useGLTF("Objects/DecimatedScene/Optimized/Grass.glb");

//   useEffect(() => {
//     // console.log("GLTF scene loaded:", scene);
//   }, [scene]);

//   return (
//     <>
//       <group ref={group} {...props} dispose={null}>
//         <InstancedGrass scene={scene} />
//       </group>

//       <group ref={group} {...props} dispose={null} position={[5, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[10, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[15, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[20, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[25, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[30, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[35, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[40, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[45, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[50, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[55, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//       <group ref={group} {...props} dispose={null} position={[60, 0, 0]}>
//         <InstancedGrass scene={scene} />
//       </group>
//     </>
//   );
// }

// useGLTF.preload("Objects/DecimatedScene/Optimized/Grass.glb");

// 2 με σωστό κώδικα αλλά μόνο θέση
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
const GrassMiddle = Array.from({ length: 554 }, () => ({
  position: [(Math.random() + 0.1) * 60, 0, (Math.random() - 0.55) * 158],
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
  }, [data]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, data.length]}
      frustumCulled={false}
    />
  );
};

const InstancedGrass = ({ scene }) => {
  const instancedMeshes = [];

  scene.traverse((child) => {
    if (child.isMesh) {
      instancedMeshes.push({
        geometry: child.geometry,
        material: child.material,
      });
    }
  });

  if (instancedMeshes.length === 0) {
    return null;
  }

  return (
    <>
      {instancedMeshes.map((mesh, index) => (
        <InstancedMeshGroup
          key={index}
          data={GrassMiddle}
          geometry={mesh.geometry}
          material={mesh.material}
        />
      ))}
    </>
  );
};

export default function GrassClicked(props) {
  const group = useRef();
  const { scene } = useGLTF("Objects/DecimatedScene/Optimized/Grass.glb");

  useEffect(() => {}, [scene]);

  return (
    <>
      {/* <group ref={group} {...props} dispose={null}>
<InstancedGrass scene={scene} />
</group> */}
      {/* <group ref={group} {...props} dispose={null} position={[18, 0, 0]}>
<InstancedGrass scene={scene} />
</group> */}
      <group ref={group} {...props} dispose={null} position={[-90, 0, 11]}>
        <InstancedGrass scene={scene} />
      </group>

      {/* <group ref={group} {...props} dispose={null} position={[19, 0, 19]}>
<InstancedGrass scene={scene} />
</group> */}
    </>
  );
}

useGLTF.preload("Objects/DecimatedScene/Optimized/Rose.glb");
