import React, { useMemo, useState, useCallback } from "react";

import { validateAssetPath } from "../utils/security";
import ContactModal from "./Contact/ContactModal";
import { useContactForm } from "./Contact/useContactForm";
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
  const contact = useContactForm();

  return (
    <div className="loading-splash" aria-label="Loading day and night scenes">
      <div className="loading-splash-header">
        <h1>Between Day and Night</h1>
        <h1>
          When the sun is up, I work with deadlines, handling tax submissions,
          reporting, and ERP-related issues.
        </h1>
        <h1>
          When darkness falls, creativity takes over — code, experimentation,
          learning, and curiosity.
        </h1>
        <h1>
          Choose your entry point: <br /> Day → Accountant / Night → Developer
        </h1>
        <button
          type="button"
          className="loading-splash-contact"
          onClick={contact.open}
        >
          Contact
        </button>
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
      <div className="loading-splash-note" role="note">
        Once the scene has loaded, use the Day{" "}
        <img
          className="loading-splash-note-icon"
          src="/textures/TexturesCompressed/Sun.webp"
          alt="Sun icon"
        />{" "}
        or Night{" "}
        <img
          className="loading-splash-note-icon"
          src="/textures/TexturesCompressed/Moon.webp"
          alt="Moon icon"
        />{" "}
        button at the top of the screen to switch scenes.
      </div>
      {contact.status && (
        <div className="loading-splash-toast" role="status">
          {contact.status}
        </div>
      )}
      <ContactModal
        isOpen={contact.isOpen}
        onCancel={contact.cancel}
        onSubmit={contact.submit}
        isSending={contact.isSending}
        name={contact.name}
        setName={contact.setName}
        email={contact.email}
        setEmail={contact.setEmail}
        message={contact.message}
        setMessage={contact.setMessage}
      />
    </div>
  );
};
export default LoadingDayNightSplash;
