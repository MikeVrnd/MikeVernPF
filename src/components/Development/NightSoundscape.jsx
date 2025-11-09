import { useEffect, useRef } from "react";
import { validateAssetPath } from "../../utils/security";
export default function NightSoundscape({ isActive, isMuted, onRemoteSound }) {
  const ambientSoundRef = useRef(null);
  const remoteSoundRef = useRef(null);
  const isLoadedRef = useRef(false);
  const safeAudioPath = validateAssetPath("/little_birds_singing_day.mp3")
    ? "/little_birds_singing_day.mp3"
    : null;
  useEffect(() => {
    if (!safeAudioPath) {
      return;
    }
    const ambientAudio = new Audio();
    ambientAudio.preload = "auto";
    ambientAudio.addEventListener("canplaythrough", () => {
      isLoadedRef.current = true;
    });
    ambientAudio.addEventListener("error", (e) => {
      console.error("Night ambient audio failed to load:", e);
      console.error("Audio error details:", ambientAudio.error);
    });
    ambientAudio.src = safeAudioPath;
    ambientAudio.loop = true;
    ambientAudio.volume = 0.3;
    ambientSoundRef.current = ambientAudio;
    const remoteAudio = new Audio();
    remoteAudio.preload = "auto";
    remoteAudio.src = safeAudioPath;
    remoteAudio.volume = 0.5;
    remoteSoundRef.current = remoteAudio;
    return () => {
      if (ambientSoundRef.current) {
        ambientSoundRef.current.pause();
        ambientSoundRef.current.src = "";
        ambientSoundRef.current = null;
      }
      if (remoteSoundRef.current) {
        remoteSoundRef.current.pause();
        remoteSoundRef.current.src = "";
        remoteSoundRef.current = null;
      }
    };
  }, []);
  useEffect(() => {
    if (!ambientSoundRef.current) return;
    if (isActive && !isMuted) {
      ambientSoundRef.current.play().catch((err) => {
        console.log("Night ambient sound play prevented:", err);
      });
    } else {
      ambientSoundRef.current.pause();
    }
  }, [isActive, isMuted]);
  useEffect(() => {
    if (onRemoteSound) {
      onRemoteSound((shouldPlay) => {
        if (remoteSoundRef.current && isActive && !isMuted && shouldPlay) {
          remoteSoundRef.current.currentTime = 0;
          remoteSoundRef.current.play().catch((err) => {
            console.log("Remote sound play prevented:", err);
          });
        }
      });
    }
  }, [onRemoteSound, isActive, isMuted]);
  return null;
}
