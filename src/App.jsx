import React, { Suspense, useRef, useState, useEffect, lazy } from "react";
import PropTypes from "prop-types";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
import * as THREE from "three";

extend({ Group: THREE.Group });
import "./app.css";

const accountingScenePromise = import(
  "./components/Accounting/Avatar_acc_place"
);
const developerScenePromise = import(
  "./components/Development/Avatar_dev_place"
);

const Avatar_acc_place = lazy(() => accountingScenePromise);
const Avatar_dev_place = lazy(() => developerScenePromise);

developerScenePromise.then(() => console.log("Developer scene preloaded"));

import NightSoundscape from "./components/Development/NightSoundscape";
import DaySoundscape from "./components/Accounting/DaySoundscape";
import { validateAssetPath } from "./utils/security";

const SceneWrapper = React.memo(({ children, isActive, onUnload }) => {
  const [shouldRender, setShouldRender] = useState(isActive);

  SceneWrapper.displayName = "SceneWrapper";
  SceneWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    isActive: PropTypes.bool.isRequired,
    onUnload: PropTypes.func,
  };

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
        onUnload?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isActive, onUnload]);

  if (!shouldRender) return null;

  return children;
});

function LoadingFallback({ onLoadingChange }) {
  const { progress } = useProgress();
  useEffect(() => {
    onLoadingChange?.(true);
    return () => {
      onLoadingChange?.(false);
    };
  }, [onLoadingChange]);

  LoadingFallback.propTypes = {
    onLoadingChange: PropTypes.func,
  };

  return (
    <Html center>
      <div
        className="loading-overlay"
        style={{
          color: "white",
          fontSize: "1.2rem",
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.6)",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(255,255,255,0.3)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          whiteSpace: "nowrap",
          fontFamily: "sans-serif",
        }}
      >
        <span>Loading may take a moment... </span>
        <span>{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDay, setIsDay] = useState(true);
  const [showToggleButton, setShowToggleButton] = useState(true);
  const [isMobile] = useState(window.innerWidth < 768);

  const [loadedScenes, setLoadedScenes] = useState({
    day: true,
    night: false,
  });

  const [shouldDisposeNight, setShouldDisposeNight] = useState(false);
  const MAX_LOG_ENTRIES = 10;

  const cameraRef = useRef();
  const controlsRef = useRef();
  const composerRef = useRef();
  const [isSoundMuted, setIsSoundMuted] = useState(true);
  const nightRemoteSoundRef = useRef(null);
  const dayRemoteSoundRef = useRef(null);
  const handleLoadingChange = (loading) => {
    setIsLoading(loading);
  };

  useEffect(() => {
    const logMemory = () => {
      if (performance.memory) {
        const memoryUsage = Math.round(
          performance.memory.usedJSHeapSize / 1048576
        );
        const memoryLimit = Math.round(
          performance.memory.jsHeapSizeLimit / 1048576
        );
        if (memoryUsage > memoryLimit * 0.7) {
          console.warn(
            `High memory usage: ${memoryUsage}MB / ${memoryLimit}MB`
          );
        }
      }
    };
    const memoryInterval = setInterval(logMemory, 10000);
    return () => clearInterval(memoryInterval);
  }, []);

  const handleSceneUnload = (sceneName) => {
    setLoadedScenes((prev) => ({
      ...prev,
      [sceneName]: false,
    }));

    if (window.gc) {
      setTimeout(() => window.gc(), 100);
    }
  };

  const preloadOppositeScene = () => {
    if (isDay) {
      developerScenePromise.then(() =>
        console.log("Developer scene preloaded on hover")
      );
    } else {
      accountingScenePromise.then(() =>
        console.log("Accounting scene preloaded on hover")
      );
    }
  };

  const toggleMode = () => {
    setIsLoading(true);

    const sceneToUnload = isDay ? "day" : "night";
    setLoadedScenes((prev) => ({
      ...prev,
      [sceneToUnload]: false,
    }));

    setTimeout(() => {
      setIsDay((prev) => !prev);
      const sceneToLoad = !isDay ? "day" : "night";
      setLoadedScenes((prev) => ({
        ...prev,
        [sceneToLoad]: true,
      }));

      if (window.gc) {
        setTimeout(() => window.gc(), 500);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 300);
  };

  const [frameLoopMode, setFrameLoopMode] = useState("always");

  const toggleSound = () => {
    setIsSoundMuted(!isSoundMuted);
  };

  const playRemoteSound = () => {
    if (isDay && dayRemoteSoundRef.current) {
      dayRemoteSoundRef.current(true);
    } else if (!isDay && nightRemoteSoundRef.current) {
      nightRemoteSoundRef.current(true);
    }
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#111" }}>
      <NightSoundscape
        isActive={!isDay}
        isMuted={isSoundMuted}
        onRemoteSound={(callback) => {
          nightRemoteSoundRef.current = callback;
        }}
      />
      <DaySoundscape
        isActive={isDay}
        isMuted={isSoundMuted}
        onRemoteSound={(callback) => {
          dayRemoteSoundRef.current = callback;
        }}
      />

      <Canvas
        frameloop={frameLoopMode}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          alpha: false,
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true,
        }}
        camera={{
          position: [38.1, 5.29, 50.6],
          zoom: 1.5,
          fov: 50,
          near: 0.1,
          far: 500,
        }}
        onCreated={({ camera, gl }) => {
          cameraRef.current = camera;
          window.__webglContext = gl;
        }}
      >
        <Suspense fallback={null}>
          <EffectComposer ref={composerRef} disableNormalPass>
            <Bloom
              luminanceThreshold={1}
              luminanceSmoothing={0.025}
              mipmapBlur
            />
            <ToneMapping />
          </EffectComposer>
        </Suspense>

        <OrbitControls ref={controlsRef} />

        <Suspense
          fallback={<LoadingFallback onLoadingChange={handleLoadingChange} />}
        >
          <group position={[1, -2, 0]}>
            {loadedScenes.day && (
              <SceneWrapper
                isActive={isDay}
                sceneName="Day"
                onUnload={() => handleSceneUnload("day")}
              >
                <Avatar_dev_place
                  isMobile={isMobile}
                  setShowToggleButton={setShowToggleButton}
                  onRequestNightDisposal={() => setShouldDisposeNight(true)}
                  setFrameLoopMode={setFrameLoopMode}
                  playRemoteSound={playRemoteSound}
                />
              </SceneWrapper>
            )}

            {loadedScenes.night && (
              <SceneWrapper
                isActive={!isDay}
                sceneName="Night"
                onUnload={() => handleSceneUnload("night")}
              >
                <Avatar_acc_place
                  isMobile={isMobile}
                  setShowToggleButton={setShowToggleButton}
                  shouldDispose={shouldDisposeNight}
                  onDisposed={() => setShouldDisposeNight(false)}
                  setFrameLoopMode={setFrameLoopMode}
                  playRemoteSound={playRemoteSound}
                />
              </SceneWrapper>
            )}
          </group>
        </Suspense>
      </Canvas>

      {!isLoading && showToggleButton && (
        <div className="buttons-container">
          <button
            onClick={toggleMode}
            onMouseEnter={preloadOppositeScene}
            className="pulsing-button mode-button"
          >
            {/*Παρακάτω βάζω security check */}
            <img
              src={
                validateAssetPath(
                  isDay
                    ? "/textures/TexturesCompressed/Sun.png"
                    : "/textures/TexturesCompressed/Moon.png"
                )
                  ? isDay
                    ? "/textures/TexturesCompressed/Sun.png"
                    : "/textures/TexturesCompressed/Moon.png"
                  : "/fallback-safe.jpg"
              }
              alt={isDay ? "Sun Icon" : "Moon Icon"}
            />
          </button>
          <button onClick={toggleSound} className="pulsing-button sound-button">
            <img
              src={
                validateAssetPath(
                  isSoundMuted
                    ? "/textures/TexturesCompressed/SoundOff.jpg"
                    : "/textures/TexturesCompressed/SoundOn.jpg"
                )
                  ? isSoundMuted
                    ? "/textures/TexturesCompressed/SoundOff.jpg"
                    : "/textures/TexturesCompressed/SoundOn.jpg"
                  : "/fallback-safe.jpg"
              }
              alt={isSoundMuted ? "Sound Off" : "Sound On"}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
