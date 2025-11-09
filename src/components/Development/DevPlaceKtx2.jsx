import React from "react";
import { useGLTF } from "@react-three/drei";
import { validateModelPath } from "../../utils/security";
const modelPath =
  "https://mike-vern-pf.vercel.app/Objects/Final/DevPlaceMergedFinalWithoutFramesBetterPillowsWithoutPortrait.glb";
export default function DevPlaceKtx2(props) {
  if (!validateModelPath(modelPath)) {
    console.error("Blocked unsafe 3D model:", modelPath);
    return null;
  }

  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.TVStand.geometry}
        material={materials["Black.004"]}
        position={[2.938, 1.176, -2.9]}
        scale={[0.028, 1.12, 1.406]}
      />
      <group position={[-1.08, -0.318, -2.42]} scale={[1.007, 0.264, 0.429]}>
        <mesh
          geometry={nodes.Cube122.geometry}
          material={materials["KvantikiIperoxi_side.006"]}
        />
        <mesh
          geometry={nodes.Cube122_1.geometry}
          material={materials["Black.004"]}
        />
        <mesh
          geometry={nodes.Cube122_2.geometry}
          material={materials["LightWhite.003"]}
        />
        <mesh
          geometry={nodes.Cube122_3.geometry}
          material={materials["autumn_fireplace_decor_Material .003"]}
        />
        <mesh
          geometry={nodes.Cube122_4.geometry}
          material={materials["Soft_Modular_Sofa_Stand.003"]}
        />
      </group>
      <group
        position={[-0.28, 1.011, 0.901]}
        rotation={[Math.PI / 2, 0, -2.806]}
      >
        <mesh
          geometry={nodes.React_Monitor2006.geometry}
          material={materials["LightBlack.004"]}
        />
        <mesh
          geometry={nodes.React_Monitor2006_1.geometry}
          material={materials["DarkBlue.003"]}
        />
      </group>
      <mesh
        geometry={nodes.Plane004.geometry}
        material={materials["Keyboard.003"]}
        position={[0.053, 0.792, 0.616]}
        rotation={[-Math.PI, 0.019, -Math.PI]}
        scale={[0.376, 0.127, 0.127]}
      />
      <group position={[-4.21, 0.97, -0.582]} scale={0.059}>
        <mesh
          geometry={nodes.Plane067.geometry}
          material={materials["Dust.003"]}
        />
        <mesh
          geometry={nodes.Plane067_1.geometry}
          material={materials["blade.003"]}
        />
        <mesh
          geometry={nodes.Plane067_2.geometry}
          material={materials["Yellow.003"]}
        />
      </group>
      <group position={[7.028, 0.75, -8.064]} scale={0.635}>
        <mesh
          geometry={nodes.Cube123.geometry}
          material={materials["LightBlack.004"]}
        />
        <mesh
          geometry={nodes.Cube123_1.geometry}
          material={materials["Brown.003"]}
        />
        <mesh
          geometry={nodes.Cube123_2.geometry}
          material={materials["Black.004"]}
        />
        <mesh
          geometry={nodes.Cube123_3.geometry}
          material={materials["SceneNavigationGuidelines.003"]}
        />
      </group>
      <group
        position={[-4.438, 1.992, 0.21]}
        rotation={[0, 1.57, 0]}
        scale={[0.173, 0.06, 0.01]}
      >
        <mesh
          geometry={nodes.Cube124.geometry}
          material={materials["ExitSign.003"]}
        />
        <mesh
          geometry={nodes.Cube124_1.geometry}
          material={materials["Black.004"]}
        />
      </group>
      <mesh
        geometry={nodes.DeskLampBase001.geometry}
        material={materials["Beige.003"]}
        position={[1.086, 0.836, 0.64]}
      />
      <group
        position={[-4.254, 0.39, 0.608]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.155, 0.155, 0.197]}
      >
        <mesh
          geometry={nodes.Cube125.geometry}
          material={materials["Soft_Modular_Sofa_Cream_Iroko2.003"]}
        />
        <mesh
          geometry={nodes.Cube125_1.geometry}
          material={materials["Black.004"]}
        />
        <mesh
          geometry={nodes.Cube125_2.geometry}
          material={materials["lightBlack.005"]}
        />
      </group>
      <group position={[23.582, -0.099, 27.346]} scale={[0.899, 0.112, 0.544]}>
        <mesh
          geometry={nodes.Cube126.geometry}
          material={materials["DarkBlue.003"]}
        />
        <mesh
          geometry={nodes.Cube126_1.geometry}
          material={materials["LightWhite.003"]}
        />
        <mesh
          geometry={nodes.Cube126_2.geometry}
          material={materials["PinkNeon.003"]}
        />
        <mesh
          geometry={nodes.Cube126_3.geometry}
          material={materials["WhiteNeon.003"]}
        />
        <mesh
          geometry={nodes.Cube126_4.geometry}
          material={materials["GreenNeon.003"]}
        />
        <mesh
          geometry={nodes.Cube126_5.geometry}
          material={materials["BlueNeon.003"]}
        />
      </group>
      <mesh
        geometry={nodes.WallWithWindow.geometry}
        material={materials["sciany_wew_farba.003"]}
        position={[-0.655, 1.436, -4.614]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[3.884, 1, 1.353]}
      />
      <mesh
        geometry={nodes.BlueWall.geometry}
        material={materials["Blue.003"]}
        position={[-0.613, 1.42, -5.08]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[3.917, 1.151, 1.365]}
      />
      <mesh
        geometry={nodes.Object_12002.geometry}
        material={materials["floor.003"]}
        position={[-0.675, -0.055, -1.892]}
        scale={0.885}
      />
      <mesh
        geometry={nodes.Window.geometry}
        material={materials["okno_grafit.003"]}
        position={[1.276, 0.891, -5.057]}
        rotation={[0, 0, -Math.PI]}
        scale={[0.842, 0.816, 0.842]}
      />
      <mesh
        geometry={nodes.Object_52001.geometry}
        material={materials["metal_czarny_1000000.003"]}
        position={[-4.515, 1.098, -1.348]}
        rotation={[0, 0, -Math.PI]}
        scale={[0.551, 0.823, 0.778]}
      />
      <mesh
        geometry={nodes.Object_10004.geometry}
        material={materials["Blue.003"]}
        position={[-0.774, -0.359, -4.539]}
        rotation={[0, 0, 3.141]}
        scale={0.842}
      />
      <mesh
        geometry={nodes.Object_10005.geometry}
        material={materials["Blue.003"]}
        position={[0.843, 0.342, -0.244]}
        scale={0.842}
      />
      <mesh
        geometry={nodes.Object_10006.geometry}
        material={materials["Blue.003"]}
        position={[0.435, 0.344, 4.95]}
        scale={0.842}
      />
      <group position={[-4.553, 1.198, -1.759]} scale={[0.672, 0.796, 0.839]}>
        <mesh
          geometry={nodes.Object_3020.geometry}
          material={materials["Blue.003"]}
        />
        <mesh
          geometry={nodes.Object_3020_1.geometry}
          material={materials["zew_beton_krawezniki.003"]}
        />
      </group>
      <group
        position={[-0.28, 1.026, 0.901]}
        rotation={[Math.PI / 2, 0, -2.806]}
        scale={1.079}
      >
        <mesh
          geometry={nodes.React_Monitor2007.geometry}
          material={materials["React_Monitor2.004"]}
        />
        <mesh
          geometry={nodes.React_Monitor2007_1.geometry}
          material={materials["House_Props_Diffuse.003"]}
        />
        <mesh
          geometry={nodes.React_Monitor2007_2.geometry}
          material={materials["React.003"]}
        />
      </group>
      <group
        position={[-0.28, 0.964, 0.901]}
        rotation={[Math.PI / 2, 0, -2.806]}
      >
        <mesh
          geometry={nodes.React_Monitor2008.geometry}
          material={materials["House_Props_Diffuse.003"]}
        />
        <mesh
          geometry={nodes.React_Monitor2008_1.geometry}
          material={materials["Yellow.003"]}
        />
      </group>
      <group position={[-2.804, 0.504, -4.826]} scale={[1.63, 0.416, 0.105]}>
        <mesh
          geometry={nodes.Cube127.geometry}
          material={materials["Soft_Modular_Sofa_Cream_Iroko.007"]}
        />
        <mesh
          geometry={nodes.Cube127_1.geometry}
          material={materials["Soft_Modular_Sofa_Cream_Iroko.008"]}
        />
      </group>
      <mesh
        geometry={nodes.Rug.geometry}
        material={materials["Rug_res.003"]}
        position={[-0.427, 0.062, -1.692]}
        scale={[2.464, 0.01, 1.961]}
      />
      <group
        position={[0.024, 0.077, -0.033]}
        rotation={[-Math.PI, 1.56, -Math.PI]}
      >
        <mesh
          geometry={nodes.Cylinder015_ChairWheels_0004.geometry}
          material={materials["Black.007"]}
        />
        <mesh
          geometry={nodes.Cylinder015_ChairWheels_0004_1.geometry}
          material={materials["lightBlack.006"]}
        />
        <mesh
          geometry={nodes.Cylinder015_ChairWheels_0004_2.geometry}
          material={materials["ChairFrame.004"]}
        />
      </group>
      <mesh
        geometry={nodes.TV_TV_0002.geometry}
        material={materials["lightBlack.007"]}
        position={[2.899, 0.469, -2.867]}
        rotation={[-1.571, 0, -1.577]}
        scale={2.35}
      />
    </group>
  );
}

useGLTF.preload(modelPath);
