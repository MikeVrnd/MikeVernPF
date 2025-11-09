import React, { useEffect, useRef, useState } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { Text } from "@react-three/drei";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";
import { HouseAccountant } from "./HouseAccountant";
import { Book_accountant } from "./Book_accountant";
import AccPlaceKtx2 from "./AccPlaceKtx2";
import Building from "./Building";
import Avatar from "../Avatar";
import BuildingsWhite from "./BuildingsWhite";
import Tree from "./Tree";
import PCAccountant from "./PCAccountant";
import Scene from "./Scene";
import { Ink } from "./Ink";
import FloatingTexts from "./FloatingTexts";
import {
  Bachelor,
  Proficiency,
  LogisthsAtaxhs,
  Deutsch,
  Master,
} from "../Degrees";
import { Arithmodeiktes } from "./Arithmodeiktes";
import { validateModelPath, validateAssetPath } from "../../utils/security";
export default function Avatar_acc_place({
  setFrameLoopMode,
  props,
  setShowToggleButton,
  onRequestNightDisposal,
}) {
  const cameraControlsRef = useRef();
  const meshRefInitial = useRef();
  const meshRef = useRef();
  const [showHouse, setShowHouse] = useState(false);
  const [prevMaxPolarAngle, setPrevMaxPolarAngle] = useState(null);
  const hoverSoundRef = useRef(null);
  {
    /* παρακάτω η επικάλυψη του βιβλίου */
  }
  const [showCube, setShowCube] = useState(false);
  const cubeRef = useRef();
  {
    /* μέχρι εδώ η επικάλυψη του βιβλίου */
  }
  const safeAudioPath = validateAssetPath("/panel_click.mp3")
    ? "/panel_click.mp3"
    : null;
  useEffect(() => {
    if (!safeAudioPath) {
      return;
    }

    return () => {
      if (hoverSoundRef.current) {
        hoverSoundRef.current.pause();
        hoverSoundRef.current = null;
      }
    };
  }, []);
  const [showBook, setShowBook] = useState(false); //Βιβλίο με σελίδες
  const handleClickAboutMe = () => {
    setShowToggleButton(false); // για απόκρυψη button μέρα/νύχτα
    if (cameraControlsRef.current) {
      cameraControlsRef.minAzimuthAngle = -Infinity;
      cameraControlsRef.maxAzimuthAngle = Infinity;
      cameraControlsRef.current.rotate(0, 0, 0);
      const targetPosition = new THREE.Vector3(-2.3, -0.05, -3.48);
      const lookAtTarget = new THREE.Vector3(-2.3, -0.95, -3.6);

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
      cameraControlsRef.current.maxDistance = 1.8;
      cameraControlsRef.current.azimuthRotateSpeed = 0;
      cameraControlsRef.current.dollySpeed = 1;
      cameraControlsRef.current.minPolarAngle = 0;
      cameraControlsRef.current.maxPolarAngle = 0;
      cameraControlsRef.current.dollyToCursor = true;
      cameraControlsRef.current.minAzimuthAngle = Math.PI / 2.4;
      cameraControlsRef.current.maxAzimuthAngle = Math.PI / 2.0;
      cameraControlsRef.current.rotate(Math.PI / 2, 0, 0);
      const centerAzimuth =
        (cameraControlsRef.minAzimuthAngle +
          cameraControlsRef.maxAzimuthAngle) /
        2;
      cameraControlsRef.azimuthAngle = centerAzimuth;
    }

    setShowCube(false);
    setShowBook(true);

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };

  const handleExitAboutMeClick = () => {
    setFrameLoopMode("always");
    setShowToggleButton(false); // για απόκρυψη button μέρα/νύχτα
    if (meshRef.current && cameraControlsRef.current) {
      const meshWorldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(meshWorldPosition);
      const frontDirection = new THREE.Vector3(0, -0.03, -1);
      const meshWorldQuaternion = new THREE.Quaternion();
      meshRef.current.getWorldQuaternion(meshWorldQuaternion);
      frontDirection.applyQuaternion(meshWorldQuaternion);
      const cameraDistance = 8.0;
      const xOffset = 12.9;
      const yOffset = 5;
      const cameraPosition = meshWorldPosition
        .clone()
        .addScaledVector(frontDirection, -cameraDistance)
        .add(new THREE.Vector3(xOffset, yOffset, 0));
      cameraControlsRef.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        meshWorldPosition.x,
        meshWorldPosition.y,
        meshWorldPosition.z,
        true
      );
      cameraControlsRef.current.minDistance = 10;
      cameraControlsRef.current.maxDistance = 32;
    }

    if (cameraControlsRef.current && prevMaxPolarAngle !== null) {
      cameraControlsRef.current.maxPolarAngle = prevMaxPolarAngle;
      setPrevMaxPolarAngle(null);
    }
    cameraControlsRef.current.minPolarAngle = Math.PI / 2.58;
    cameraControlsRef.current.maxPolarAngle = Math.PI / 2.34;

    cameraControlsRef.current.minAzimuthAngle = Math.PI / 25.8;
    cameraControlsRef.current.maxAzimuthAngle = Math.PI / 2.3;
    cameraControlsRef.current.azimuthRotateSpeed = 1;
    cameraControlsRef.current.polarRotateSpeed = 1;
    cameraControlsRef.current.dollySpeed = 1;
    setShowCube(true); //αφορά επικάλυψη του βιβλίου
    setShowBook(false); // Πραγματικό βιβλίο με σελίδες
    cameraControlsRef.current.dollyToCursor = false;

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };
  const handleClick = () => {
    setShowHouse(true);
    setShowCube(true);
    setShowToggleButton(false); // για απόκρυψη button μέρα/νύχτα
    if (meshRef.current && cameraControlsRef.current) {
      const meshWorldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(meshWorldPosition);
      const frontDirection = new THREE.Vector3(0, -0.08, -1);
      const meshWorldQuaternion = new THREE.Quaternion();
      meshRef.current.getWorldQuaternion(meshWorldQuaternion);
      frontDirection.applyQuaternion(meshWorldQuaternion);
      const cameraDistance = 5;
      const xOffset = 10;
      const yOffset = 5;
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
      cameraControlsRef.current.dollySpeed = 1;
      cameraControlsRef.current.minDistance = 0;
      cameraControlsRef.current.maxDistance = 32;
    }
    cameraControlsRef.current.minPolarAngle = Math.PI / 2.58;
    cameraControlsRef.current.maxPolarAngle = Math.PI / 2.24;
    cameraControlsRef.current.azimuthRotateSpeed = 1;
    cameraControlsRef.current.polarRotateSpeed = 1;
    cameraControlsRef.current.minAzimuthAngle = Math.PI / 25.8;
    cameraControlsRef.current.maxAzimuthAngle = Math.PI / 2.3;
    cameraControlsRef.current.dollyToCursor = false;

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };
  const handleExitClick = () => {
    setShowToggleButton(true); // για απόκρυψη button μέρα/νύχτα
    setShowHouse(false);
    if (onRequestNightDisposal) {
      onRequestNightDisposal();
    }
    if (meshRef.current && cameraControlsRef.current) {
      const meshWorldPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(meshWorldPosition);
      const frontDirection = new THREE.Vector3(0, -0.03, -1);
      const meshWorldQuaternion = new THREE.Quaternion();
      meshRef.current.getWorldQuaternion(meshWorldQuaternion);
      frontDirection.applyQuaternion(meshWorldQuaternion);
      const cameraDistance = 40;
      const xOffset = 34.5;
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
      cameraControlsRef.current.minDistance = 46;
      cameraControlsRef.current.maxDistance = 56;
      cameraControlsRef.current.minAzimuthAngle = Math.PI / 1115.8;
      cameraControlsRef.current.maxAzimuthAngle = Math.PI / 2.3;
    }
    cameraControlsRef.current.minPolarAngle = Math.PI / 2.58;
    cameraControlsRef.current.maxPolarAngle = Math.PI / 2.14;
    cameraControlsRef.current.azimuthRotateSpeed = 1;

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };

  const handleClickSide = () => {
    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
    setShowToggleButton(false);
    setFrameLoopMode("demand");
    if (cameraControlsRef.current) {
      const targetPosition = new THREE.Vector3(1.208, -0.8, -3.05);
      const lookAtTarget = new THREE.Vector3(1.24, -0.8, -2.989);
      cameraControlsRef.current.setLookAt(
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        lookAtTarget.x,
        lookAtTarget.y,
        lookAtTarget.z,
        true
      );
      cameraControlsRef.current.azimuthAngle = Math.PI;
      cameraControlsRef.current.update(true);
      cameraControlsRef.current.minDistance = 0;
      cameraControlsRef.current.maxDistance = 0.4;
      cameraControlsRef.current.azimuthRotateSpeed = 1;
      cameraControlsRef.current.dollyToCursor = true;
      cameraControlsRef.current.minAzimuthAngle = Math.PI / 1.2;
      cameraControlsRef.current.maxAzimuthAngle = Math.PI / 0.91;
      cameraControlsRef.current.minPolarAngle = Math.PI / 2.45;
      cameraControlsRef.current.maxPolarAngle = Math.PI / 1.85;
    }
  };

  const handleClickTrophies = () => {
    setShowToggleButton(false);
    if (cameraControlsRef.current) {
      const meshPosition = new THREE.Vector3(-4.02, 0.18, 0.35);
      const cameraOffset = new THREE.Vector3(3.05, 0.22, 0.15);
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
      if (prevMaxPolarAngle === null) {
        setPrevMaxPolarAngle(cameraControlsRef.current.maxPolarAngle);
      }
      cameraControlsRef.current.minDistance = 1.8;
      cameraControlsRef.current.maxDistance = 4.08;
      cameraControlsRef.current.dollySpeed = 0.2;
      cameraControlsRef.current.minPolarAngle = Math.PI / 2.4;
      cameraControlsRef.current.maxPolarAngle = Math.PI / 2;
      cameraControlsRef.current.minAzimuthAngle = Math.PI / 2.4;
      cameraControlsRef.current.maxAzimuthAngle = Math.PI / 2;
    }
    cameraControlsRef.current.dollyToCursor = true;

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };

  const handleClickNavigationGuide = () => {
    setShowToggleButton(false);
    if (!cameraControlsRef.current) return;
    const target = [-18.6, -0.11, 26.2];
    const radius = 1.0;
    const angleZ = Math.PI / 2;
    cameraControlsRef.current.minDistance = -0.5;
    cameraControlsRef.current.maxDistance = 3.5;
    const cameraX = target[0] + radius * Math.cos(angleZ);
    const cameraY = target[1] + radius * Math.sin(angleZ);
    const cameraZ = target[2] + 1.8;
    cameraControlsRef.current.polarRotateSpeed = 0;
    cameraControlsRef.current.azimuthRotateSpeed = 0;
    cameraControlsRef.current.dollyToCursor = true;
    cameraControlsRef.current.setLookAt(
      cameraX,
      cameraY,
      cameraZ,
      target[0],
      target[1],
      target[2],
      true
    );

    if (safeAudioPath) {
      const clickSound = new Audio(safeAudioPath);
      clickSound.volume = 0.5;
      clickSound.play().catch((err) => console.log("Sound play error:", err));
    }
  };

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
  const fontPath = "/fonts/bodoni-mt-bold-italic.ttf";

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation-x={-Math.PI / 2}>
        <ambientLight intensity={2.5} />
        / <primitive object={nodes.Hips} />
        {showHouse && (
          <Avatar
            animation="Typing"
            position={[0.15, 3.68, -0.035]}
            rotation={[0, 0, 0]}
          />
        )}
      </group>
      {!showHouse && (
        <Text
          font={fontPath}
          position={[22.1, 8.29, 28.04]}
          textAlign="center"
          scale={0.55}
          ref={meshRefInitial}
          rotation-y={0.35}
        >
          About Me
          <meshStandardMaterial color={"gray"} />
        </Text>
      )}
      {!showHouse && (
        <Text
          font={fontPath}
          position={[22.1, 6.29, 27.6]}
          textAlign="center"
          scale={0.5}
        >
          Projects
          <meshStandardMaterial color={"gray"} /> 
        </Text>
      )}
      {!showHouse && (
        <Text
          font={fontPath}
          position={[25.1, 5.52, 27.6]}
          textAlign="center"
          scale={0.35}
        >
          Wisdom Nook
          <meshStandardMaterial color={"gray"} />
        </Text>
      )}
      {!showHouse && (
        <Text
          font={fontPath}
          position={[25.1, 7.25, 27.6]}
          textAlign="center"
          scale={0.55}
        >
          Building <meshStandardMaterial color={"gray"} />
        </Text>
      )}
      {/* παρακάτω η επικάλυψη του βιβλίου */}
      <mesh
        ref={cubeRef}
        position={[-3.352, 1.08, -3.65]}
        visible={showCube}
        rotation={[0, 0, Math.PI / 2]}
      >
        <boxGeometry args={[0.01, 0.48, 0.32]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      {/* μέχρι εδώ η επικάλυψη του βιβλίου */}
      <Text
        font={fontPath}
        position={[25.1, 3.69, 27.6]}
        textAlign="center"
        scale={0.5}
        onClick={handleClick}
        ref={meshRefInitial}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        Office
        <meshStandardMaterial
          color={"white"}
          emissive={"white"}
          emissiveIntensity={2}
        />
      </Text>
      <Text
        font={fontPath}
        position={[22.2, 4.51, 28.06]}
        rotation-y={0.3}
        textAlign="center"
        scale={0.5}
        onClick={handleClickNavigationGuide}
        ref={meshRefInitial}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        Navigation
        <meshStandardMaterial
          color={"white"}
          emissive={"white"}
          emissiveIntensity={2}
        />
      </Text>
      {!showHouse && (
        <Text
          font={fontPath}
          position={[-19.483, 1.672, 25.82]}
          rotation={[-Math.PI / 4.8, 0, 0]}
          textAlign="center"
          scale={0.035}
          scale-y={0.05}
          onClick={handleExitClick}
          visible={true}
          color={"red"}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Exit
          <meshStandardMaterial color={"black"} />
        </Text>
      )}
      {!showHouse && (
        <Text
          font={fontPath}
          position={[-19.665, 1.102, 26.173]}
          rotation={[-Math.PI / 4.8, 0, 0.01]}
          textAlign="center"
          scale={0.035}
          scale-y={0.05}
          onClick={handleExitClick}
          visible={true}
          color={"red"}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Exit
          <meshStandardMaterial color={"black"} />
        </Text>
      )}
      <Text
        font={fontPath}
        position={[-9.29, 3.41, 3.98]}
        rotation={[-Math.PI / 64, 0, 0]}
        textAlign="center"
        scale={1.4}
        ref={meshRefInitial}
      >
        Mike Vernadakis
        <meshStandardMaterial
          color={"black"}
          emissive={"white"}
          emissiveIntensity={5}
        />
      </Text>
      <Text
        font={fontPath}
        position={[15.9, 0.3, 24.828]}
        rotation-x={-Math.PI / 64}
        textAlign="center"
        scale={0.9}
        ref={meshRefInitial}
      >
        Accountant by Day
        <meshStandardMaterial
          color={"black"}
          emissive={"white"}
          emissiveIntensity={5}
        />
      </Text>
      <Text
        font={fontPath}
        position={[5.501, 0.65, 0.05]}
        textAlign="center"
        scale={[0.3, 0.8, 0.35]}
        rotation={[0, Math.PI / 3, 0]}
        onClick={handleExitClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
        visible={false}
      >
        Exit
        <meshStandardMaterial
          color={"white"}
          emissive={"white"}
          emissiveIntensity={2}
        />
      </Text>
      {showHouse && (
        <Text
          font={fontPath}
          position={[5.501, 3.45, 0.05]}
          textAlign="center"
          scale={[0.3, 0.8, 0.35]}
          rotation={[0, Math.PI / 3, 0]}
          onClick={handleClickAboutMe}
          ref={meshRefInitial}
          toneMapped={false}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
          visible={false}
        >
          About me
          <meshStandardMaterial
            color={"white"}
            emissive={"white"}
            emissiveIntensity={2}
          />
        </Text>
      )}
      {showHouse && (
        <Text
          font={fontPath}
          position={[0.134, 1.02, -2.114]}
          textAlign="center"
          scale={0.02}
          onClick={handleExitAboutMeClick}
          toneMapped={false}
          anchorX="center"
          anchorY="middle"
          color={"white"}
          rotation={[0, (Math.PI / 2) * 90, 0]}
          visible={false}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Exit {/* Υπολογιστή */}
        </Text>
      )}
      <mesh ref={meshRef} rotation={[0, 0, 0]} visible={false}>
        <boxGeometry args={[8.2, 6.2, 0.18]} />
        <meshBasicMaterial color="blue" />
      </mesh>
      <CameraControls
        ref={cameraControlsRef}
        minDistance={32}
        maxDistance={92}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        truck={false}
      />
      {/* Μέχρι εδώ το button για το about me */}
      {/* Από εδώ το exit view στην Wisdom Nook */}(
      {showHouse && (
        <Text
          font={fontPath}
          position={[-3.684, 2.55, 0.46]}
          textAlign="center"
          scale={0.095}
          onClick={handleExitAboutMeClick}
          toneMapped={false}
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI / 2, 0]}
          color={"red"}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
          visible={false}
        >
          Exit View {/* Wisdom Nook */}
        </Text>
      )}
      ){/* Παρακάτω το button για τα Projects */}
      {showHouse && (
        <Text
          font={fontPath}
          position={[5.501, 2.47, 0.05]}
          textAlign="center"
          scale={[0.3, 0.8, 0.35]}
          rotation={[0, Math.PI / 3, 0]}
          onClick={handleClickSide}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
          visible={false}
        >
          Projects
          <meshStandardMaterial
            color={"white"}
            emissive={"white"}
            emissiveIntensity={2}
          />
        </Text>
      )}
      {showHouse && (
        <Text
          font={fontPath}
          position={[-3.27, 1.18, -3.9]}
          textAlign="center"
          rotation={[Math.PI / 2, Math.PI, (Math.PI / 2) * 3.02]}
          scale={0.13}
          onClick={handleExitAboutMeClick}
          toneMapped={false}
          visible={false}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Exit
        </Text>
      )}
      <mesh ref={meshRef} rotation={[0, 0, 0]} visible={false}>
        <boxGeometry args={[6.2, 4.5, 0.18]} />
        <meshBasicMaterial color="blue" />
      </mesh>
      {showHouse && (
        <Text
          font={fontPath}
          position={[5.501, 1.4, 0.05]}
          rotation={[0, Math.PI / 3, 0]}
          textAlign="center"
          scale={[0.3, 0.8, 0.35]}
          onClick={handleClickTrophies}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
          visible={false}
        >
          Wisdom Nook
          <meshStandardMaterial
            color={"white"}
            emissive={"white"}
            emissiveIntensity={2}
          />
        </Text>
      )}
      {showBook && <Book_accountant />}
      <AccPlaceKtx2 />
      {showHouse && <HouseAccountant />}
      {showHouse && <Scene />}
      <mesh ref={meshRef} rotation={[0, 0, 0]} visible={false}>
        <boxGeometry args={[30.5, 2, 1]} />
        <meshBasicMaterial color="blue" />
      </mesh>
      {!showHouse && <Building />}
      <PCAccountant />
      {showHouse && <Ink />}
      <BuildingsWhite />
      <Tree />
      <Bachelor />
      <Proficiency />
      <LogisthsAtaxhs />
      <Deutsch />
      <Master />
      <Arithmodeiktes />
      {showHouse && <FloatingTexts />}
    </group>
  );
}
