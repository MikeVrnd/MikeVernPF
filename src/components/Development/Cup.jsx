import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { validateModelPath, validateAssetPath } from "../../utils/security";

function useShakeAndScale() {
  const [hovered, setHovered] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hovered) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [hovered]);

  const { scale } = useSpring({
    scale: hovered ? 1.95 : 0.072,
    config: { mass: 2, tension: 300, friction: 15 },
  });

  const { rotation } = useSpring({
    rotation: shake ? [0, -1.04, 0.5] : [0, -1.04, 0],
    config: { mass: 2, tension: 500, friction: 6 },
  });

  return {
    hovered,
    setHovered,
    scale,
    rotation,
  };
}

const modelPath = `${window.location.origin}/Objects/Final/Cup.glb`;
const audioPath = "/Doink.mp3";
const audioPathHover = "/hover.mp3";
const Cup = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF(modelPath);
  if (!validateModelPath(modelPath)) {
    return;
  }
  if (!validateAssetPath(audioPath)) {
    return;
  }
  if (!validateAssetPath(audioPathHover)) {
    return;
  }
  const { hovered, setHovered, scale, rotation } = useShakeAndScale();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <animated.group
        position={[-0.915, 0.78199, 0.715]}
        rotation={rotation}
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
          geometry={nodes.Cup003.geometry}
          material={materials["Materiais.002"]}
        />
        <mesh
          geometry={nodes.Cup003_1.geometry}
          material={materials["Material.049"]}
        />
      </animated.group>
    </group>
  );
});

function usePortraitAnimation() {
  const [hovered, setHovered] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hovered) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [hovered]);

  const { scale } = useSpring({
    scale: hovered ? [2.5, 2.8, 2.8] : [1, 1, 1],
    config: { mass: 2, tension: 300, friction: 15 },
  });

  const { position } = useSpring({
    position: hovered ? [-3.5, 2.0, -3.131] : [-4.387, 1.674, -3.131],
    config: { mass: 2, tension: 300, friction: 15 },
  });

  const { rotation } = useSpring({
    rotation: shake ? [0, -1.04, 0] : [0.05, -1.04, 0.05],
    config: { mass: 2, tension: 500, friction: 6 },
  });

  return {
    hovered,
    setHovered,
    scale,
    position,
    rotation,
  };
}

const modelPathPortrait = `${window.location.origin}/Objects/Final/PortraitMerged.glb`;
const Portrait = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF(modelPathPortrait);
  if (!validateModelPath(modelPathPortrait)) {
    console.error("Blocked unsafe 3D model:", modelPathPortrait);
    return null;
  }

  const { hovered, setHovered, scale, position, rotation } =
    usePortraitAnimation();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <animated.group
        position={position}
        rotation={[2.099, 0.001, 1.568]}
        scale={[0.22, 0.28, 0.22]}
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
        <animated.group scale={scale} rotation={rotation}>
          <mesh
            geometry={nodes.PortraitWife003.geometry}
            material={materials["Portrait.002"]}
          />
          <mesh
            geometry={nodes.PortraitWife003_1.geometry}
            material={materials["White_pages_of_book.002"]}
          />
          <mesh
            geometry={nodes.PortraitWife003_2.geometry}
            material={materials["Black.002"]}
          />
        </animated.group>
      </animated.group>
      {hovered && (
        <Html position={[-2, 3, 0]}>
          <div
            style={{
              width: 125,
              color: "white",
              background: "black",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "14px",
              textAlign: "center",
              fontFamily: "'Delius Swash Caps', cursive",
            }}
          >
            My pencil-drawn wife
          </div>
        </Html>
      )}
    </group>
  );
});

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

const modelPathDegrees = `${window.location.origin}/Objects/Final/Degrees.glb`;
const Bachelor = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF(modelPathDegrees);
  if (!validateModelPath(modelPathDegrees)) {
    console.error("Blocked unsafe 3D model:", modelPathDegrees);
    return null;
  }

  const { hovered, setHovered, scale } = useBachelorAnimation();
  const { playRemoteSound } = props;
  const hoverSoundRef = useRef(null);

  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[-4.389, 1.594, 0.35]}
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

                hoverSoundRef.current = new Audio(audioPathHover);
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
  const { nodes, materials } = useGLTF(modelPathDegrees);
  if (!validateModelPath(modelPathDegrees)) {
    console.error("Blocked unsafe 3D model:", modelPathDegrees);
    return null;
  }

  const { hovered, setHovered, scale } = useProficiencyAnimation();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[-4.348, 1.594, 0.847]}
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

                hoverSoundRef.current = new Audio(audioPathHover);
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
  const { nodes, materials } = useGLTF(modelPathDegrees);
  if (!validateModelPath(modelPathDegrees)) {
    console.error("Blocked unsafe 3D model:", modelPathDegrees);
    return null;
  }

  const { hovered, setHovered, scale } = useLogisthsAtaxhsAnimation();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[-4.421, 1.568, 1.006]}
        rotation={[0, 0, -1.352]}
        scale={[0.087, 0.45, 0.131]}
      >
        <animated.group
          scale={scale}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            hoverSoundRef.current = new Audio(audioPathHover);
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
  const { nodes, materials } = useGLTF(modelPathDegrees);
  if (!validateModelPath(modelPathDegrees)) {
    console.error("Blocked unsafe 3D model:", modelPathDegrees);
    return null;
  }
  const { hovered, setHovered, scale } = useDeutschAnimation();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[-4.421, 1.568, 1.006]}
        rotation={[0, 0, -1.352]}
        scale={[0.087, 0.45, 0.131]}
      >
        <animated.group
          scale={scale}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            hoverSoundRef.current = new Audio(audioPathHover);
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
  const { nodes, materials } = useGLTF(modelPathDegrees);
  if (!validateModelPath(modelPathDegrees)) {
    console.error("Blocked unsafe 3D model:", modelPathDegrees);
    return null;
  }
  const { hovered, setHovered, scale } = useMasterAnimation();
  const hoverSoundRef = useRef(null);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group
        position={[-4.421, 1.568, 1.006]}
        rotation={[0, 0, -1.352]}
        scale={[0.087, 0.45, 0.131]}
      >
        <animated.group
          scale={scale}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            hoverSoundRef.current = new Audio(audioPathHover);
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
          A
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

export {
  Cup,
  Portrait,
  Bachelor,
  Proficiency,
  LogisthsAtaxhs,
  Deutsch,
  Master,
};

useGLTF.preload(modelPath);
useGLTF.preload(modelPathPortrait);
useGLTF.preload(modelPathDegrees);
