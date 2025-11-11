import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  lazy,
  useCallback,
  startTransition,
} from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { Text } from "@react-three/drei";
import Scene from "./Scene";
import CameraControlsImpl from "camera-controls";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";
CameraControlsImpl.install({ THREE });
const Book = lazy(() =>
  import("./Book").then((mod) => ({ default: mod.Book }))
);
import LightsOffBloom from "./LightsOffBloom";
import TVMenu from "./TVMenu/TVMenu";
import DevPlaceKtx2 from "./DevPlaceKtx2";
import Pavement from "./Pavement";
import { useTexture } from "@react-three/drei";
import Avatar from "../Avatar";
import Frames from "./Frames";
import {
  Bachelor,
  Cup,
  Portrait,
  Proficiency,
  LogisthsAtaxhs,
  Deutsch,
  Master,
} from "./Cup";
import ExitButtonStars from "./ExitButtonStars";
import StreetLamps from "./StreetLamps";
import GrassAndSkyAndDevObjects from "./GrassAndSkyAndDevObjects";
import Tree from "./Trees&Flowers/Tree";
import Sky from "./Sky";
import { useFrame } from "@react-three/fiber";
import DoorSign from "./DoorSign";
// import { validateModelPath, validateAssetPath } from "../../utils/security";
import { validateModelPath, validateAssetPath } from "../../utils/security";

// Audio manager to prevent multiple instances
const audioManager = {
  currentSound: null,
  playSound(path) {
    if (this.currentSound) {
      this.currentSound.pause();
    }
    this.currentSound = new Audio(path);
    this.currentSound.volume = 0.5;
    this.currentSound
      .play()
      .catch((err) => console.log("Sound play error:", err));
  },
};

// Debounce helper to prevent rapid-fire handler calls
const createDebouncedHandler = (handler, delay = 50) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => handler(...args), delay);
  };
};

// Deferred state batch - updates state asynchronously to avoid blocking
const deferredBatch = (updates) => {
  requestAnimationFrame(() => {
    updates();
  });
};

export default function Avatar_dev_place({
  setFrameLoopMode,
  props,
  setShowToggleButton,
}) {
  const hoverSoundRef = useRef(null);
  const cameraControlsRef = useRef();
  const meshRefInitial = useRef();
  const [showHouse, setShowHouse] = useState(false);
  const meshRef = useRef();
  const [lightOnWisdomNook, setLightOnWisdomNook] = useState(false);
  const [lightOnNavigationGuide, setLightOnNavigationGuide] = useState(false);
  const [lightOnDoor, setLightOnDoor] = useState(false);

  const bookRef = useRef();
  const tvMenuRef = useRef();
  const cupRef = useRef();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const performanceMode = isVideoPlaying;
  const [hideObjects, setHideObjects] = useState(true);

  const safeAudioPath = validateAssetPath("/panel_click.mp3")
    ? "/panel_click.mp3"
    : null;
  const safeAudioTVPath = validateAssetPath("/tv_off.mp3")
    ? "/tv_off.mp3"
    : null;

  useEffect(() => {
    if (!safeAudioPath) {
      console.error("Blocked unsafe audio path");
    }
    if (!safeAudioTVPath) {
      console.error("Blocked unsafe audio path");
    }
    return () => {
      if (hoverSoundRef.current) {
        hoverSoundRef.current.pause();
        hoverSoundRef.current = null;
      }
    };
  }, [safeAudioPath, safeAudioTVPath]);

  // Helper to batch camera and light updates - OPTIMIZED for performance
  const setCameraState = useCallback((config) => {
    if (!cameraControlsRef.current) return;
    const {
      lookAt,
      minDistance,
      maxDistance,
      minPolar,
      maxPolar,
      minAzimuth,
      maxAzimuth,
      azimuthRotateSpeed,
      polarRotateSpeed,
      dollyToCursor,
      dollySpeed,
      animate = false,
    } = config;

    // Defer heavy camera work to next frame
    requestAnimationFrame(() => {
      if (!cameraControlsRef.current) return;

      // Set simple properties first (synchronous)
      if (minDistance !== undefined)
        cameraControlsRef.current.minDistance = minDistance;
      if (maxDistance !== undefined)
        cameraControlsRef.current.maxDistance = maxDistance;
      if (minPolar !== undefined)
        cameraControlsRef.current.minPolarAngle = minPolar;
      if (maxPolar !== undefined)
        cameraControlsRef.current.maxPolarAngle = maxPolar;
      if (minAzimuth !== undefined)
        cameraControlsRef.current.minAzimuthAngle = minAzimuth;
      if (maxAzimuth !== undefined)
        cameraControlsRef.current.maxAzimuthAngle = maxAzimuth;
      if (azimuthRotateSpeed !== undefined)
        cameraControlsRef.current.azimuthRotateSpeed = azimuthRotateSpeed;
      if (polarRotateSpeed !== undefined)
        cameraControlsRef.current.polarRotateSpeed = polarRotateSpeed;
      if (dollyToCursor !== undefined)
        cameraControlsRef.current.dollyToCursor = dollyToCursor;
      if (dollySpeed !== undefined)
        cameraControlsRef.current.dollySpeed = dollySpeed;

      // Defer the lookAt (expensive) to end of frame
      if (lookAt) {
        requestAnimationFrame(() => {
          if (cameraControlsRef.current) {
            cameraControlsRef.current.setLookAt(...lookAt, animate);
          }
        });
      }
    });
  }, []);

  const playClickSound = useCallback(() => {
    if (safeAudioPath) {
      audioManager.playSound(safeAudioPath);
    }
  }, [safeAudioPath]);

  const playTVSound = useCallback(() => {
    if (safeAudioTVPath) {
      audioManager.playSound(safeAudioTVPath);
    }
  }, [safeAudioTVPath]);
  const handleClick = useCallback(() => {
    // Play sound immediately (non-blocking)
    playClickSound();

    // Defer camera setup
    setCameraState({
      lookAt: null,
      minDistance: 13,
      maxDistance: 62,
      azimuthRotateSpeed: 1,
      minPolar: Math.PI / 2.8,
      maxPolar: Math.PI / 2.15,
    });

    // Calculate camera position and apply it deferred
    if (meshRef.current && cameraControlsRef.current) {
      requestAnimationFrame(() => {
        const meshWorldPosition = new THREE.Vector3();
        meshRef.current.getWorldPosition(meshWorldPosition);
        const frontDirection = new THREE.Vector3(0, 0, -1);
        const meshWorldQuaternion = new THREE.Quaternion();
        meshRef.current.getWorldQuaternion(meshWorldQuaternion);
        frontDirection.applyQuaternion(meshWorldQuaternion);
        const cameraDistance = 19;
        const xOffset = 0;
        const yOffset = 6;
        const cameraPosition = meshWorldPosition
          .clone()
          .addScaledVector(frontDirection, -cameraDistance)
          .add(new THREE.Vector3(xOffset, yOffset, 1));

        setCameraState({
          lookAt: [
            cameraPosition.x,
            cameraPosition.y,
            cameraPosition.z,
            meshWorldPosition.x,
            meshWorldPosition.y,
            meshWorldPosition.z,
          ],
          animate: false,
        });
      });
    }

    // Defer state updates with startTransition to avoid blocking
    startTransition(() => {
      setShowHouse(true);
      setShowToggleButton(false);
      setHideObjects(false);
    });
  }, [setCameraState, playClickSound, setShowToggleButton]);
  const handleExitClick = useCallback(() => {
    playClickSound();

    // Set basic constraints immediately
    setCameraState({
      minDistance: 9,
      maxDistance: 35,
      azimuthRotateSpeed: 1,
    });

    // Defer calculation and lookAt
    if (meshRef.current && cameraControlsRef.current) {
      requestAnimationFrame(() => {
        const meshWorldPosition = new THREE.Vector3();
        meshRef.current.getWorldPosition(meshWorldPosition);
        const frontDirection = new THREE.Vector3(0, 0, -1);
        const meshWorldQuaternion = new THREE.Quaternion();
        meshRef.current.getWorldQuaternion(meshWorldQuaternion);
        frontDirection.applyQuaternion(meshWorldQuaternion);
        const cameraDistance = 15;
        const xOffset = -3;
        const yOffset = 5;
        const targetOffset = new THREE.Vector3(-3, 0, 0);
        const targetPosition = meshWorldPosition.clone().add(targetOffset);
        const cameraPosition = meshWorldPosition
          .clone()
          .addScaledVector(frontDirection, -cameraDistance)
          .add(new THREE.Vector3(xOffset, yOffset, 1));

        setCameraState({
          lookAt: [
            cameraPosition.x,
            cameraPosition.y,
            cameraPosition.z,
            targetPosition.x,
            targetPosition.y,
            targetPosition.z,
          ],
          animate: false,
        });
      });
    }

    // Defer state updates
    startTransition(() => {
      setShowHouse(false);
      setShowToggleButton(false);
      setLightOnDoor(true);
      setHideObjects(true);
    });
  }, [setCameraState, playClickSound, setShowToggleButton]);
  const [showTVMenu, setShowTVMenu] = useState(false);
  const [showRemote, setShowRemote] = useState(false);
  const [prevMaxPolarAngle, setPrevMaxPolarAngle] = useState(null);
  const [showFakeBook, setShowFakeBook] = useState(true);
  const cubeRef = useRef();
  const [showBook, setShowBook] = useState(false);

  const handleClickAboutMe = useCallback(() => {
    setShowToggleButton(false);
    playClickSound();

    setCameraState({
      lookAt: [0, 0.5, -3.5, 0, -1.5, -2.4],
      minDistance: 0.2,
      maxDistance: 2.5,
      azimuthRotateSpeed: 0,
      dollySpeed: 1,
      dollyToCursor: true,
      minPolar: Math.PI / 20,
      maxPolar: Math.PI / 6,
    });

    if (prevMaxPolarAngle === null && cameraControlsRef.current) {
      setPrevMaxPolarAngle(cameraControlsRef.current.maxPolarAngle);
    }

    // Defer state updates
    startTransition(() => {
      setShowFakeBook(false);
      setShowBook(true);
    });
  }, [setCameraState, playClickSound, setShowToggleButton, prevMaxPolarAngle]);
  const handleClickNavigationGuide = useCallback(() => {
    playClickSound();

    setCameraState({
      minDistance: 8,
      maxDistance: 9.8,
      azimuthRotateSpeed: 1,
      dollyToCursor: true,
      minPolar: Math.PI / 2.4,
      maxPolar: Math.PI / 2.3,
      minAzimuth: Math.PI - Math.PI / 40,
      maxAzimuth: Math.PI + Math.PI / 40,
    });

    // Deferred rotation
    requestAnimationFrame(() => {
      if (cameraControlsRef.current) {
        cameraControlsRef.current.rotateTo(
          Math.PI,
          cameraControlsRef.current.polarAngle,
          false
        );
        // Set lookAt after rotation
        requestAnimationFrame(() => {
          setCameraState({
            lookAt: [0.808, 0.0, -5.28, 8.01, -2.89, -1.59],
            animate: false,
          });
        });
      }
    });

    // Defer state updates
    startTransition(() => {
      setLightOnNavigationGuide(true);
      setShowToggleButton(false);
    });
  }, [setCameraState, playClickSound, setShowToggleButton]);
  const handleExitProjects = useCallback(() => {
    playTVSound();

    // Set camera constraints immediately
    setCameraState({
      minDistance: 13.5,
      maxDistance: 62,
      azimuthRotateSpeed: 1,
      polarRotateSpeed: 1,
      dollySpeed: 1,
      dollyToCursor: false,
      minPolar: Math.PI / 2.8,
      maxPolar: Math.PI / 2.15,
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
    });

    // Defer camera position calculation
    if (meshRef.current && cameraControlsRef.current) {
      requestAnimationFrame(() => {
        const meshWorldPosition = new THREE.Vector3();
        meshRef.current.getWorldPosition(meshWorldPosition);
        const frontDirection = new THREE.Vector3(0, 0, -1);
        const meshWorldQuaternion = new THREE.Quaternion();
        meshRef.current.getWorldQuaternion(meshWorldQuaternion);
        frontDirection.applyQuaternion(meshWorldQuaternion);
        const cameraDistance = 31.7;
        const xOffset = 30;
        const yOffset = 3;
        const cameraPosition = meshWorldPosition
          .clone()
          .addScaledVector(frontDirection, -cameraDistance)
          .add(new THREE.Vector3(xOffset, yOffset, 4.95));

        setCameraState({
          lookAt: [
            cameraPosition.x,
            cameraPosition.y,
            cameraPosition.z,
            meshWorldPosition.x,
            meshWorldPosition.y,
            meshWorldPosition.z,
          ],
          animate: false,
        });
      });
    }

    // Defer all state updates - lots of them!
    startTransition(() => {
      setShowToggleButton(true);
      setLightOnWisdomNook(false);
      setShowTVMenu(false);
      setShowFakeBook(true);
      setShowBook(false);
      setShowRemote(false);
      setLightOnNavigationGuide(false);
      setShowHouse(false);
      setIsVideoPlaying(false);
      setFrameLoopMode("always");
      if (prevMaxPolarAngle !== null) {
        setPrevMaxPolarAngle(null);
      }
    });
  }, [
    setCameraState,
    playTVSound,
    setShowToggleButton,
    setFrameLoopMode,
    prevMaxPolarAngle,
  ]);
  const handleExitClickStars = useCallback(() => {
    playClickSound();

    // Set camera constraints immediately
    setCameraState({
      minDistance: 46,
      maxDistance: 66,
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
      minPolar: Math.PI / 2.8,
      maxPolar: Math.PI / 2.0,
    });

    // Defer camera calculation
    if (meshRef.current && cameraControlsRef.current) {
      requestAnimationFrame(() => {
        const meshWorldPosition = new THREE.Vector3();
        meshRef.current.getWorldPosition(meshWorldPosition);
        const frontDirection = new THREE.Vector3(0, 0.05, -1);
        const meshWorldQuaternion = new THREE.Quaternion();
        meshRef.current.getWorldQuaternion(meshWorldQuaternion);
        frontDirection.applyQuaternion(meshWorldQuaternion);
        const cameraDistance = 35.5;
        const xOffset = 30;
        const yOffset = 4.7;
        const cameraPosition = meshWorldPosition
          .clone()
          .addScaledVector(frontDirection, -cameraDistance)
          .add(new THREE.Vector3(xOffset, yOffset, 1));

        setCameraState({
          lookAt: [
            cameraPosition.x,
            cameraPosition.y,
            cameraPosition.z,
            meshWorldPosition.x,
            meshWorldPosition.y,
            meshWorldPosition.z,
          ],
          animate: false,
        });
      });
    }

    // Defer state updates
    startTransition(() => {
      setShowToggleButton(true);
      setLightOnDoor(false);
      setHideObjects(true);
      setShowHouse(false);
    });
  }, [setCameraState, playClickSound, setShowToggleButton]);
  const handleExitAboutMeClick = useCallback(() => {
    playClickSound();

    // Set camera constraints immediately
    setCameraState({
      minDistance: 13.5,
      maxDistance: 62,
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
      azimuthRotateSpeed: 1,
      polarRotateSpeed: 1,
      dollySpeed: 1,
      minPolar: Math.PI / 2.8,
      maxPolar: Math.PI / 2.05,
      dollyToCursor: false,
    });

    // Defer camera calculation
    if (meshRef.current && cameraControlsRef.current) {
      requestAnimationFrame(() => {
        const meshWorldPosition = new THREE.Vector3();
        meshRef.current.getWorldPosition(meshWorldPosition);
        const frontDirection = new THREE.Vector3(0, 0, -1);
        const meshWorldQuaternion = new THREE.Quaternion();
        meshRef.current.getWorldQuaternion(meshWorldQuaternion);
        frontDirection.applyQuaternion(meshWorldQuaternion);
        const cameraDistance = 31.7;
        const xOffset = 30;
        const yOffset = 3;
        const cameraPosition = meshWorldPosition
          .clone()
          .addScaledVector(frontDirection, -cameraDistance)
          .add(new THREE.Vector3(xOffset, yOffset, 4.95));

        setCameraState({
          lookAt: [
            cameraPosition.x,
            cameraPosition.y,
            cameraPosition.z,
            meshWorldPosition.x,
            meshWorldPosition.y,
            meshWorldPosition.z,
          ],
          animate: false,
        });
      });
    }

    // Defer lots of state updates
    startTransition(() => {
      setShowToggleButton(true);
      setIsVideoPlaying(false);
      setFrameLoopMode("always");
      setLightOnWisdomNook(false);
      setShowTVMenu(false);
      setShowFakeBook(true);
      setShowBook(false);
      setShowRemote(false);
      setLightOnNavigationGuide(false);
      setShowHouse(false);
      if (prevMaxPolarAngle !== null) {
        setPrevMaxPolarAngle(null);
      }
    });
  }, [
    setCameraState,
    playClickSound,
    setShowToggleButton,
    setFrameLoopMode,
    prevMaxPolarAngle,
  ]);
  const handleClickSide = useCallback(() => {
    playClickSound();

    // Set camera constraints immediately
    setCameraState({
      minDistance: 1.5,
      maxDistance: 5.4,
      azimuthRotateSpeed: 1,
      minAzimuth: (260 * Math.PI) / 180,
      maxAzimuth: (320 * Math.PI) / 180,
      polarRotateSpeed: 1,
      dollyToCursor: false,
      minPolar: Math.PI / 2.1,
      maxPolar: Math.PI / 2.05,
    });

    // Defer camera position calculation
    if (cameraControlsRef.current) {
      requestAnimationFrame(() => {
        const meshPosition = new THREE.Vector3(3.9, -0.4, -2.8);
        const cameraOffset = new THREE.Vector3(-5, 0.3, 0);
        const targetPosition = meshPosition.clone().add(cameraOffset);
        const lookAtTarget = meshPosition.clone();

        setCameraState({
          lookAt: [
            targetPosition.x,
            targetPosition.y,
            targetPosition.z,
            lookAtTarget.x,
            lookAtTarget.y,
            lookAtTarget.z,
          ],
          animate: false,
        });
      });
    }

    // Defer state updates
    startTransition(() => {
      setShowToggleButton(false);
      setIsVideoPlaying(true);
      setFrameLoopMode("demand");
      setShowTVMenu(true);
      setShowRemote(true);
    });
  }, [setCameraState, playClickSound, setShowToggleButton, setFrameLoopMode]);

  const handleClickTrophies = useCallback(() => {
    playClickSound();

    // Set camera constraints immediately
    if (cameraControlsRef.current) {
      const meshPosition = new THREE.Vector3(-4.22, -0.5, 0.3);
      const cameraOffset = new THREE.Vector3(2.5, 0, 0);
      const targetPosition = meshPosition.clone().add(cameraOffset);
      const lookAtTarget = meshPosition.clone();

      setCameraState({
        lookAt: [
          targetPosition.x,
          targetPosition.y,
          targetPosition.z,
          lookAtTarget.x,
          lookAtTarget.y,
          lookAtTarget.z,
        ],
        minDistance: 1.5,
        maxDistance: 3.92,
        dollyToCursor: true,
        minPolar: Math.PI / 2.4,
        maxPolar: Math.PI / 2.05,
        minAzimuth: (82 * Math.PI) / 180,
        maxAzimuth: (120 * Math.PI) / 180,
        animate: false,
      });
    }

    // Defer state updates
    startTransition(() => {
      setShowToggleButton(false);
      setLightOnWisdomNook(!lightOnWisdomNook);
    });
  }, [setCameraState, playClickSound, setShowToggleButton, lightOnWisdomNook]);

  // All hooks must be at the top - moved here to fix conditional hook calls
  const group = useRef();
  const textRef = useRef();

  const textureUrl =
    "/textures/TexturesCompressed/Developer/TV_remote_final7.jpg";
  const textureUrlSign =
    "/textures/TexturesCompressed/Developer/DoorPlate3.jpg";
  const modelPath = `${window.location.origin}/Objects/Final/avatar.glb`;
  const texturePath = "/textures/book-cover.jpg";
  const fontPath = "/fonts/bodoni-mt-bold-italic.ttf";
  const fontPathSec = "/fonts/frenchscriptmt.ttf";
  const fontPathThird = "/fonts/Cookie-Regular.ttf";
  const fontPathFourth = "/fonts/DeliusSwashCaps-Regular.ttf";
  const fontPathFifth = "/fonts/Spartacus-KVdLp.ttf";

  // Validate paths - but use a flag rather than early return
  const isTextureUrlValid =
    validateAssetPath(textureUrl) && validateAssetPath(textureUrlSign);
  const isModelPathValid = validateModelPath(modelPath);
  const isTexturePathValid = validateAssetPath(texturePath);
  const areFontsValid = [
    fontPath,
    fontPathSec,
    fontPathThird,
    fontPathFourth,
    fontPathFifth,
  ].every((path) => validateAssetPath(path));

  // Load assets only if valid
  const textureremote = useTexture(
    isTextureUrlValid
      ? textureUrl
      : "/textures/TexturesCompressed/Developer/TV_remote_final7.jpg"
  );
  const textureremotesign = useTexture(
    isTextureUrlValid
      ? textureUrlSign
      : "/textures/TexturesCompressed/Developer/DoorPlate3.jpg"
  );
  const { scene: modelScene } = useGLTF(
    isModelPathValid ? modelPath : "/Objects/Final/avatar.glb"
  );
  const bookTexture = useTexture(
    isTexturePathValid ? texturePath : "/textures/book-cover.jpg"
  );

  const clone = React.useMemo(
    () => SkeletonUtils.clone(modelScene),
    [modelScene]
  );
  const { nodes } = useGraph(clone);

  useFrame(({ clock }) => {
    if (textRef.current && textRef.current.material) {
      textRef.current.material.emissiveIntensity =
        1 + Math.sin(clock.getElapsedTime() * 2) * 1.1;
    }
  });

  // Log validation errors without early returns
  useEffect(() => {
    if (!isTextureUrlValid) {
      console.error("Blocked unsafe texture paths for remote");
    }
    if (!isModelPathValid) {
      console.error("Blocked unsafe model path:", modelPath);
    }
    if (!isTexturePathValid) {
      console.error("Blocked unsafe texture path:", texturePath);
    }
    if (!areFontsValid) {
      console.error("Blocked unsafe font paths");
    }
  }, [
    isTextureUrlValid,
    isModelPathValid,
    isTexturePathValid,
    areFontsValid,
    modelPath,
    texturePath,
  ]);

  const materials = [
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ map: textureremote, transparent: true }),
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ color: "black" }),
  ];
  const materialsign = [
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({
      map: textureremotesign,
      transparent: true,
    }),
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ color: "black" }),
  ];

  return (
    <>
      <group {...props} ref={group} dispose={null}>
        <group rotation-x={-Math.PI / 2}>
          <primitive object={nodes.Hips} />
          <Avatar
            animation="Typing"
            position={[0, 0.075, 0.05]}
            rotation={[0, 0, 0]}
          />
          {/* Παρακάτω προστίθεται η σκηνή χωρίς το */}
        </group>
        <ambientLight intensity={0.2} />
        {/* παρακάτω η επικάλυψη του βιβλίου */}
        <mesh
          ref={cubeRef}
          position={[-1.18, 0.5532, -2.38]}
          visible={showFakeBook}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        >
          <boxGeometry args={[0.01, 0.48, 0.32]} />
          <meshBasicMaterial map={bookTexture} />
        </mesh>
        {/* μέχρι εδώ η επικάλυψη του βιβλίου */}
        {/* παρακάτω το remote */}
        <mesh
          ref={cubeRef}
          position={[2.0, 0.55, -2.73]}
          visible={showRemote}
          rotation={[Math.PI / 2, -Math.PI / 2.8, Math.PI / 2]}
        >
          <boxGeometry args={[0.38, 0.08, 1.12]} />
          <primitive object={materials} attach="material" />
        </mesh>
        {/* μέχρι εδώ το remote */}
        {/* από εδώ πρόσθετο φως για wisdom nook */}
        <rectAreaLight
          position={[-3.69, 2.36, 0.3]}
          rotation={[-Math.PI / 2, 0, 0]}
          width={1.5}
          height={2}
          intensity={lightOnWisdomNook ? 1.68 : 0}
          color={"White"}
        />
        {/* μέχρι εδώ πρόσθετο φως για wisdom nook*/}
        {/* από εδώ πρόσθετο φως για ταμπέλα στην πόρτα*/}
        <mesh
          position={[-7.22, 2.08, 1.63]}
          visible={hideObjects ? true : false}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[1.0, 0.05, 0.32]} />
          <primitive object={materialsign} attach="material" />
        </mesh>
        <rectAreaLight
          position={[-7.2, 2.3, 1.683]}
          rotation={[-Math.PI / 2, 0, 0]}
          width={1.3}
          height={2}
          intensity={lightOnDoor ? 1.5 : 0}
          color={"White"}
        />
        {/* μέχρι εδώ πρόσθετο φως για ταμπέλα στην πόρτα*/}
        <mesh position={[-7.22, 0.105, 2.36]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.32, 0.04, 2.16]} />
          <meshBasicMaterial
            color="black"
            visible={hideObjects ? true : false}
          />
        </mesh>
        {/* από εδώ πρόσθετο φως για Navigation Guide */}
        <rectAreaLight
          position={[6.58, 0.9, -8.58]}
          rotation={[0, Math.PI, Math.PI / 2]}
          width={1.5}
          height={2}
          intensity={lightOnNavigationGuide ? 5.68 : 0}
          color={"White"}
        />
        {/* μέχρι εδώ πρόσθετο φως για Navigation Guide*/}
        {/* Μέχρι εδώ το έχω σαν Lamp που φωτίζει το βιβλίο */}
        {"Προσθέτω reflection στο πάτωμα "}

        <Text
          font={fontPath}
          position={[23.62, 5.15, 27.54]}
          textAlign="center"
          scale={0.33}
          onClick={handleClickNavigationGuide}
          ref={meshRefInitial}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Navigation
        </Text>
        <Text
          font={fontPath}
          position={[23.62, 4.75, 27.54]}
          textAlign="center"
          scale={0.33}
          onClick={handleClickNavigationGuide}
          ref={meshRefInitial}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Guide
        </Text>
        <Text
          font={fontPath}
          position={[6.69, 0.1, -8.4208]}
          textAlign="center"
          scale={0.059}
          onClick={handleExitAboutMeClick}
          toneMapped={false}
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 1.1, 0, Math.PI]}
          color={"red"}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Exit {/* Navigation Guide */}
        </Text>

        <Text
          font={fontPathSec}
          position={[23.62, 4.02, 27.54]}
          textAlign="center"
          scale={0.67}
          onClick={handleExitClick}
          ref={meshRefInitial}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Home
        </Text>
        <Text
          font={fontPathSec}
          position={[23.62, 3.35, 27.54]}
          textAlign="center"
          scale={0.67}
          onClick={handleClick}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Room
        </Text>
        {/* Παρακάτω το button για το about me */}
        <Text
          font={fontPath}
          position={[23.62, 2.64, 27.54]}
          textAlign="center"
          scale={0.28}
          onClick={handleClickAboutMe}
          ref={meshRefInitial}
          toneMapped={false}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          About me
          <meshStandardMaterial
            color={"pink"}
            emissive={"pink"}
            emissiveIntensity={3}
          />
        </Text>
        <Text
          font={fontPath}
          position={[23.62, 2.34, 27.54]}
          textAlign="center"
          scale={0.14}
          onClick={handleClickAboutMe}
          ref={meshRefInitial}
          toneMapped={false}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          (ή αλλιώς...τα εις εαυτόν)
          <meshStandardMaterial
            color={"pink"}
            emissive={"pink"}
            emissiveIntensity={3}
          />
        </Text>
        <Text
          font={fontPathSec}
          position={[-1.45, 0.527, -2.338]}
          textAlign="center"
          rotation={[Math.PI / 2, Math.PI, 0]}
          scale={0.05}
          onClick={handleExitAboutMeClick}
          toneMapped={false}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Exit {/*  (About me) */}
        </Text>
        <mesh
          ref={meshRef}
          position={[-1.45, 0.527, -2.338]}
          onClick={handleExitAboutMeClick}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
          rotation={[0, 0, 0]}
          visible={false}
        >
          <boxGeometry args={[0.26, 0.05, 0.15]} />
          <meshBasicMaterial color="blue" />
        </mesh>
        {/* Τηλεόρασης */}
        <mesh
          position={[2.42, 0.8, -2.85]}
          rotation={[-Math.PI / 2, -Math.PI / 8, -Math.PI / 2]}
          visible={false}
          onClick={handleExitProjects}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <planeGeometry args={[0.1, 0.1]} />
          <meshBasicMaterial />
        </mesh>
        {/* Μέχρι εδώ το button για το about me */}
        {/* Παρακάτω το button για τα Projects */}
        <Text
          font={fontPath}
          position={[23.62, 1.77, 27.54]}
          textAlign="center"
          scale={0.28}
          onClick={handleClickSide}
          ref={meshRefInitial}
          toneMapped={false}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Projects
          <meshStandardMaterial
            color={"pink"}
            emissive={"pink"}
            emissiveIntensity={3}
          />
        </Text>
        <Text
          font={fontPath}
          position={[23.58, 1.01, 27.54]}
          textAlign="center"
          scale={0.21}
          onClick={handleClickTrophies}
          ref={meshRefInitial}
          toneMapped={false}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Wisdom Nook
          <meshStandardMaterial
            color={"pink"}
            emissive={"pink"}
            emissiveIntensity={3}
          />
        </Text>
        <Text
          font={fontPath}
          position={[23.58, 0.68, 27.54]}
          textAlign="center"
          scale={0.1}
          onClick={handleClickTrophies}
          ref={meshRefInitial}
          toneMapped={false}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          (ή αλλιώς...τοίχος της ματαιοδοξίας)
          <meshStandardMaterial
            color={"pink"}
            emissive={"pink"}
            emissiveIntensity={3}
          />
        </Text>
        {/* Από εδώ το exit view στην Wisdom Nook */}
        {/* Wisdom Nook */}
        <mesh
          position={[-4.42, 1.99, 0.21]}
          rotation={[0, Math.PI / 2, 0]}
          visible={false}
          onClick={handleExitAboutMeClick}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <planeGeometry args={[0.35, 0.12]} />
          <meshBasicMaterial />
        </mesh>
        <pointLight // Φεγγάρι
          position={[36, 33, -89.5]}
          angle={Math.PI / 2}
          penumbra={1.5}
          intensity={450}
          castShadow={false}
          color="White"
        />
        <mesh>
          <Text
            font={fontPathThird}
            position={[-7.22, 0.13, 2.2]}
            textAlign="center"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.3}
          >
            Mike Vernadakis
            <meshStandardMaterial
              color={"White"}
              visible={hideObjects ? true : false}
              emissive={"White"}
              emissiveIntensity={1.7}
            />
          </Text>
        </mesh>
        <mesh>
          <Text
            font={fontPathFourth}
            position={[-7.65, 0.13, 2.55]}
            textAlign="center"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.19}
          >
            Developer
            <meshStandardMaterial
              color={"White"}
              visible={hideObjects ? true : false}
              emissive={"White"}
              emissiveIntensity={1.5}
            />
          </Text>
        </mesh>
        <mesh>
          <Text
            ref={textRef}
            font={fontPathFourth}
            position={[-6.68, 0.13, 2.55]}
            textAlign="center"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.19}
          >
            (by Night)
            <meshStandardMaterial
              color={"White"}
              visible={hideObjects ? true : false}
              emissive={"White"}
              emissiveIntensity={1.5}
            />
          </Text>
        </mesh>
        <mesh>
          <Text
            font={fontPathFifth}
            position={[-7.21, 2.13, 1.66]}
            rotation={[0, 0, 0]}
            textAlign="center"
            scale={0.11}
          >
            ΜΗΔΕΙΣ ΑΝΑΛΓΗΤΟΣ
            <meshStandardMaterial
              color={"White"}
              visible={hideObjects ? true : false}
            />
          </Text>
        </mesh>
        <mesh>
          <Text
            font={fontPathFifth}
            position={[-7.21, 2.02, 1.66]}
            rotation={[0, 0, 0]}
            textAlign="center"
            scale={0.11}
          >
            ΕΙΣΙΤΩ ΜΟΙ ΤΗ ΘΥΡΑ
            <meshStandardMaterial
              color={"White"}
              visible={hideObjects ? true : false}
            />
          </Text>
        </mesh>
        <CameraControls
          ref={cameraControlsRef}
          minDistance={46} //από εδώ ορίζει τη μικρότερη απόσταση μετά από click στη νύχτα
          maxDistance={92} //από εδώ ορίζει τη μέγιστη απόσταση μετά από click στη νύχτα
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.01} //από εδώ ορίζει τη γωνία της κάμερας στο μισό σε x άξονα
          truck={false}
        />
        {!performanceMode && (
          <>
            <Suspense fallback={null}>
              {showBook && <Book ref={bookRef} />}
            </Suspense>
            {showHouse && <Cup ref={cupRef} />}
            <Portrait />
            <Bachelor />
            <Proficiency />
            <LogisthsAtaxhs />
            <Deutsch />
            <Master />
            <ExitButtonStars onClick={handleExitClickStars} />
            <StreetLamps />
            <Tree />
            <Sky />
            <Pavement />
            {/* {!showHouse &&  */}
          </>
        )}
        {!setHideObjects && (
          <>
            <DoorSign />
          </>
        )}
        {showTVMenu && <TVMenu ref={tvMenuRef} />}
        {showRemote}
        <GrassAndSkyAndDevObjects />
        <Frames position={[0, 0.04, 0]} />
        <DevPlaceKtx2 />
        {!showHouse && <Scene />}
        <LightsOffBloom />
      </group>
    </>
  );
}
