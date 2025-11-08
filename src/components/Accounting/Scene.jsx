import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useThree, useLoader } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useSharedKTX2Loader } from "../../useSharedKTX2Loader";
import { validateModelPath } from "../../utils/security";
const modelPath =
  "/Objects/Final/AccPlaceHalfBuildingWithoutFramesAndDegrees_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb";

export default function Scene({ onLoad }) {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }
  const ktx2Loader = useSharedKTX2Loader(); // Use shared loader
  const { nodes, materials, animations, scene } = useLoader(
    GLTFLoader,
    modelPath,
    (loader) => {
      loader.setKTX2Loader(ktx2Loader);
    }
  );
  useEffect(() => {
    if (onLoad) {
      onLoad({ nodes, materials, animations });
    }
  }, [nodes, materials, animations, onLoad]);

  useEffect(() => {
    if (onLoad) {
      onLoad({ nodes, materials, animations });
    }
  }, [nodes, materials, animations, onLoad]);
  return (
    <group>
      <primitive object={scene} />
      <mesh position={[0.5, 1.98, -5.15]}>
        <boxGeometry args={[8.6, 4, 0.205]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </group>
  );
}
