// PerformanceHud.jsx
import { Perf } from "r3f-perf";
import Stats from "stats-js";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Profiler } from "react";
import { Html } from "@react-three/drei";

/* -------------------------------
   Stats.js overlay (top-right)
--------------------------------*/
function StatsMonitor() {
  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.position = "absolute";
    stats.dom.style.top = "0px";
    stats.dom.style.right = "0px";
    stats.dom.style.zIndex = 9999;
    document.body.appendChild(stats.dom);

    return () => {
      document.body.removeChild(stats.dom);
    };
  }, []);

  useFrame(() => {});
  return null;
}

/* -------------------------------
   Frame time logger (bottom-left)
--------------------------------*/
function FrameLogger() {
  useFrame((state) => {
    const ms = state.clock.getDelta() * 1000;
    // uncomment if needed:
    // console.log("Frame time:", ms.toFixed(2), "ms")
  });
  return null;
}

/* -------------------------------
   React profiler logger
--------------------------------*/
function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log(`🔍 React Profiler: ${id}`);
  console.log({
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
}

/* -------------------------------
   Main HUD container
--------------------------------*/
export default function PerformanceHud() {
  return (
    <>
      {/* r3f-perf (top-left) */}
      <Perf position="top-right" />

      {/* Stats.js (top-right) */}
      {/* <StatsMonitor position="top-right" /> */}

      {/* Custom frame logger (bottom-left) */}
      <FrameLogger />

      {/* React Profiler (bottom-right overlay) */}
      <Profiler id="R3F-Scene" onRender={onRenderCallback}>
        {/* This does NOT render UI, only measures */}
        {/* <Html>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "rgba(0,0,0,0.4)",
              padding: "4px 10px",
              color: "white",
              fontSize: "12px",
              pointerEvents: "none",
            }}
          >
            React Profiler Active
          </div>
        </Html> */}
      </Profiler>
    </>
  );
}
