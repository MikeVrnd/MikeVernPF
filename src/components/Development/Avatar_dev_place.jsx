import React, { Suspense, useEffect, useRef, useState, lazy } from "react";
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
import { validateModelPath, validateAssetPath } from "../../utils/security";

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
  useEffect(() => {
    if (!safeAudioPath) {
      console.error("Blocked unsafe audio path");
      return;
    }
    return () => {
      if (hoverSoundRef.current) {
        hoverSoundRef.current.pause();
        hoverSoundRef.current = null;
      }
    };
  }, []);
  const safeAudioTVPath = validateAssetPath("/tv_off.mp3")
    ? "/tv_off.mp3"
    : null;
  useEffect(() => {
    if (!safeAudioTVPath) {
      console.error("Blocked unsafe audio path");
      return;
    }
    return () => {
      if (hoverSoundRef.current) {
        hoverSoundRef.current.pause();
        hoverSoundRef.current = null;
      }
    };
  }, []);
  const handleClick = () => {
    setShowHouse(true);
    setShowToggleButton(false);
    setHideObjects(false);
    if (meshRef.current && cameraControlsRef.current) {
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
      cameraControlsRef.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        meshWorldPosition.x,
        meshWorldPosition.y,
        meshWorldPosition.z,
        true
      );
    }
    cameraControlsRef.current.minDistance = 13;
    cameraControlsRef.current.maxDistance = 62;
    cameraControlsRef.current.azimuthRotateSpeed = 1;
    cameraControlsRef.current.minPolarAngle = Math.PI / 2.8;
    cameraControlsRef.current.maxPolarAngle = Math.PI / 2.15;

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };
  const handleExitClick = () => {
    setShowHouse(false);
    setShowToggleButton(false);
    setLightOnDoor(true);
    setHideObjects(true);
    if (meshRef.current && cameraControlsRef.current) {
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
      cameraControlsRef.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
      cameraControlsRef.current.minDistance = 9;
      cameraControlsRef.current.maxDistance = 35;
      cameraControlsRef.current.azimuthRotateSpeed = 1;
    }

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };
  const [showTVMenu, setShowTVMenu] = useState(false);
  const [showRemote, setShowRemote] = useState(false);
  const [prevMaxPolarAngle, setPrevMaxPolarAngle] = useState(null);
  {
    /* παρακάτω η επικάλυψη του βιβλίου */
  }
  const [showFakeBook, setShowFakeBook] = useState(true);
  const cubeRef = useRef();
  {
    /* μέχρι εδώ η επικάλυψη του βιβλίου */
  }
  const [showBook, setShowBook] = useState(false);
  const handleClickAboutMe = () => {
    setShowToggleButton(false);
    if (cameraControlsRef.current) {
      const targetPosition = new THREE.Vector3(0, 0.5, -3.5);
      const lookAtTarget = new THREE.Vector3(0, -1.5, -2.4);
      cameraControlsRef.current.setLookAt(
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        lookAtTarget.x,
        lookAtTarget.y,
        lookAtTarget.z,
        true
      );
      if (prevMaxPolarAngle === null) {
        setPrevMaxPolarAngle(cameraControlsRef.current.maxPolarAngle);
      }
      cameraControlsRef.current.minDistance = 0.2;
      cameraControlsRef.current.maxDistance = 2.5;
      cameraControlsRef.current.azimuthRotateSpeed = 0;
      cameraControlsRef.current.dollySpeed = 1;
    }
    setShowFakeBook(false);
    setShowBook(true); //Βιβλίο με σελίδες
    cameraControlsRef.current.dollyToCursor = true;
    cameraControlsRef.current.minPolarAngle = Math.PI / 20;
    cameraControlsRef.current.maxPolarAngle = Math.PI / 6;

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };
  const handleClickNavigationGuide = () => {
    setLightOnNavigationGuide(true);
    setShowToggleButton(false); // για εμφάνιση button μέρα/νύχτα
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        0.808,
        0.0,
        -5.28,
        8.01,
        -2.89,
        -1.59,
        true
      );
      cameraControlsRef.current.minDistance = 8;
      cameraControlsRef.current.maxDistance = 9.8;
      cameraControlsRef.current.azimuthRotateSpeed = 1;
      cameraControlsRef.current.dollyToCursor = true;
      cameraControlsRef.current.minPolarAngle = Math.PI / 2.4;
      cameraControlsRef.current.maxPolarAngle = Math.PI / 2.3;
      const centerAzimuth = Math.PI;
      const halfRange = Math.PI / 40;
      cameraControlsRef.current.minAzimuthAngle = centerAzimuth - halfRange;
      cameraControlsRef.current.maxAzimuthAngle = centerAzimuth + halfRange;
      cameraControlsRef.current.rotateTo(
        Math.PI,
        cameraControlsRef.current.polarAngle,
        true
      );
    }

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };
  const handleExitProjects = () => {
    setShowToggleButton(true); // για απόκρυψη button μέρα/νύχτα
    if (meshRef.current && cameraControlsRef.current) {
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
      cameraControlsRef.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        meshWorldPosition.x,
        meshWorldPosition.y,
        meshWorldPosition.z,
        true
      );
      cameraControlsRef.current.minDistance = 13.5;
      cameraControlsRef.current.maxDistance = 62;
    }
    cameraControlsRef.current.azimuthRotateSpeed = 1;
    cameraControlsRef.current.polarRotateSpeed = 1;
    cameraControlsRef.current.dollySpeed = 1;
    cameraControlsRef.current.dollyToCursor = false;
    if (cameraControlsRef.current && prevMaxPolarAngle !== null) {
      cameraControlsRef.current.maxPolarAngle = prevMaxPolarAngle;
      setPrevMaxPolarAngle(null);
    }
    cameraControlsRef.current.minPolarAngle = Math.PI / 2.8;
    cameraControlsRef.current.maxPolarAngle = Math.PI / 2.15;
    cameraControlsRef.current.minAzimuthAngle = -Infinity;
    cameraControlsRef.current.maxAzimuthAngle = Infinity;
    setLightOnWisdomNook(false);
    setShowTVMenu(false);
    setShowFakeBook(true);
    setShowBook(false); // Πραγματικό βιβλίο με σελίδες
    setShowRemote(false);
    setLightOnNavigationGuide(false);
    setShowHouse(false);
    setShowToggleButton(true); // για απόκρυψη button μέρα/νύχτα
    setIsVideoPlaying(false);
    setFrameLoopMode("always");

    if (safeAudioTVPath) {
      const clickSound = new Audio(safeAudioTVPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };
  const handleExitClickStars = () => {
    setShowToggleButton(true);
    setLightOnDoor(false);
    setHideObjects(true);
    if (meshRef.current && cameraControlsRef.current) {
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
      cameraControlsRef.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        meshWorldPosition.x,
        meshWorldPosition.y,
        meshWorldPosition.z,
        true
      );
      cameraControlsRef.current.minDistance = 46;
      cameraControlsRef.current.maxDistance = 66;
      cameraControlsRef.current.minAzimuthAngle = -Infinity;
      cameraControlsRef.current.maxAzimuthAngle = Infinity;
    }
    cameraControlsRef.current.minPolarAngle = Math.PI / 2.8;
    cameraControlsRef.current.maxPolarAngle = Math.PI / 2.0;
    setShowHouse(false);

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };
  const handleExitAboutMeClick = () => {
    setShowToggleButton(true); // για απόκρυψη button μέρα/νύχτα
    setIsVideoPlaying(false);
    setFrameLoopMode("always");
    if (meshRef.current && cameraControlsRef.current) {
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
      cameraControlsRef.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        meshWorldPosition.x,
        meshWorldPosition.y,
        meshWorldPosition.z,
        true
      );
      cameraControlsRef.current.minDistance = 13.5;
      cameraControlsRef.current.maxDistance = 62;
      cameraControlsRef.current.minAzimuthAngle = -Infinity;
      cameraControlsRef.current.maxAzimuthAngle = Infinity;
    }
    cameraControlsRef.current.azimuthRotateSpeed = 1;
    cameraControlsRef.current.polarRotateSpeed = 1;
    cameraControlsRef.current.dollySpeed = 1;

    if (cameraControlsRef.current && prevMaxPolarAngle !== null) {
      cameraControlsRef.current.maxPolarAngle = prevMaxPolarAngle;
      setPrevMaxPolarAngle(null);
    }
    cameraControlsRef.current.minPolarAngle = Math.PI / 2.8;
    cameraControlsRef.current.maxPolarAngle = Math.PI / 2.05;
    setLightOnWisdomNook(false);
    setShowTVMenu(false);
    setShowFakeBook(true);
    setShowBook(false);
    setShowRemote(false);
    setLightOnNavigationGuide(false);
    cameraControlsRef.current.dollyToCursor = false;
    setShowHouse(false);

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };
  const handleClickSide = () => {
    setShowToggleButton(false);
    setIsVideoPlaying(true);
    setFrameLoopMode("demand");

    if (cameraControlsRef.current) {
      const meshPosition = new THREE.Vector3(3.9, -0.4, -2.8);
      const cameraOffset = new THREE.Vector3(-5, 0.3, 0);
      const targetPosition = meshPosition.clone().add(cameraOffset);
      const lookAtTarget = meshPosition.clone();
      cameraControlsRef.current.setLookAt(
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        lookAtTarget.x,
        lookAtTarget.y,
        lookAtTarget.z,
        true
      );

      cameraControlsRef.current.minDistance = 1.5;
      cameraControlsRef.current.maxDistance = 5.4;
    }

    cameraControlsRef.current.azimuthRotateSpeed = 1;
    cameraControlsRef.current.minAzimuthAngle = (260 * Math.PI) / 180;
    cameraControlsRef.current.maxAzimuthAngle = (320 * Math.PI) / 180;

    cameraControlsRef.current.polarRotateSpeed = 1;
    cameraControlsRef.current.dollyToCursor = false;
    cameraControlsRef.current.minPolarAngle = Math.PI / 2.1;
    cameraControlsRef.current.maxPolarAngle = Math.PI / 2.05;
    setShowTVMenu(true);
    setShowRemote(true);

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };

  const handleClickTrophies = () => {
    setShowToggleButton(false); // για εμφάνιση button μέρα/νύχτα
    setLightOnWisdomNook(!lightOnWisdomNook);
    if (cameraControlsRef.current) {
      const meshPosition = new THREE.Vector3(-4.22, -0.5, 0.3);
      const cameraOffset = new THREE.Vector3(2.5, 0, 0);
      const targetPosition = meshPosition.clone().add(cameraOffset);
      const lookAtTarget = meshPosition.clone();
      cameraControlsRef.current.setLookAt(
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        lookAtTarget.x,
        lookAtTarget.y,
        lookAtTarget.z,
        true
      );
      setTimeout(() => {
        const newCameraPosition = new THREE.Vector3();
        cameraControlsRef.current.getPosition(newCameraPosition);
      }, 100);
      cameraControlsRef.current.minDistance = 1.5;
      cameraControlsRef.current.maxDistance = 3.92;
      cameraControlsRef.current.dollyToCursor = true;
      cameraControlsRef.current.minPolarAngle = Math.PI / 2.4;
      cameraControlsRef.current.maxPolarAngle = Math.PI / 2.05;
      cameraControlsRef.current.minAzimuthAngle = (82 * Math.PI) / 180;
      cameraControlsRef.current.maxAzimuthAngle = (120 * Math.PI) / 180;
    }

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };

  const textureUrl =
    "/textures/TexturesCompressed/Developer/TV_remote_final7.jpg";
  const textureUrlSign =
    "/textures/TexturesCompressed/Developer/DoorPlate3.jpg";
  if (!validateAssetPath(textureUrl) || !validateAssetPath(textureUrlSign)) {
    console.error("Blocked unsafe texture path");
    return null;
  }
  const textureremote = useTexture(textureUrl);
  const materials = [
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ map: textureremote, transparent: true }),
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ color: "black" }),
    new THREE.MeshStandardMaterial({ color: "black" }),
  ];
  const textureremotesign = useTexture(textureUrlSign);
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
  const group = useRef();
  const modelPath = `${window.location.origin}/Objects/Final/avatar.glb`;
  const texturePath = "/textures/book-cover.jpg";

  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }

  if (!validateAssetPath(texturePath)) {
    console.error("Blocked unsafe texture path:", texturePath);
    return null;
  }

  const { scene } = useGLTF(modelPath);

  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const texture = useTexture(texturePath);

  const textRef = useRef();
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.material.emissiveIntensity =
        1 + Math.sin(clock.getElapsedTime() * 2) * 1.1;
    }
  });
  const fontPath = "/fonts/bodoni-mt-bold-italic.ttf";
  const fontPathSec = "/fonts/frenchscriptmt.ttf";
  const fontPathThird = "/fonts/Cookie-Regular.ttf";
  const fontPathFourth = "/fonts/DeliusSwashCaps-Regular.ttf";
  const fontPathFifth = "/fonts/Spartacus-KVdLp.ttf";
  if (!validateAssetPath(fontPath)) {
    console.error("Blocked unsafe font path:", fontPath);
    return null;
  }
  if (!validateAssetPath(fontPathSec)) {
    console.error("Blocked unsafe font path:", fontPathSec);
    return null;
  }
  if (!validateAssetPath(fontPathThird)) {
    console.error("Blocked unsafe font path:", fontPathThird);
    return null;
  }
  if (!validateAssetPath(fontPathFourth)) {
    console.error("Blocked unsafe font path:", fontPathFourth);
    return null;
  }
  if (!validateAssetPath(fontPathFifth)) {
    console.error("Blocked unsafe font path:", fontPathFifth);
    return null;
  }

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
          <meshBasicMaterial map={texture} />
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
