import React, { useEffect, useState } from "react";
import centerImg from "../assets/Loading.png";
import "../styles/ProgressBar.css";
import planeImgOneSrc from "../assets/rocket-one.png";
import planeImgTwoSrc from "../assets/rocket-two.png";

export default function ProgressBar({ onComplete }) {
  const [progress, setProgress] = useState(100);
  const [planeIndex, setPlaneIndex] = useState(0); // NEW: track current plane image

  useEffect(() => {
    let start = performance.now();
    let animationFrame;

    const updateProgress = (timestamp) => {
      const elapsed = timestamp - start;
      const percent = Math.max(100 - (elapsed / 5000) * 100, 0);
      setProgress(percent);

      if (percent > 0) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        onComplete?.(); // Notify parent when done
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  // NEW: switch plane image 4 times per second (every 250ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaneIndex((prev) => (prev === 0 ? 1 : 0));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full z-10 flex flex-col items-center justify-center gap-4 relative">
      <img src={centerImg} alt="center" className="w-16 h-16 animate-spin-fast" />

      <p className="text-white text-xl font-semibold text-center">
        WAITING FOR NEXT ROUND
      </p>

      <div className="w-1/4 h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#e50539] transition-all duration-[50ms]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* NEW: plane image at bottom-left */}
      <img
        src={planeIndex === 0 ? planeImgOneSrc : planeImgTwoSrc}
        alt="plane"
        className="absolute bottom-4 left-4 w-40 h-auto"
      />
    </div>
  );
}
