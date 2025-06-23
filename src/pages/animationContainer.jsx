import React, { useState, useRef } from "react";
import PlaneAnimation from "../components/PlaneAnimation";
import ProgressBar from "../components/ProgressBar";
import RotatingBackground from "../components/RotatingBackground";
import bgAudio from "../assets/audio/sfxBg.mp3";

export default function Background() {
  const multiplierValue = 10;
  const [phase, setPhase] = useState("initial");
  const audioRef = useRef(null);

  const handleUserInteraction = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error trying to play audio:", error);
      });
    }
    setPhase("progress");
  };

  const handleProgressComplete = () => {
    setPhase("animation");
  };

  const handlePlaneComplete = () => {
    setPhase("progress");
  };

  return (
    <div className="relative w-full h-full bg-[#1B1C1D] overflow-hidden rounded-3xl border border-gray-300
      flex flex-col justify-center items-center
      p-2 sm:p-4 md:p-8
      min-h-[200px] sm:min-h-[250px] md:min-h-[400px]">
      <audio ref={audioRef} src={bgAudio} loop />

      <div className="absolute inset-0 z-0">
        <RotatingBackground shouldRotate={phase === "animation"} />
      </div>

      {phase === "initial" && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <button
            onClick={handleUserInteraction}
            className="bg-[#e50539] text-white rounded-xl px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-bold hover:bg-[#ff3159] transition"
          >
            Click to Start
          </button>
        </div>
      )}

      {phase === "progress" && (
        <div className="absolute w-full h-full z-10 flex justify-center items-center">
          <ProgressBar onComplete={handleProgressComplete} />
        </div>
      )}

      {phase === "animation" && (
        <div className="absolute inset-0 z-20 flex justify-center items-center">
          <PlaneAnimation
            multiplierValue={multiplierValue}
            onComplete={handlePlaneComplete}
          />
        </div>
      )}
    </div>
  );
}
