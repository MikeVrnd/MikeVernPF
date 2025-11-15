import React, { useState, useEffect, forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { validateAssetPath, validateModelPath } from "../utils/security";

function useBachelorAnimation() {
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.05 : 1,
    config: { mass: 2, tension: 300, friction: 15 },
  });

  return {
    hovered,
    setHovered,
    scale,
  };
}

function useProficiencyAnimation() {
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 0.75 : 0.7,
    config: { mass: 2, tension: 300, friction: 15 },
  });

  return {
    hovered,
    setHovered,
    scale,
  };
}

function useLogisthsAtaxhsAnimation() {
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.02 : 1,
    config: { mass: 2, tension: 300, friction: 15 },
  });

  return {
    hovered,
    setHovered,
    scale,
  };
}

function useDeutschAnimation() {
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.05 : 1,
    config: { mass: 2, tension: 300, friction: 15 },
  });

  return {
    hovered,
    setHovered,
    scale,
  };
}
function useMasterAnimation() {
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.03 : 1,
    config: { mass: 2, tension: 300, friction: 15 },
  });
  const { position } = useSpring({
    position: hovered ? [0, 0.2, 0] : [0, 0, 0],
    config: { mass: 2, tension: 300, friction: 15 },
  });

  return {
    hovered,
    setHovered,
    scale,
    position,
  };
}
const modelPath = `${window.location.origin}/Objects/Final/Degrees.glb`;
const audioPath = "/hover.mp3";
const Bachelor = forwardRef((props, ref) => {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }
  if (!validateAssetPath(audioPath)) {
    console.error("Blocked unsafe audio path:", audioPath);
    return null;
  }
  const { nodes, materials } = useGLTF(modelPath);
  const { hovered, setHovered, scale } = useBachelorAnimation();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[-3.6499, 2.17, 0.6]}
        rotation={[-Math.PI / 2, 1.352, 0]}
        scale={[0.102, 0.192, 0.453]}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, -0.072, 0]}>
            <animated.group
              position={[-0.193, 0.01, -0.658]}
              scale={scale}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                hoverSoundRef.current = new Audio(audioPath);
                hoverSoundRef.current.volume = 0.5;
                hoverSoundRef.current
                  .play()
                  .catch((err) => console.log("Sound play error:", err));
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(false);
                if (hoverSoundRef.current) {
                  hoverSoundRef.current.pause();
                  hoverSoundRef.current.currentTime = 0;
                  hoverSoundRef.current = null;
                }
              }}
            >
              <mesh
                geometry={nodes.Object_1008.geometry}
                material={materials["Bachelor.002"]}
              />
              <mesh
                geometry={nodes.Object_1008_1.geometry}
                material={materials["material_0.003"]}
              />
              <mesh
                geometry={nodes.Object_1008_2.geometry}
                material={materials["LightBlack.004"]}
              />
            </animated.group>
          </group>
        </group>
      </group>
    </group>
  );
});

const Proficiency = forwardRef((props, ref) => {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }
  if (!validateAssetPath(audioPath)) {
    console.error("Blocked unsafe audio path:", audioPath);
    return null;
  }
  const { nodes, materials } = useGLTF(modelPath);
  const { hovered, setHovered, scale } = useProficiencyAnimation();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[-3.599, 2.166, 1.07]}
        rotation={[-Math.PI / 2, 1.352, 0]}
        scale={[0.102, 0.192, 0.453]}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, -0.072, 0]}>
            <animated.group
              position={[0.361, -0.005, -1.122]}
              scale={scale}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                hoverSoundRef.current = new Audio(audioPath);
                hoverSoundRef.current.volume = 0.5;
                hoverSoundRef.current
                  .play()
                  .catch((err) => console.log("Sound play error:", err));
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(false);
                if (hoverSoundRef.current) {
                  hoverSoundRef.current.pause();
                  hoverSoundRef.current.currentTime = 0;
                  hoverSoundRef.current = null;
                }
              }}
            >
              <mesh
                geometry={nodes.Object_1009.geometry}
                material={materials["Profficiency.002"]}
              />
              <mesh
                geometry={nodes.Object_1009_1.geometry}
                material={materials["material_0.003"]}
              />
              <mesh
                geometry={nodes.Object_1009_2.geometry}
                material={materials["LightBlack.004"]}
              />
            </animated.group>
          </group>
        </group>
      </group>
    </group>
  );
});

const LogisthsAtaxhs = forwardRef((props, ref) => {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }
  if (!validateAssetPath(audioPath)) {
    console.error("Blocked unsafe audio path:", audioPath);
    return null;
  }
  const { nodes, materials } = useGLTF(modelPath);
  const { hovered, setHovered, scale } = useLogisthsAtaxhsAnimation();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[-3.6799, 2.15, 1.256]}
        rotation={[0, 0, -1.352]}
        scale={[0.087, 0.45, 0.131]}
      >
        <animated.group
          scale={scale}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            hoverSoundRef.current = new Audio(audioPath);
            hoverSoundRef.current.volume = 0.5;
            hoverSoundRef.current
              .play()
              .catch((err) => console.log("Sound play error:", err));
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            hoverSoundRef.current = new Audio(audioPath);
            hoverSoundRef.current.volume = 0.5;
            hoverSoundRef.current
              .play()
              .catch((err) => console.log("Sound play error:", err));
          }}
        >
          <mesh
            geometry={nodes.Object_2003.geometry}
            material={materials["LightBlack.004"]}
          />
          <mesh
            geometry={nodes.Object_2003_1.geometry}
            material={materials["material_0.004"]}
          />
          <mesh
            geometry={nodes.Object_2003_2.geometry}
            material={materials["LogisthsAtaxhs.002"]}
          />
        </animated.group>
      </group>
    </group>
  );
});

const Deutsch = forwardRef((props, ref) => {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }
  if (!validateAssetPath(audioPath)) {
    console.error("Blocked unsafe audio path:", audioPath);
    return null;
  }
  const { nodes, materials } = useGLTF(modelPath);
  const { hovered, setHovered, scale } = useDeutschAnimation();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[-3.696, 2.15, 1.206]}
        rotation={[0, 0, -1.352]}
        scale={[0.087, 0.45, 0.131]}
      >
        <animated.group
          scale={scale}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            hoverSoundRef.current = new Audio(audioPath);
            hoverSoundRef.current.volume = 0.5;
            hoverSoundRef.current
              .play()
              .catch((err) => console.log("Sound play error:", err));
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            if (hoverSoundRef.current) {
              hoverSoundRef.current.pause();
              hoverSoundRef.current.currentTime = 0;
              hoverSoundRef.current = null;
            }
          }}
        >
          <mesh
            geometry={nodes.Object_2001.geometry}
            material={materials["material_0.003"]}
          />
          <mesh
            geometry={nodes.Object_2001_1.geometry}
            material={materials["LightBlack.004"]}
          />
          <mesh
            geometry={nodes.Object_2001_2.geometry}
            material={materials["Deutch_res.002"]}
          />
        </animated.group>
      </group>
    </group>
  );
});

const Master = forwardRef((props, ref) => {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }
  if (!validateAssetPath(audioPath)) {
    console.error("Blocked unsafe audio path:", audioPath);
    return null;
  }
  const { nodes, materials } = useGLTF(modelPath);
  const { hovered, setHovered, scale } = useMasterAnimation();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[-3.69, 2.148, 1.26]}
        rotation={[0, 0, -1.352]}
        scale={[0.087, 0.45, 0.131]}
      >
        <animated.group
          scale={scale}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            hoverSoundRef.current = new Audio(audioPath);
            hoverSoundRef.current.volume = 0.5;
            hoverSoundRef.current
              .play()
              .catch((err) => console.log("Sound play error:", err));
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            if (hoverSoundRef.current) {
              hoverSoundRef.current.pause();
              hoverSoundRef.current.currentTime = 0;
              hoverSoundRef.current = null;
            }
          }}
        >
          <mesh
            geometry={nodes.Object_2006.geometry}
            material={materials["LightBlack.004"]}
          />
          <mesh
            geometry={nodes.Object_2006_1.geometry}
            material={materials["Master.002"]}
          />
        </animated.group>
      </group>
    </group>
  );
});

export { Bachelor, Proficiency, LogisthsAtaxhs, Deutsch, Master };
useGLTF.preload(modelPath);
