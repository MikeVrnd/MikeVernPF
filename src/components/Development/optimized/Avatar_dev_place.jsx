import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useGraph } from "@react-three/fiber";
import {
  Html,
  Ktx2,
  MeshReflectorMaterial,
  useAnimations,
  useCursor,
} from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
import * as THREE from "three";
import CameraControlsImpl from "camera-controls";
import { CameraControls } from "@react-three/drei";
CameraControlsImpl.install({ THREE });

// Lazy load components that aren't needed immediately
const Scene = React.lazy(() => import("./Scene"));
const Book = React.lazy(() => import("./Book"));
const LightsOffBloom = React.lazy(() => import("./LightsOffBloom"));
const TVMenu = React.lazy(() => import("./TVMenu/TVMenu"));
const DevPlaceKtx2 = React.lazy(() => import("./DevPlaceKtx2"));
const Frames = React.lazy(() => import("./Frames"));

// Import smaller components normally
import Avatar from "../Avatar";
import Pavement from "./Pavement";
import ExitButtonStars from "./ExitButtonStars";
import DoorSign from "./DoorSign";
import { validateModelPath, validateAssetPath } from "../../utils/security";

// Pre-create reusable Three.js objects
const frontDirection = new THREE.Vector3(0, 0, -1);
const meshWorldPosition = new THREE.Vector3();
const meshWorldQuaternion = new THREE.Quaternion();
const targetOffset = new THREE.Vector3(-3, 0, 0);

export default function Avatar_dev_place({
  setFrameLoopMode,
  props,
  setShowToggleButton,
}) {
  // Combine related state into a single object
  const [state, setState] = useState({
    showHouse: false,
    lightOnWisdomNook: false,
    lightOnNavigationGuide: false,
    lightOnDoor: false,
    isVideoPlaying: false,
    hideObjects: true,
    showTVMenu: false,
    showRemote: false,
    showFakeBook: true,
  });

  // Refs
  const refs = {
    hoverSound: useRef(null),
    camera: useRef(),
    mesh: useRef(),
    book: useRef(),
    tvMenu: useRef(),
    cup: useRef(),
  };

  // Memoize audio creation
  const clickSound = useMemo(() => {
    const safeAudioPath = validateAssetPath("/panel_click.mp3");
    if (!safeAudioPath) return null;
    const audio = new Audio(safeAudioPath);
    audio.volume = 0.5;
    return audio;
  }, []);

  // Camera movement calculation memoized function
  const calculateCameraMovement = useCallback((isEntering = true) => {
    if (!refs.mesh.current || !refs.camera.current) return null;

    refs.mesh.current.getWorldPosition(meshWorldPosition);
    refs.mesh.current.getWorldQuaternion(meshWorldQuaternion);
    frontDirection.applyQuaternion(meshWorldQuaternion);

    const cameraDistance = isEntering ? 19 : 15;
    const xOffset = isEntering ? 0 : -3;
    const yOffset = isEntering ? 6 : 5;

    const targetPosition = isEntering
      ? meshWorldPosition.clone()
      : meshWorldPosition.clone().add(targetOffset);

    const cameraPosition = meshWorldPosition
      .clone()
      .addScaledVector(frontDirection, -cameraDistance)
      .add(new THREE.Vector3(xOffset, yOffset, 1));

    return { cameraPosition, targetPosition };
  }, []);

  // Optimized click handlers
  const handleClick = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showHouse: true,
      hideObjects: false,
    }));
    setShowToggleButton(false);

    const cameraMovement = calculateCameraMovement(true);
    if (cameraMovement && refs.camera.current) {
      const { cameraPosition, targetPosition } = cameraMovement;
      refs.camera.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );

      // Update camera constraints
      refs.camera.current.minDistance = 13;
      refs.camera.current.maxDistance = 62;
      refs.camera.current.azimuthRotateSpeed = 1;
      refs.camera.current.minPolarAngle = Math.PI / 2.8;
      refs.camera.current.maxPolarAngle = Math.PI / 2.15;
    }

    clickSound?.play().catch((err) => console.log("Sound play error:", err));
  }, [calculateCameraMovement, setShowToggleButton, clickSound]);

  const handleExitClick = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showHouse: false,
      hideObjects: true,
      lightOnDoor: true,
    }));
    setShowToggleButton(false);

    const cameraMovement = calculateCameraMovement(false);
    if (cameraMovement && refs.camera.current) {
      const { cameraPosition, targetPosition } = cameraMovement;
      refs.camera.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );

      refs.camera.current.minDistance = 9;
      refs.camera.current.maxDistance = 35;
      refs.camera.current.azimuthRotateSpeed = 1;
    }

    clickSound?.play().catch((err) => console.log("Sound play error:", err));
  }, [calculateCameraMovement, setShowToggleButton, clickSound]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (refs.hoverSound.current) {
        refs.hoverSound.current.pause();
        refs.hoverSound.current = null;
      }
    };
  }, []);

  return <Suspense fallback={null}>{/* Your existing JSX here */}</Suspense>;
}
