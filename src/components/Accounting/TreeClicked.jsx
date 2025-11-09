import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useSharedKTX2Loader } from "../../useSharedKTX2Loader";
import { validateModelPath } from "../../utils/security";
const TreeMiddle = Array.from({ length: 2 }, (_, i) => ({
  position: [-27, 5, -26 + i * 21],
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [5.94, 5.94, 5.94],
}));
const TreeMiddleFront = Array.from({ length: 2 }, (_, i) => ({
  position: [-27, 5, 56 + i * 31],
  rotation: [-Math.PI / 2, 0, -Math.PI / 2],
  scale: [5.94, 5.94, 5.94],
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
  const lodLevels = useMemo(() => {
    if (!scene) return [];
    const levels = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        const originalGeometry = child.geometry.clone();
        const material = child.material.clone();
        const highDetail = {
          geometry: originalGeometry,
          material: material.clone(),
          distance: 80,
        };
        const mediumGeometry = originalGeometry.clone();
        if (mediumGeometry.attributes.position) {
          const positions = mediumGeometry.attributes.position.array;
          const simplifiedPositions = new Float32Array(
            Math.floor(positions.length * 0.7)
          );
          for (let i = 0, j = 0; i < positions.length; i += 3) {
            if (Math.random() > 0.3) {
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
          distance: 150,
        };
        const lowGeometry = new THREE.BoxGeometry(1, 2, 1);
        const lowMaterial = new THREE.MeshBasicMaterial({
          color: 0x2d5a27,
          transparent: true,
          opacity: 0.8,
        });
        const lowDetail = {
          geometry: lowGeometry,
          material: lowMaterial,
          distance: 300,
        };
        levels.push([highDetail, mediumDetail, lowDetail]);
      }
    });
    return levels;
  }, [scene]);
  useFrame(() => {
    if (lodRef.current && camera) {
      const distance = lodRef.current.position.distanceTo(camera.position);
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
const modelPath =
  "https://mike-vern-pf.vercel.app/Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb";

export default function Tree({ onLoad }) {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }
  const ktx2Loader = useSharedKTX2Loader();
  const { scene } = useLoader(GLTFLoader, modelPath, (loader) => {
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);
  });
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
        position={[0, 0.5, 0]}
      />
      <LODInstancedTree
        scene={scene}
        data={TreeMiddleFront}
        position={[0, 0.5, 0]}
      />
    </>
  );
}
