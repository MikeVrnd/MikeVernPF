import { useEffect, useRef, useState } from "react";
import HoverMesh from "./TheYoungerMe";
import { Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
export default function LightsOffBloom() {
  function Lamp() {
    const [lightOn, setLightOn] = useState(true);
    const [hovered, setHovered] = useState(false);
    return (
      <>
        <pointLight
          ref={lightRef}
          position={[-1.05, 2, -2.38]}
          intensity={lightOn ? 4.5 : 0}
          angle={0.5}
          penumbra={1.5}
          castShadow={false}
          color="white"
        />
        <mesh position={[-1.56, 1.016, -2.61]}>
          <sphereGeometry args={[0.03, 20, 20]} />
          <meshStandardMaterial emissive={lightOn ? "yellow" : "black"} />
        </mesh>
        <mesh
          position={lightOn ? [-1.543, 0.54, -2.455] : [-1.543, 0.5485, -2.455]} //εδώ η θέση της λάμπας στο τραπεζάκι
          onClick={() => setLightOn(!lightOn)}
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "default";
          }}
        >
          <boxGeometry args={[0.0294, 0.02, 0.072]} />
          {hovered && (
            <Html position={[0.1, 0.1, 0.18]}>
              <div
                style={{
                  width: lightOn ? 140 : 135,
                  color: lightOn ? "black" : "white",
                  background: lightOn ? "white" : "black",
                  padding: "10px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  textalign: "center",
                  fontFamily: "'Delius Swash Caps', cursive",
                }}
              >
                {lightOn ? "Turn the light off" : "Turn the light on"}
              </div>
            </Html>
          )}
        </mesh>
      </>
    );
  }
  function DeskLamp() {
    const [lightOn, setLightOn] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [shake, setShake] = useState(false);
    useEffect(() => {
      const interval = setInterval(() => {
        if (!lightOn && !hovered) {
          setShake(true);
          setTimeout(() => setShake(false), 500);
        }
      }, 2000);
      return () => clearInterval(interval);
    }, [lightOn, hovered]);
    const { rotation } = useSpring({
      rotation: shake ? [1, 5, -Math.PI / 2 + 0.1] : [1, 5, -Math.PI / 2],
      config: { mass: 1, tension: 500, friction: 10 },
    });
    return (
      <>
        <animated.mesh
          position={[0.94, 1, 0.65]}
          rotation={rotation}
          onClick={() => setLightOn(!lightOn)}
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "default";
          }}
        >
          <boxGeometry args={[0.199, 0.199, 0.199]} />
          <meshStandardMaterial
            color="white"
            emissive={!lightOn ? "white" : "black"}
          />
        </animated.mesh>
      </>
    );
  }
  const lightRef = useRef();

  return (
    <>
      <HoverMesh />
      <group>
        <mesh position={[-4.38, 2.7, -2]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.02, 0.02, 5.5, 4]} />
          <meshBasicMaterial color={"purple"} />
        </mesh>
        <rectAreaLight
          position={[-4.38, 2.4, -2]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          width={0.22}
          height={5.9}
          intensity={100}
          color={"purple"}
        />
        <mesh
          position={[-0.8, 2.58, -5.0]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.02, 0.02, 6, 4]} />
          <meshBasicMaterial color={"purple"} />
        </mesh>
        <rectAreaLight
          position={[-0.8, 2.48, -5.0]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          width={0.22}
          height={5.9}
          intensity={100}
          color={"purple"}
        />
        <rectAreaLight
          position={[-0.6, 0.25, -5.05]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          width={0.5}
          height={5.9}
          intensity={100}
          color={"blue"}
        />
        <Lamp />
        <DeskLamp />
      </group>
    </>
  );
}
