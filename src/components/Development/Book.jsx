import { useCursor, useTexture, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector3,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { pageAtom, pages } from "./UI";
import React, { forwardRef } from "react";
import { validateAssetPath } from "../../utils/security";

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.01;
const turningCurveStrength = 0.09;

const PAGE_WIDTH = 1.14;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
  vertex.fromBufferAttribute(position, i);
  const x = vertex.x;

  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4)
);
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4)
);

const whiteColor = new Color("white");
const pageMaterials = [
  new MeshStandardMaterial({
    color: whiteColor,
  }),
  new MeshStandardMaterial({
    color: "#111",
  }),
  new MeshStandardMaterial({
    color: whiteColor,
  }),
  new MeshStandardMaterial({
    color: whiteColor,
  }),
];

pages.forEach((page) => {
  const frontPath = `/textures/${page.front}.webp`;
  const backPath = `/textures/${page.back}.webp`;
  const roughnessPath = `/textures/book-cover-roughness.webp`;

  if (validateAssetPath(frontPath)) useTexture.preload(frontPath);
  if (validateAssetPath(backPath)) useTexture.preload(backPath);
  if (validateAssetPath(roughnessPath)) useTexture.preload(roughnessPath);
});

const Page = ({ number, front, back, page, opened, bookClosed, ...props }) => {
  const frontPath = `/textures/${front}.webp`;
  const backPath = `/textures/${back}.webp`;
  const roughnessPath = `/textures/book-cover-roughness.webp`;

  if (!validateAssetPath(frontPath) || !validateAssetPath(backPath)) {
    console.log("Blocked unsafe texture paths", { frontPath });
    return null;
  }

  if (
    (number === 0 || number === pages.length - 1) &&
    !validateAssetPath(roughnessPath)
  ) {
    console.log("Blocked unsafe roughness path", { roughnessPath });
    return null;
  }

  const [picture, picture2, pictureRoughness] = useTexture([
    `/textures/${front}.webp`,
    `/textures/${back}.webp`,
    ...(number === 0 || number === pages.length - 1
      ? [`/textures/book-cover-roughness.webp`]
      : []),
  ]);

  picture.colorSpace = picture2.colorSpace = SRGBColorSpace;
  const group = useRef();
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);

  const skinnedMeshRef = useRef();

  const manualSkinnedMesh = useMemo(() => {
    const bones = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      let bone = new Bone();
      bones.push(bone);
      if (i === 0) {
        bone.position.x = 0;
      } else {
        bone.position.x = SEGMENT_WIDTH;
      }
      if (i > 0) {
        bones[i - 1].add(bone);
      }
    }
    const skeleton = new Skeleton(bones);

    const materials = [
      ...pageMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture,
        ...(number === 0
          ? {
              roughnessMap: pictureRoughness,
            }
          : {
              roughness: 1,
            }),

        emissiveIntensity: 0,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture2,
        ...(number === pages.length - 1
          ? {
              roughnessMap: pictureRoughness,
            }
          : {
              roughness: 1,
            }),
        emissiveIntensity: 0,
      }),
    ];
    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, []);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current) {
      return;
    }
    if (lastOpened.current !== opened) {
      turnedAt.current = +new Date();
      lastOpened.current = opened;
    }
    let turningTime = Math.min(400, new Date() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) {
      targetRotation += degToRad(number * 0.8);
    }

    const bones = skinnedMeshRef.current.skeleton.bones;
    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? group.current : bones[i];

      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;
      let rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;
      let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);
      if (bookClosed) {
        if (i === 0) {
          rotationAngle = targetRotation;
          foldRotationAngle = 0;
        } else {
          rotationAngle = 0;
          foldRotationAngle = 0;
        }
      }
      easing.dampAngle(
        target.rotation,
        "y",
        rotationAngle,
        easingFactor,
        delta
      );

      const foldIntensity =
        i > 8
          ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
          : 0;
      easing.dampAngle(
        target.rotation,
        "x",
        foldRotationAngle * foldIntensity,
        easingFactorFold,
        delta
      );
    }
  });

  const [_, setPage] = useAtom(pageAtom);
  const [highlighted, setHighlighted] = useState(false);
  useCursor(highlighted);

  return (
    <>
      {highlighted && (
        <Html position={[0.2, 1.51, 0]}>
          <div
            style={{
              width: 140,
              color: "white",
              background: "black",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "14px",
              textAlign: "center",
              fontFamily: "'Delius Swash Caps', cursive",
            }}
          >
            Scroll to zoom
          </div>
        </Html>
      )}
      <group
        {...props}
        ref={group}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHighlighted(true);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setHighlighted(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setPage(opened ? number : number + 1);
          setHighlighted(false);
        }}
      >
        <primitive
          object={manualSkinnedMesh}
          ref={skinnedMeshRef}
          position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
        />
      </group>
    </>
  );
};

export const Book = forwardRef(
  (
    {
      position = [-1.02, 0.5532, -2.38],

      ...props
    },
    ref
  ) => {
    const [page] = useAtom(pageAtom);
    const pageAudioGuard = useRef(false);
    useEffect(() => {
      const audioPath = "/audios/page-flip-01a.mp3";

      if (!validateAssetPath(audioPath)) {
        console.error("Blocked unsafe audio path:", audioPath);
        return;
      }
      if (!pageAudioGuard.current) {
        pageAudioGuard.current = true;
        return;
      }

      const audio = new Audio(audioPath);
      audio.play().catch((err) => {});
      return () => {
        try {
          audio.pause();
          audio.src = "";
        } catch (e) {
          console.debug("page flip audio play error:", e);
        }
      };
    }, [page]);

    const [delayedPage, setDelayedPage] = useState(page);

    useEffect(() => {
      let timeout;
      const goToPage = () => {
        setDelayedPage((delayedPage) => {
          if (page === delayedPage) {
            return delayedPage;
          } else {
            timeout = setTimeout(
              () => {
                goToPage();
              },
              Math.abs(page - delayedPage) > 2 ? 50 : 150
            );
            if (page > delayedPage) {
              return delayedPage + 1;
            }
            if (page < delayedPage) {
              return delayedPage - 1;
            }
          }
        });
      };
      goToPage();
      return () => {
        clearTimeout(timeout);
      };
    }, [page]);

    return (
      <>
        <group
          ref={ref}
          {...props}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
          position={position}
          scale={0.27}
        >
          {[...pages].map((pageData, index) => (
            <Page
              key={index}
              page={delayedPage}
              number={index}
              opened={delayedPage > index}
              bookClosed={delayedPage === 0 || delayedPage === pages.length}
              {...pageData}
            />
          ))}
        </group>
      </>
    );
  }
);
