// hooks/useSharedKTX2Loader.js
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
let sharedKTX2Loader = null;
export const useSharedKTX2Loader = () => {
  const { gl } = useThree();
  return useMemo(() => {
    if (!sharedKTX2Loader) {
      sharedKTX2Loader = new KTX2Loader()
        .setTranscoderPath("/basis/")
        .detectSupport(gl);
    }
    return sharedKTX2Loader;
  }, [gl]);
};
