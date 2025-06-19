import React, { useEffect, useRef, useState } from "react";
import planeImgOneSrc from "../assets/rocket-one.png";
import planeImgTwoSrc from "../assets/rocket-two.png";

export default function PlaneAnimation({ multiplierValue, onComplete }) {
  const [multiplier, setMultiplier] = useState(0.0);
  const [planeLoaded, setPlaneLoaded] = useState(false);
  const [planeIndex, setPlaneIndex] = useState(0); // 0 or 1 for switching images
  const canvasRef = useRef(null);
  const planeImgsRef = useRef([null, null]);

  // Load both plane images once
  useEffect(() => {
    let loaded = 0;
    const img1 = new window.Image();
    const img2 = new window.Image();
    img1.src = planeImgOneSrc;
    img2.src = planeImgTwoSrc;
    img1.onload = () => {
      loaded += 1;
      if (loaded === 2) setPlaneLoaded(true);
    };
    img2.onload = () => {
      loaded += 1;
      if (loaded === 2) setPlaneLoaded(true);
    };
    img1.onerror = img2.onerror = () => setPlaneLoaded(false);
    planeImgsRef.current = [img1, img2];
  }, []);

  // Switch plane image twice a second
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaneIndex((prev) => (prev === 0 ? 1 : 0));
    }, 500); // 500ms = twice a second
    return () => clearInterval(interval);
  }, []);

  // Multiplier increment logic
  useEffect(() => {
    const interval = setInterval(() => {
      setMultiplier((prev) => {
        const next = +(prev + 0.01).toFixed(2);
        if (next >= multiplierValue) {
          clearInterval(interval);
          onComplete?.(); // <-- notify parent
          return multiplierValue;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [multiplierValue, onComplete]);

  // Draw everything
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // === Axis Offsets ===
    const xAxisOffsetYPercent = 0.08;
    const yAxisOffsetXPercent = 0.03;

    const xAxisY = canvas.height * (1 - xAxisOffsetYPercent);
    const yAxisX = canvas.width * yAxisOffsetXPercent;

    // === Draw Axes ===
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, xAxisY);
    ctx.lineTo(canvas.width, xAxisY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(yAxisX, canvas.height);
    ctx.lineTo(yAxisX, 0);
    ctx.stroke();

    // === Dots on Axes ===
    const dotOffset = canvas.height * 0.03;
    const dotSpacing = 0.1 * canvas.width;
    let startOffset =
      multiplier > 2 ? ((multiplier - 2) * 500) % dotSpacing : 0;

    for (let i = -1; i < canvas.width / dotSpacing + 2; i++) {
      const x =
        canvas.width * yAxisOffsetXPercent + i * dotSpacing - startOffset;
      ctx.beginPath();
      ctx.arc(x, xAxisY + dotOffset, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF";
      ctx.fill();
    }

    for (let i = -1; i < canvas.width / dotSpacing + 2; i++) {
      const y =
        canvas.width * yAxisOffsetXPercent + i * dotSpacing + startOffset;
      ctx.beginPath();
      ctx.arc(yAxisX - dotOffset, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF";
      ctx.fill();
    }

    // === Draw Curve ===
    ctx.strokeStyle = "#e50539";
    ctx.fillStyle = "rgba(229, 5, 57, 0.2)";
    ctx.lineWidth = 4;

    const curveStartX = yAxisX;
    const curveEndX = canvas.width * 0.7;
    const maxCurveWidth = curveEndX - curveStartX;
    const maxCurveHeight = xAxisY - canvas.height * 0.5;

    const a = 1;
    const b = 1.7;
    const step = 0.01;
    const maxMultiplier = 2;
    const pulse = multiplier >= 2 ? Math.sin(Date.now() / 300) * 0.09 : 0;

    const points = [];
    for (let t = 0; t <= Math.min(multiplier, maxMultiplier); t += step) {
      const x = curveStartX + (t / maxMultiplier) * maxCurveWidth;
      const yVal = a * Math.pow(t, b + pulse);
      const y =
        xAxisY - (yVal / Math.pow(maxMultiplier, b + pulse)) * maxCurveHeight;
      points.push([x, y]);
    }

    // Fill under curve
    if (points.length > 0) {
      ctx.beginPath();
      ctx.moveTo(points[0][0], xAxisY);
      for (const [x, y] of points) ctx.lineTo(x, y);
      ctx.lineTo(points[points.length - 1][0], xAxisY);
      ctx.closePath();
      ctx.fill();

      // Draw curve
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.stroke();

      // === Draw Plane at End of Curve ===
      if (planeLoaded) {
        const [lastX, lastY] = points[points.length - 1];
        ctx.save();
        ctx.drawImage(
          planeImgsRef.current[planeIndex],
          lastX - 20,
          lastY - 90,
          200,
          100
        );
        ctx.restore();
      }
    }
  }, [multiplier, multiplierValue, planeLoaded, planeIndex]);

  return (
    <div className="relative h-full w-full bg-transparent">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold tracking-widest z-10">
        {multiplier.toFixed(2)}x
      </div>
    </div>
  );
}
