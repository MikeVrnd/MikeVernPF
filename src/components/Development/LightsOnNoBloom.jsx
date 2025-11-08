import { useRef, useState } from "react";
import HoverMesh from "./TheYoungerMe";
import { Html } from "@react-three/drei";
export default function LightsOnNoBloom() {
  // παρακάτω η λάμπα στο τραπεζάκι με το book
  function Lamp() {
    const [lightOn, setLightOn] = useState(false);
    const [hovered, setHovered] = useState(false);
    return (
      <>
        <pointLight
          ref={lightRef}
          position={[-1.05, 1.04, -2.38]}
          intensity={lightOn ? 0.3 : 0}
          angle={0.5} // Wider cone angle for horizontal spread
          penumbra={1.5} // Softer edges
          castShadow={true}
          color="white"
        />
        <mesh
          position={[-1.56, 1.04, -2.58]} // onClick={() => setLightOn(!lightOn)}
        >
            <sphereGeometry args={[0.03, 20, 20]} />  
          <meshStandardMaterial emissive={lightOn ? "yellow" : "black"} /> 
        </mesh>
        <mesh
          position={lightOn ? [-1.543, 0.56, -2.455] : [-1.543, 0.5685, -2.455]}
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
  } // παρακάτω η λάμπα στο desk με το pc
  function DeskLampNoBloom() {
    const [lightOn, setLightOn] = useState(false);
    const [hovered, setHovered] = useState(false);
    return (
      <>
        <mesh
          position={[0.94, 0.98, 0.65]}
          rotation={[1, 5, -Math.PI / 2]}
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
           
          {hovered && (
            <Html position={[0.3, 0.2, 0]}>
              <div
                style={{
                  width: lightOn ? 152 : 145,
                  color: "white",
                  background: "black",
                  padding: "10px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  textalign: "center",
                  fontFamily: "'Delius Swash Caps', cursive",
                }}
              >
                {lightOn ? "Switch  off the lamp" : "Switch  on the lamp"}
              </div>
                 
            </Html>
          )}
        </mesh>
        <directionalLight
          ref={lightRef}
          position={[5, 5, 5]}
          intensity={!lightOn ? 0.5 : 0}
          castShadow={true}
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          color="blue"
        />
      </>
    );
  }
  const lightRef = useRef();
  return (
    <>
      <HoverMesh />
      {/* <mesh position={[-3, 3.5, -3.5]}>
 <boxGeometry args={[0.22, 0.22, 0.22]} />
 <meshStandardMaterial emissive={"white"} />
 </mesh> */}
      <pointLight // 3ο ράφι 1ης σειράς
        ref={lightRef}
        position={[-3, 3.5, -2.5]} // Light source position
        angle={Math.PI / 2} // Wider cone angle for horizontal spread
        penumbra={1.5} // Softer edges
        intensity={5} // Brightness
        castShadow={true} // Enable shadows
        color="white"
      />
      {/* <mesh position={[2.2, 3.5, -3.5]}>
 <boxGeometry args={[0.22, 0.22, 0.22]} />
 <meshStandardMaterial emissive={"white"} />
 </mesh> */}
      <pointLight // 3ο ράφι 1ης σειράς
        ref={lightRef}
        position={[2.2, 3.5, -2.5]} // Light source position
        angle={Math.PI / 2} // Wider cone angle for horizontal spread
        penumbra={1.5} // Softer edges
        intensity={5} // Brightness
        castShadow={true} // Enable shadows
        color="white"
      />
      ΄
      {/* <mesh position={[-0.3, 3.5, -1.5]}>
 <boxGeometry args={[0.22, 0.22, 0.22]} />
 <meshStandardMaterial emissive={"white"} />
 </mesh> */}
      <pointLight // 3ο ράφι 1ης σειράς
        ref={lightRef}
        position={[-0.3, 3.5, -1.5]} // Light source position
        angle={Math.PI / 2} // Wider cone angle for horizontal spread
        penumbra={1.5} // Softer edges
        intensity={5} // Brightness
        castShadow={true} // Enable shadows
        color="white"
      />
      {/* <mesh position={[-3, 3.5, 0.2]}>
 <boxGeometry args={[0.22, 0.22, 0.22]} />
 <meshStandardMaterial emissive={"white"} />
 </mesh> */}
      <pointLight // 3ο ράφι 1ης σειράς
        ref={lightRef}
        position={[-3, 3.5, 0.2]} // Light source position
        angle={Math.PI / 2} // Wider cone angle for horizontal spread
        penumbra={1.5} // Softer edges
        intensity={5} // Brightness
        castShadow={true} // Enable shadows
        color="white"
      />
      {/* <mesh position={[2.2, 3.5, 0.2]}>
 <boxGeometry args={[0.22, 0.22, 0.22]} />
 <meshStandardMaterial emissive={"white"} />
 </mesh> */}
      <pointLight // 3ο ράφι 1ης σειράς
        ref={lightRef}
        position={[2.2, 3.5, 0.2]} // Light source position
        angle={Math.PI / 2} // Wider cone angle for horizontal spread
        penumbra={1.5} // Softer edges
        intensity={5} // Brightness
        castShadow={true} // Enable shadows
        color="white"
      />
      <Lamp />
      <group pointerEvents="none">
          <DeskLampNoBloom />
      </group>
         
    </>
  );
}
