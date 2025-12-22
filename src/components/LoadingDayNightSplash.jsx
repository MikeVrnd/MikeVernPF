import React, { useMemo, useState, useCallback } from "react";
import { validateAssetPath } from "../utils/security";

const LoadingDayNightSplash = ({ showModels, onSelectDay, onSelectNight }) => {
  const [hovered, setHovered] = useState(null);

  const dayPath = useMemo(() => {
    const path = "/textures/TexturesCompressed/Day.jpg";
    return validateAssetPath(path) ? path : "/fallback-safe.jpg";
  }, []);

  const nightPath = useMemo(() => {
    const path = "/textures/TexturesCompressed/Night.jpg";
    return validateAssetPath(path) ? path : "/fallback-safe.jpg";
  }, []);

  const handleDayHover = useCallback(() => setHovered("day"), []);
  const handleNightHover = useCallback(() => setHovered("night"), []);
  const handleOut = useCallback(() => setHovered(null), []);

  return (
    <div className="loading-splash" aria-label="Loading day and night scenes">
      <div className="loading-splash-header">
        <h1>Mike Vernadakis</h1>
      </div>
      {showModels && (
        <div className="loading-splash-cards">
          <button
            type="button"
            className={`loading-splash-card ${
              hovered === "day" ? "is-hovered" : ""
            }`}
            onMouseEnter={handleDayHover}
            onMouseLeave={handleOut}
            onClick={onSelectNight}
          >
            <div className="loading-splash-label loading-splash-label-day">
              Accountant by day
            </div>
            <img src={dayPath} alt="Day scene" />
          </button>
          <button
            type="button"
            className={`loading-splash-card ${
              hovered === "night" ? "is-hovered" : ""
            }`}
            onMouseEnter={handleNightHover}
            onMouseLeave={handleOut}
            onClick={onSelectDay}
          >
            <div className="loading-splash-label loading-splash-label-night">
              Developer by night
            </div>
            <img src={nightPath} alt="Night scene" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LoadingDayNightSplash;
