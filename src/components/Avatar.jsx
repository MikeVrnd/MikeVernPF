// Avatar.js
// import React, { useEffect, useRef, useState } from "react";
// import { useGraph } from "@react-three/fiber";
// import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
// import { SkeletonUtils } from "three-stdlib";
// import {
//   Bloom,
//   EffectComposer,
//   ToneMapping,
// } from "@react-three/postprocessing";

// export default function Avatar(props) {
//   const { scene } = useGLTF("Objects/Final/avatar.glb");
//   const group = useRef();
//   const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
//   const { nodes, materials } = useGraph(clone);
//   const { animations: walkingAnim } = useFBX("animations/Typing.fbx");
//   walkingAnim[0].name = "WalkingMike";
//   const { actions } = useAnimations(walkingAnim, group);

//   useEffect(() => {
//     actions["WalkingMike"].reset().play();
//   }, []);

//   return (
//     <group {...props} ref={group} dispose={null}>
//       {/* <group position={[-0.6, 3.5, 0.1]}> */}
//       <EffectComposer disableNormalPass>
//         <Bloom
//           luminanceThreshold={0.9}
//           luminanceSmoothing={0.025}
//           mipmapBlur
//           luminanceThreshold={1}
//         />
//         <ToneMapping />
//       </EffectComposer>
//       {/* το συγκεκριμένο το έβαλα γιατί δεν ήταν σωστή η θέση του avatar*/}
//       <primitive object={nodes.Hips} />
//       <skinnedMesh
//         geometry={nodes.Wolf3D_Glasses.geometry}
//         material={materials.Wolf3D_Glasses}
//         skeleton={nodes.Wolf3D_Glasses.skeleton}
//       />
//       <skinnedMesh
//         geometry={nodes.Wolf3D_Outfit_Top.geometry}
//         material={materials.Wolf3D_Outfit_Top}
//         skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
//       />
//       <skinnedMesh
//         geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
//         material={materials.Wolf3D_Outfit_Bottom}
//         skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
//       />
//       <skinnedMesh
//         geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
//         material={materials.Wolf3D_Outfit_Footwear}
//         skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
//       />
//       <skinnedMesh
//         geometry={nodes.Wolf3D_Body.geometry}
//         material={materials.Wolf3D_Body}
//         skeleton={nodes.Wolf3D_Body.skeleton}
//       />
//       <skinnedMesh
//         name="EyeLeft"
//         geometry={nodes.EyeLeft.geometry}
//         material={materials.Wolf3D_Eye}
//         skeleton={nodes.EyeLeft.skeleton}
//         morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
//         morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
//       />
//       <skinnedMesh
//         name="EyeRight"
//         geometry={nodes.EyeRight.geometry}
//         material={materials.Wolf3D_Eye}
//         skeleton={nodes.EyeRight.skeleton}
//         morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
//         morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
//       />
//       <skinnedMesh
//         name="Wolf3D_Head"
//         geometry={nodes.Wolf3D_Head.geometry}
//         material={materials.Wolf3D_Skin}
//         skeleton={nodes.Wolf3D_Head.skeleton}
//         morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
//         morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
//       />
//       <skinnedMesh
//         name="Wolf3D_Teeth"
//         geometry={nodes.Wolf3D_Teeth.geometry}
//         material={materials.Wolf3D_Teeth}
//         skeleton={nodes.Wolf3D_Teeth.skeleton}
//         morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
//         morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
//       />
//     </group>
//     // </group>
//   );
// }

// useGLTF.preload("./Objects/Final/avatar.glb");

// 2ος κώδικας
import React, { useEffect, useRef } from "react";
import { useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { validateAnimationPath, validateModelPath } from "../utils/security";

const modelPath = "Objects/Final/avatar.glb";
export default function Avatar(props) {
  const group = useRef();
  // const { scene } = useGLTF("Objects/Final/avatar.glb");
  const { scene } = useGLTF(modelPath);

  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe model path:", modelPath);
    return null;
  }

  const animPath = "animations/Typing.fbx";

  if (!validateAnimationPath(animPath)) {
    console.error("Blocked unsafe animation path");
    return null;
  }

  const { animations: typingAnimation } = useFBX(animPath);

  typingAnimation[0].name = "Typing";
  typingAnimation.forEach((clip) => {
    clip.tracks = clip.tracks.filter(
      (track) => !track.name.includes("Armature.quaternion")
    );
    clip.name = "Typing"; // Rename for useAnimations
  });
  const { actions } = useAnimations(typingAnimation, group);
  useEffect(() => {
    actions["Typing"].reset().play();
  }, []);

  // Safely rename the animation
  // useEffect(() => {
  //   if (walkingAnim && typingAnimation[0]) {
  //     walkingAnim[0].name = "WalkingMike";
  //   }
  // }, [walkingAnim]);

  // useEffect(() => {
  //   const action = actions["WalkingMike"];
  //   if (action) {
  //     action.reset().play();
  //   }
  // }, [actions]);

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

if (validateModelPath(modelPath)) {
  useGLTF.preload(modelPath);
}
