import React, { useState } from "react";
import PlaneAnimation from "../components/PlaneAnimation";
import ProgressBar from "../components/ProgressBar";
import RotatingBackground from "../components/RotatingBackground";

export default function Background() {
  const multiplierValue = 3;

  const [phase, setPhase] = useState("progress"); // "progress" | "animation"

  // Called when progress bar finishes
  const handleProgressComplete = () => {
    setPhase("animation");
  };

  // Called when plane animation finishes
  const handlePlaneComplete = () => {
    setPhase("progress");
  };

  return (
    <div className="h-full w-full bg-[#1B1C1D] relative overflow-hidden rounded-3xl border-2 border-gray-300">
      {/* Rotating background */}
      <div className="absolute inset-0 z-0">
        <RotatingBackground shouldRotate={phase === "animation"} />
      </div>

      {/* Conditionally render ProgressBar */}
      {phase === "progress" && (
        <div className="absolute top-8 w-full h-full z-10 flex justify-center">
          <ProgressBar onComplete={handleProgressComplete} />
        </div>
      )}

      {/* Conditionally render PlaneAnimation */}
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
