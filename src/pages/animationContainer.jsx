import React, { useState, useRef } from "react";
import PlaneAnimation from "../components/PlaneAnimation";
import ProgressBar from "../components/ProgressBar";
import RotatingBackground from "../components/RotatingBackground";
import bgAudio from "../assets/audio/sfxBg.mp3"; 

export default function Background() {
  const multiplierValue = 10;
  const [phase, setPhase] = useState("initial"); // "initial" | "progress" | "animation"
  const audioRef = useRef(null);

  const handleUserInteraction = () => {
    // Play the audio after the user click
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error trying to play audio:", error);
      });
    }
    setPhase("progress"); // Move to the progress phase
  };
  
  const handleProgressComplete = () => {
    setPhase("animation");
  };
  
  const handlePlaneComplete = () => {
    setPhase("progress");
  };
  
  return (
    <div className="h-full w-full bg-[#1B1C1D] relative overflow-hidden rounded-3xl border-2 border-gray-300">
      <audio ref={audioRef} src={bgAudio} loop />
  
      <div className="absolute inset-0 z-0">
        <RotatingBackground shouldRotate={phase === "animation"} />
      </div>
  
      {phase === "initial" && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <button
            onClick={handleUserInteraction}
            className="bg-[#e50539] text-white rounded-xl px-6 py-3 text-lg font-bold hover:bg-[#ff3159]"
          >
            Click to Start
          </button>
        </div>
      )}
  
      {phase === "progress" && (
        <div className="absolute top-8 w-full h-full z-10 flex justify-center">
          <ProgressBar onComplete={handleProgressComplete} />
        </div>
      )}
  
      {phase === "animation" && (
        <div className="absolute inset-0 z-20">
          <PlaneAnimation
            multiplierValue={multiplierValue}
            onComplete={handlePlaneComplete}
          />
        </div>
      )}
    </div>
  );
}
