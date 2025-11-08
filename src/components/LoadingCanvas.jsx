import { useEffect } from "react";

function LoadingCanvas({ isDay, onSceneLoaded }) {
  useEffect(() => {
    // Simulate loading delay or wait for actual canvas load
    const timer = setTimeout(() => {
      onSceneLoaded(); // Notify App that scene is loaded
    }, 1000); // replace with actual logic if needed

    return () => clearTimeout(timer);
  }, [isDay]);

  return (
    <div>
      {/* Canvas or 3D scene here */}
      <canvas id="main-canvas" />
    </div>
  );
}

export default LoadingCanvas;
