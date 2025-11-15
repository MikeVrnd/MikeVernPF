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
  position: [(Math.random() + 0.0) * 20, 3, (Math.random() + 0.0) * 20],
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
          distance: 180,
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
          distance: 400,
        };

        const lowGeometry = new THREE.BoxGeometry(1, 2, 1);
        const lowMaterial = new THREE.MeshBasicMaterial({
          color: 0x2d5a27,
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

export default function Tree({ onLoad }) {
  const { gl } = useThree();

  const { scene } = useLoader(
    GLTFLoader,
    "/Objects/Final/Tree_resized_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
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
