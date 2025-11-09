import { useEffect, useRef } from "react";
import { validateAssetPath } from "../../utils/security";

export default function DaySoundscape({ isActive, isMuted, onRemoteSound }) {
  const ambientSoundRef = useRef(null);
  const remoteSoundRef = useRef(null);
  const safeAudioPath = validateAssetPath("/summer_night_crickets_night.mp3")
    ? "/summer_night_crickets_night.mp3"
    : null;
  useEffect(() => {
    if (!safeAudioPath) {
      return;
    }
    ambientSoundRef.current = new Audio(safeAudioPath);
    ambientSoundRef.current.loop = true;
    ambientSoundRef.current.volume = 0.3;
    remoteSoundRef.current = new Audio(safeAudioPath);
    remoteSoundRef.current.volume = 0.5;

    return () => {
      if (ambientSoundRef.current) {
        ambientSoundRef.current.pause();
        ambientSoundRef.current = null;
      }
      if (remoteSoundRef.current) {
        remoteSoundRef.current.pause();
        remoteSoundRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!ambientSoundRef.current) return;

    if (isActive && !isMuted) {
      ambientSoundRef.current.play().catch((err) => {
        console.log("Day ambient sound play prevented:", err);
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
