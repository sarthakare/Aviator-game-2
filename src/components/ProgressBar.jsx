import React, { useEffect, useState } from "react";
import centerImg from "../assets/Loading.png";
import "../styles/ProgressBar.css";

export default function ProgressBar({ onComplete }) {
  const [progress, setProgress] = useState(100);

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

  return (
    <div className="w-full h-full z-10 flex flex-col items-center justify-center gap-4">
      <img src={centerImg} alt="center" className="w-32 h-32 animate-spin-fast" />

      <p className="text-white text-xl font-semibold text-center">
        WAITING FOR NEXT ROUND
      </p>

      <div className="w-full max-w-md h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#e50539] transition-all duration-[50ms]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
