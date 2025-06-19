import React from "react";
import background from "../assets/bg.png";
import "../styles/RotatingBackground.css";

export default function RotatingBackground({ shouldRotate }) {
  return (
    <div className="h-full w-full relative overflow-hidden">
      <img
        src={background}
        alt="background"
        className={`rotating-bg-img${shouldRotate ? " spin-animate" : ""}`}
      />
    </div>
  );
}
