import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useSharedKTX2Loader } from "../../useSharedKTX2Loader";
import { validateModelPath } from "../../utils/security";
const modelPath =
  "https://mike-vern-pf.vercel.app/Objects/Final/Accountant_place_city_without_building_with_mountain_texture_with_signpost_resized_etc1s_draco_dedup_pruned_simplified_final_optimized.glb";

export default function AccPlaceKtx2({ visible = true, onLoad }) {
  const ktx2Loader = useSharedKTX2Loader();
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe 3D model:", modelPath);
    return null;
  } // μέχρι εδώ

  const { nodes, materials, scene } = useLoader(
    GLTFLoader,
    modelPath,
    (loader) => {
      loader.setKTX2Loader(ktx2Loader);
      loader.setMeshoptDecoder(MeshoptDecoder);
    }
  );
  useEffect(() => {
    if (onLoad) onLoad({ nodes, materials });
  }, [nodes, materials, onLoad]);
  useEffect(() => {
    if (!visible) {
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => {
                if (m.map) m.map.dispose();
                m.dispose();
              });
            } else {
              if (child.material.map) child.material.map.dispose();
              child.material.dispose();
            }
          }
        }
      });
    }
  }, [visible, scene]);
  return visible ? <primitive object={scene} /> : null;
}
