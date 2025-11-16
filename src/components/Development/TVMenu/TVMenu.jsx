import { useState, useRef, useEffect, forwardRef } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const TVMenu = forwardRef((props, ref) => {
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
    { id: 1, name: "1", video: "/video_ImageViewer_com_540p.mp4" },
    { id: 2, name: "2", video: "/VBA.mp4" },
    { id: 3, name: "3", video: "/ReactFinal.mp4" },
    { id: 4, name: "4", video: "/video_BlenderChair.mp4" },
  ];
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
    if (!videoRefs.current[proj.id]) {
      getVideoTexture(proj.video, proj.id);
    }
    setSelectedProjectId(proj.id);
  };
  const handleStopClick = () => {
    setSelectedProjectId(null);
  };
  const handleNextClick = () => {
    if (selectedProjectId === null) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProjectId);
    const nextIndex = (currentIndex + 1) % projects.length;

    setSelectedProjectId(projects[nextIndex].id);
  };
  const handlePreviousClick = () => {
    if (selectedProjectId === null) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProjectId);
    const prevIndex = (currentIndex - 1) % projects.length;

    setSelectedProjectId(projects[prevIndex].id);
  };
  const showVideo = selectedProjectId !== null;
  return (
    <>
      <group
        rotation-y={-Math.PI / 2}
        position={[0.18, -0.29, -4.05]}
        group
        ref={ref}
        {...props}
        dispose={null}
      >
        {/* Video screen */}
        <sprite position={[1.18, 1.899, -2.55]}>
          <planeGeometry args={[3.63, 1.698, 8, 8]} />
          <meshStandardMaterial color="black" />
          {/* "#333"  */}
          {showVideo && (
            <meshBasicMaterial
              map={getVideoTexture(
                projects.find((p) => p.id === selectedProjectId).video,
                selectedProjectId
              )}
              toneMapped={false}
              transparent
            />
          )}
        </sprite>
        {/* Text panel */}
        {/* <mesh position={[-0.2, 1.89, -2.5]}>
          <planeGeometry args={[1.0, 1.75]} />
          <meshStandardMaterial color="black" />
          {showVideo && (
            <Text
              position={[-0.01, 0.6, 0.01]}
              fontSize={0.045}
              color="white"
              maxWidth={0.85}
            >
              {Content({ projectId: selectedProjectId })}
            </Text>
          )}
        </mesh> */}
        {/* Buttons - 6 total: 3 project buttons + 3 control buttons */}
        <group position={[1.2, 0.98, -1.96]} rotation={[-Math.PI / 2.4, 0, 0]}>
          {/* Project selection buttons (1, 2, 3) - First row */}
          {projects.map((proj, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);
            const xOffset = col * 0.118;
            const yOffset = 0.15 - row * 0.14;
            return (
              <Text
                key={proj.id}
                position={[xOffset, yOffset, 0.01]}
                fontSize={0.061}
                color="white"
                anchorX="center"
                anchorY="middle"
                visible={false}
                onPointerOver={() => (document.body.style.cursor = "pointer")}
                onPointerOut={() => (document.body.style.cursor = "default")}
                onClick={() => handleProjectClick(proj)}
              >
                {proj.name}
              </Text>
            );
          })}
          {/* Control buttons - Second row */}
          {/* Previous button */}
          <Text
            position={[0, -0.228, -0.287]}
            rotation={[Math.PI / 15, 0, 0]}
            fontSize={0.061}
            color="white"
            anchorX="center"
            anchorY="middle"
            visible={false}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
            onClick={handlePreviousClick}
          >
            ◀
          </Text>
          {/* Stop button */}
          <Text
            position={[0.119, -0.142, -0.29]}
            rotation={[Math.PI / 15, 0, 0]}
            fontSize={0.061}
            color="white"
            anchorX="center"
            anchorY="middle"
            visible={false}
            scale={1.3}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
            onClick={handleStopClick}
          >
            ■
          </Text>
          {/* Next button */}
          <Text
            position={[0.239, -0.128, -0.287]}
            rotation={[Math.PI / 15, 0, 0]}
            fontSize={0.061}
            color="white"
            anchorX="center"
            anchorY="middle"
            visible={false}
            transparent
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
            onClick={handleNextClick}
          >
            ▶
          </Text>
        </group>
      </group>
    </>
  );
});
export default TVMenu;
