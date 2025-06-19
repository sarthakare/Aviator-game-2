import React from "react";
import background from "../assets/bg.png";
import "../styles/RotatingBackground.css";

export default function RotatingBackground({ shouldRotate }) {
  return (
    <div className="h-full w-full relative overflow-hidden bg-[#1B1C1D]">
      {/* Rotating image */}
      <img
        src={background}
        alt="background"
        className={`rotating-bg-img${shouldRotate ? " spin-animate" : ""}`}
      />

      {/* Breathing glowing ellipse (only when shouldRotate is true) */}
      {shouldRotate && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-1/2 h-1/2 rounded-full blur-3xl animate-gradient-blur"
        />
      )}
    </div>
  );
}
