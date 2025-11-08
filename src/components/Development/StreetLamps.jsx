import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

const LampGroups = [
  {
    groupPosition: [-22, 0, 4],
    groupRotation: [0, Math.PI / 2, 0],
    lamps: [
      { position: [-5.7, 0.2, 5.6], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [-2.5, 0.2, 3.8], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [1.2, 0.2, 2.8], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [5.1, 0.2, 2.8], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [8.7, 0.2, 3.6], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [12.1, 0.2, 4.9], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [15.2, 0.2, 7.0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    ],
  },
  {
    groupPosition: [-5, 0, 4],
    groupRotation: [0, Math.PI / 2, 0],
    lamps: [
      { position: [-20.5, 0.18, 8.2], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [-11.5, 0.18, 11.6], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [-2.2, 0.18, 14.5], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [-1.9, 0.18, 9.2], rotation: [0, 0, 0], scale: [1, 1, 1] },
    ],
  },
  {
    groupPosition: [-7, 0, 17],
    groupRotation: [0, Math.PI / 2, 0],
    lamps: [
      { position: [15.5, 0.18, 14], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [15.5, 0.18, 23.2], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [4.2, 0.18, 20.0], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { position: [-2.8, 0.18, 16.8], rotation: [0, 0, 0], scale: [1, 1, 1] },
    ],
  },
];

const InstancedMeshGroup = ({ data, geometry, material }) => {
  const meshRef = useRef();
  useEffect(() => {
    if (!meshRef.current) return;
    const matrix = new THREE.Matrix4();
    data.forEach((item, i) => {
      matrix.compose(
        new THREE.Vector3(...item.position),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(...item.rotation)),
        new THREE.Vector3(...item.scale)
      );
      meshRef.current.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [data]);
  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, data.length]}
      frustumCulled={false}
    />
  );
};

export default function StreetLamps(props) {
  const geometry = useMemo(() => new THREE.SphereGeometry(0.3, 50, 50), []);
  const geometrySquare = useMemo(
    () => new THREE.BoxGeometry(0.3, 0.3, 0.3),
    []
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        emissive: new THREE.Color("#f9f91f"),
        emissiveIntensity: 3,
      }),
    []
  );

  const baseMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d3cdcd" }),
    []
  );

  return (
    <>
      {LampGroups.map((group, index) => (
        <group
          key={index}
          {...props}
          position={group.groupPosition}
          rotation={group.groupRotation}
        >
          <InstancedMeshGroup
            data={group.lamps}
            geometry={geometry}
            material={material}
          />
          <InstancedMeshGroup
            data={group.lamps.map((lamp) => ({
              ...lamp,
              position: [
                lamp.position[0],
                lamp.position[1] - 0.15,
                lamp.position[2],
              ],
            }))}
            geometry={geometrySquare}
            material={baseMaterial}
          />
        </group>
      ))}
    </>
  );
}
