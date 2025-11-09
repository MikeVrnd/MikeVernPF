import { useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useSharedKTX2Loader } from "../../useSharedKTX2Loader";
import { validateModelPath } from "../../utils/security";

const modelPath = `${window.location.origin}/Objects/Final/HouseMerged_final_optimized.glb`;
export default function DevPlaceKtx2({ onLoad }) {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }
  const ktx2Loader = useSharedKTX2Loader();
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
  return <primitive object={scene} />;
}
export function preloadDevPlaceKtx2Model(gl) {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe preload:", modelPath);
    return; // Don't preload
  }
  const loader = new GLTFLoader();
  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath("/basis/")
    .detectSupport(gl);
  loader.setKTX2Loader(ktx2Loader);
  loader.load(modelPath, () => {});
}
