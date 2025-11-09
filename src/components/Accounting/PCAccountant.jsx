import { useState, useRef, useEffect } from "react";
import { Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { LinearFilter } from "three";
import { validateAssetPath, validateVideoPath } from "../../utils/security";

export default function PCAccountant() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const videoRefs = useRef({});
  const textureRefs = useRef({});
  const { invalidate } = useThree();
  const rvfcIds = useRef({});

  const startVideoSync = (id) => {
    const video = videoRefs.current[id];
    const texture = textureRefs.current[id];
    if (!video || !texture || !video.requestVideoFrameCallback) return;

    const tick = () => {
      texture.needsUpdate = true;
      invalidate();
      rvfcIds.current[id] = video.requestVideoFrameCallback(tick);
    };

    rvfcIds.current[id] = video.requestVideoFrameCallback(tick);
  };
  const stopVideoSync = (id) => {
    const video = videoRefs.current[id];
    const handle = rvfcIds.current[id];
    if (video && handle && video.cancelVideoFrameCallback) {
      video.cancelVideoFrameCallback(handle);
      delete rvfcIds.current[id];
    }
  };
  const projects = [
    {
      id: 1,
      name: "Project σε Python",
      video: "/video_ImageViewer_com_540p.mp4",
      icon: "/textures/TexturesCompressed/Accountant/icon_video_player_1.jpg",
    },
    {
      id: 2,
      name: "Project σε VBA",
      video: "/VBA.mp4",
      icon: "/textures/TexturesCompressed/Accountant/icon_video_player_2.jpg",
    },
    {
      id: 3,
      name: "Project σε React",
      video: "/ReactFinal.mp4",
      icon: "/textures/TexturesCompressed/Accountant/icon_video_player_3.jpg",
    },
    {
      id: 4,
      name: "Blender",
      video: "/video_BlenderChair.mp4",
      icon: "/textures/TexturesCompressed/Accountant/icon_video_player_4.jpg",
    },
  ];

  const allIconsValid = projects.every((p) => validateAssetPath(p.icon));
  const allVideosValid = projects.every((p) => validateVideoPath(p.video));

  const texturePathsToValidate = [
    "/textures/TexturesCompressed/Accountant/StickyNotes7.jpg",
    "/textures/TexturesCompressed/Accountant/bar.jpg",
    "/textures/TexturesCompressed/Accountant/xsign.jpg",
    "/textures/TexturesCompressed/Accountant/minussign.jpg",
    "/textures/TexturesCompressed/Accountant/VideoIcon.jpg",
  ];

  const allTexturesValid = texturePathsToValidate.every((path) =>
    validateAssetPath(path)
  );

  if (!allIconsValid || !allVideosValid || !allTexturesValid) {
    console.error("Blocked unsafe project paths");
    return null;
  }

  const iconTextures = useTexture(projects.map((p) => p.icon));
  const stickyNotes = useTexture(
    "/textures/TexturesCompressed/Accountant/StickyNotes7.jpg"
  );
  const bar = useTexture("/textures/TexturesCompressed/Accountant/bar.jpg");
  const xsign = useTexture("/textures/TexturesCompressed/Accountant/xsign.jpg");
  const minussign = useTexture(
    "/textures/TexturesCompressed/Accountant/minussign.jpg"
  );
  const videoIcon = useTexture(
    "/textures/TexturesCompressed/Accountant/VideoIcon.jpg"
  );

  useEffect(() => {
    [stickyNotes, ...iconTextures, bar, xsign, minussign, videoIcon].forEach(
      (texture) => {
        if (texture) {
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.anisotropy = 4;
          texture.needsUpdate = true;
        }
      }
    );
  }, [stickyNotes, iconTextures, bar, xsign, minussign, videoIcon]);
  const [isVideoMinimized, setIsVideoMinimized] = useState(false);

  const getVideoTexture = (videoUrl, id) => {
    if (!videoRefs.current[id]) {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.load();
      videoRefs.current[id] = video;

      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.encoding = THREE.sRGBEncoding;
      textureRefs.current[id] = texture;
    }
    return textureRefs.current[id];
  };

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video.paused) {
        video.pause();
      }
    });

    if (selectedProjectId !== null && videoRefs.current[selectedProjectId]) {
      const selectedVideo = videoRefs.current[selectedProjectId];
      selectedVideo.currentTime = 0;

      Object.keys(rvfcIds.current).forEach((vid) => stopVideoSync(vid));
      selectedVideo
        .play()
        .then(() => {
          startVideoSync(selectedProjectId);
        })
        .catch((e) => console.warn("❌ Couldn't play video:", e.message));
    }
  }, [selectedProjectId]);

  useFrame(() => {
    if (selectedProjectId && textureRefs.current[selectedProjectId]) {
      textureRefs.current[selectedProjectId].needsUpdate = true;
    }
  });
  useEffect(() => {
    return () => {
      Object.keys(rvfcIds.current).forEach((vid) => stopVideoSync(vid));
      Object.values(videoRefs.current).forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.load();
      });
      Object.values(textureRefs.current).forEach((texture) => {
        texture.dispose();
      });
      videoRefs.current = {};
      textureRefs.current = {};
    };
  }, []);
  const handleProjectClick = (proj) => {
    setSelectedProjectId(proj.id);
  };
  const handleBackClick = () => {
    setSelectedProjectId(null);
  };
  const showVideo = selectedProjectId !== null;
  function DesktopIcon() {
    const texturePaths = [
      "/textures/TexturesCompressed/Accountant/Desktop.jpg",
      "/textures/TexturesCompressed/Accountant/DesktopSearch.jpg",
    ];

    const safeTexturePaths = texturePaths.filter((path) => {
      const isValid = validateAssetPath(path);
      if (!isValid) console.error("Blocked unsafe texture path:", path);
      return isValid;
    });

    if (safeTexturePaths.length !== texturePaths.length) {
      console.error("Some texture paths failed validation");
      return null;
    }

    const [desktopIcon, windowTexture] = useTexture(safeTexturePaths);

    const [showWindow, setShowWindow] = useState(false);
    const [textureLoaded, setTextureLoaded] = useState(false);
    useEffect(() => {
      if (desktopIcon) desktopIcon.anisotropy = 4;
      if (windowTexture) {
        windowTexture.anisotropy = 4;
        windowTexture.needsUpdate = true;
        setTextureLoaded(true);
      }
    }, [desktopIcon, windowTexture]);
    return (
      <>
        <mesh
          position={[0.243, 0.987, -2.1138]}
          rotation={[0, -Math.PI / 1.0001, 0]}
        >
          <planeGeometry args={[1.108, 0.035]} />
          <meshBasicMaterial map={desktopIcon} toneMapped={false} />
        </mesh>

        <mesh
          position={[0.582, 0.987, -2.1038]}
          rotation={[0, -Math.PI / 1.0001, 0]}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
          onClick={() => setShowWindow(!showWindow)}
          visible={false}
        >
          <planeGeometry args={[0.03, 0.035]} />
          <meshBasicMaterial toneMapped={false} />
        </mesh>

        {showWindow && (
          <mesh
            position={[0.26, 1.17, -2.1161]}
            rotation={[0, -Math.PI / 1.0001, 0]}
          >
            <planeGeometry args={[0.32, 0.32]} />
            <meshBasicMaterial
              map={textureLoaded ? windowTexture : null}
              toneMapped={false}
              color={textureLoaded ? "white" : "#888888"}
            />
          </mesh>
        )}
      </>
    );
  }
  return (
    <group position={[0, 0.0, 0]}>
      <DesktopIcon />
      <mesh
        position={[0.28, 1.25, -2.1139]}
        rotation={[0, -Math.PI / 1.0001, 0]}
      >
        <planeGeometry args={[0.28, 0.28]} />
        <meshBasicMaterial map={stickyNotes} toneMapped={false} />
      </mesh>
      {/* Icon Buttons */}
      {!showVideo && (
        <group
          position={[0.5, 1.29, -2.116]}
          rotation={[0, -Math.PI / 1.0001, 0]}
        >
          {projects.map((proj, index) => {
            const groupIndex = Math.floor(index / 2);
            const col = index % 2;
            const xOffset = col * 0.09 - 0.2;
            const yOffset = -groupIndex * 0.08;
            return (
              <mesh
                key={proj.id}
                position={[xOffset, yOffset, 0.01]}
                onPointerOver={() => (document.body.style.cursor = "pointer")}
                onPointerOut={() => (document.body.style.cursor = "default")}
                onClick={() => handleProjectClick(proj)}
              >
                <planeGeometry args={[0.03, 0.03]} />
                <meshBasicMaterial map={iconTextures[index]} />
                <Text
                  position={[0, -0.02, 0.01]}
                  fontSize={0.01}
                  color="white"
                  anchorX="center"
                  anchorY="top"
                >
                  {proj.name}
                </Text>
              </mesh>
            );
          })}
        </group>
      )}

      {/* Video Display */}
      {showVideo && !isVideoMinimized && (
        <>
          {/* Top video bar */}
          <mesh
            position={[0.241, 1.452, -2.117]}
            rotation={[0, -Math.PI / 1.0001, 0]}
          >
            <planeGeometry args={[1.106, 0.015]} />
            <meshBasicMaterial map={bar} />
          </mesh>

          {/* X (close) button */}
          <mesh
            position={[-0.293, 1.452, -2.117]}
            rotation={[0, -Math.PI / 1.0001, 0]}
            onClick={handleBackClick}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            <planeGeometry args={[0.025, 0.011]} />
            <meshBasicMaterial map={xsign} />
          </mesh>

          {/* Minimize (-) button */}
          <mesh
            position={[-0.24, 1.452, -2.118]}
            rotation={[0, -Math.PI / 1.0001, 0]}
            onClick={() => {
              setIsVideoMinimized(true);

              if (selectedProjectId && videoRefs.current[selectedProjectId]) {
                videoRefs.current[selectedProjectId].pause();
              }
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            <planeGeometry args={[0.025, 0.014]} />
            <meshBasicMaterial map={minussign} />
          </mesh>

          {/* Video player */}
          <mesh
            position={[0.236, 1.234, -2.116]}
            rotation={[0, -Math.PI / 1.0001, 0]}
          >
            <planeGeometry args={[0.99, 0.42]} />
            <meshBasicMaterial
              map={getVideoTexture(
                projects.find((p) => p.id === selectedProjectId).video,
                selectedProjectId
              )}
              toneMapped={false}
            />
          </mesh>
        </>
      )}

      {/* Minimized video icon (restore) */}
      {showVideo && (
        <mesh
          position={[0.298, 0.99, -2.128]}
          rotation={[0, -Math.PI / 1.0001, 0]}
          onClick={() => {
            setIsVideoMinimized(false);
            if (selectedProjectId && videoRefs.current[selectedProjectId]) {
              videoRefs.current[selectedProjectId].play();
            }
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <planeGeometry args={[0.04, 0.03]} />
          <meshBasicMaterial map={videoIcon} />
        </mesh>
      )}
    </group>
  );
}
