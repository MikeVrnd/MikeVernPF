import { useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useSharedKTX2Loader } from "../../useSharedKTX2Loader";
import { validateModelPath } from "../../utils/security";
const modelPath =
  "/Objects/Final/Frames_resized_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb";

export default function Frames({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  onLoad,
}) {
  const ktx2Loader = useSharedKTX2Loader();
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe 3D model:", modelPath);
    return null; // Don't render anything
  } // μέχρι εδώ

  const { nodes, materials, animations, scene } = useLoader(
    GLTFLoader,
    modelPath,
    (loader) => {
      loader.setKTX2Loader(ktx2Loader);
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
  );

  useEffect(() => {
    if (onLoad) {
      onLoad({ nodes, materials, animations });
    }
  }, [nodes, materials, animations, onLoad]);

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
