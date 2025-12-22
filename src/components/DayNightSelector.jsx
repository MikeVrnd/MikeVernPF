import React, { useCallback, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { validateModelPath } from "../utils/security";

const DayNightSelector = ({ onDay, onNight, ...props }) => {
  const modelPath = `${window.location.origin}/Objects/Final/dayandnight.glb`;
  const safeModelPath = validateModelPath(modelPath)
    ? modelPath
    : "/Objects/Final/dayandnight.glb";
  const { scene } = useGLTF(safeModelPath);

  const clickableNames = useMemo(() => new Set(["Day", "Night"]), []);

  const handleClick = useCallback(
    (event) => {
      const name = event.object?.name;
      if (name === "Day") {
        onDay?.();
      } else if (name === "Night") {
        onNight?.();
      }
    },
    [onDay, onNight]
  );

  const handlePointerOver = useCallback(
    (event) => {
      if (clickableNames.has(event.object?.name)) {
        document.body.style.cursor = "pointer";
      }
    },
    [clickableNames]
  );

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = "default";
  }, []);

  return (
    <primitive
      object={scene}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      {...props}
    />
  );
};

useGLTF.preload("/Objects/Final/dayandnight.glb");

export default DayNightSelector;
