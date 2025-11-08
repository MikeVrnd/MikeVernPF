// import { Html } from "@react-three/drei"; // Import Html for displaying HTML text
// import { Suspense, useState } from "react";
// import BackgroundPlane from "./BackgroundPlane";
// import Avatar_acc_place from "./Accounting/Avatar_acc_place";
// // import Avatar_dev_place from "./Development_rev/Avatar_acc_place"; // here is the line that loads accountant place
// import Avatar_dev_place from "./Development/Avatar_dev_place";
// import { useThree } from "@react-three/fiber";
// import { Torus } from "lucide-react";
// export const Experience = ({ isDay }) => {
//   const [showScene, setShowScene] = useState(false);
//   const [hovered, setHovered] = useState(false); // State to track hover
//   const { viewport } = useThree();
//   // Plane size will scale with viewport
//   const planeWidth = viewport.width * 0.2; // 10% of viewport width
//   const planeHeight = viewport.height * 0.3;
//   return (
//     <>
//       {!showScene && (
//         <>
//           {/* <BackgroundPlane
//             image={isDay ? "/textures/Env.jpg" : "/textures/Env_Dev.jpg"}
//           /> */}
//           {/* Optional interaction box to trigger scene */}
//           {/* <mesh
//             position={[0, 0, 0]}
//             visible={true} // hidden, but still clickable
//             color="grey"
//           >
//             <planeGeometry args={[10, 10]} />
//             <meshBasicMaterial transparent opacity={0} />
//           </mesh> */}
//           {/* Visible plane that responds to hover and click */}
//           <mesh
//             position={[0, 0, 0]}
//             onClick={() => setShowScene(true)}
//             onPointerOver={() => setHovered(true)} // Hovering
//             onPointerOut={() => setHovered(false)} // Exiting hover
//             visible={false}
//             color="blue" // Visible for hover interaction
//           >
//             <planeGeometry args={[planeWidth, planeHeight]} />
//             <meshBasicMaterial transparent opacity={0} />{" "}
//             {/* Transparent material color={"blue"} transparent opacity={0}*/}
//             {/* Conditionally show HTML when hovered */}
//             {hovered && (
//               <Html
//                 center
//                 position={[0.6, 1, 0]} // Move the HTML to the right of the plane
//               >
//                 <div
//                   style={{
//                     background: "black",
//                     width: 90,
//                     color: "white",
//                     padding: "6px 12px",
//                     borderRadius: "8px",
//                     fontSize: "16px",
//                     fontFamily: "sans-serif",
//                     cursor: "pointer", // Change cursor to pointer
//                     userSelect: "none",
//                     pointerEvents: "auto",
//                     position: "absolute", // Position it perfectly on the right
//                     left: "100%", // Align it to the right of the mesh
//                     top: "50%", // Center it vertically
//                     transform: "translateY(-50%)", // Offset to keep it vertically centered
//                   }}
//                 >
//                   Click me
//                 </div>
//               </Html>
//             )}
//           </mesh>
//         </>
//       )}
//       {showScene && (
//         <>
//           {isDay ? (
//             <Suspense fallback={null}>
//               {/* <Loader /> */}
//               <Avatar_acc_place />
//             </Suspense>
//           ) : (
//             <Suspense fallback={null}>
//               {/* <Loader /> */}
//               <Avatar_dev_place />
//             </Suspense>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// 2ος κώδικας
import React, { useEffect, useRef } from "react";
import { CameraControls, Environment, OrbitControls } from "@react-three/drei";
import Avatar_accountant from "./Accounting/Avatar_accountant";
import Avatar_developer from "./Development/Avatar_developer";
import Scene from "./Development/Scene";
import { ContactShadows } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import { Controls } from "three";
import Avatar_acc_place from "./Accounting/Avatar_acc_place";
import Avatar_dev_place from "./Development/Avatar_dev_place";

export const Experience = ({ isDay, isMobile, setShowToggleButton }) => {
  const controls = useRef(null);
  const meshCamera = useRef();

  const intro = async () => {
    if (!controls.current) return;
    controls.current.dolly(-40);
    controls.current.smoothTime = 1.1;
    fitCamera();
  };

  const fitCamera = async () => {
    controls.current.fitToBox(meshCamera.current, true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      intro();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", fitCamera);
    return () => window.removeEventListener("resize", fitCamera);
  }, []);

  return (
    <>
      <CameraControls
        ref={controls}
        minDistance={22}
        maxDistance={28}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.4}
      />
      <mesh ref={meshCamera} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <boxGeometry args={[30.5, 2, 1]} />
        <meshBasicMaterial color="blue" transparent opacity={0.5} />
      </mesh>
      <group position={[1, -2, 0]}>
        {isDay ? (
          <Avatar_acc_place
            isMobile={isMobile}
            setShowToggleButton={setShowToggleButton}
          />
        ) : (
          <Avatar_dev_place
            isMobile={isMobile}
            setShowToggleButton={setShowToggleButton}
          />
        )}
      </group>
    </>
  );
};
