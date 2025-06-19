import React, { useEffect, useRef, useState } from "react";

export default function PlaneAnimation({ multiplierValue }) {
  const [multiplier, setMultiplier] = useState(0.0);
  const canvasRef = useRef(null);

  // Multiplier increment logic with upper bound
  useEffect(() => {
    const interval = setInterval(() => {
      setMultiplier((prev) => {
        const next = +(prev + 0.01).toFixed(2);
        if (next >= multiplierValue) {
          clearInterval(interval);
          return multiplierValue;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [multiplierValue]);

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

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, xAxisY);
    ctx.lineTo(canvas.width, xAxisY);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(yAxisX, canvas.height);
    ctx.lineTo(yAxisX, 0);
    ctx.stroke();

    // === Draw Dots on X-Axis ===
    const dotOffset = canvas.height * 0.03;
    const dotSpacing = 0.1 * canvas.width;
    let startOffset = 0;
    if (multiplier > 2) {
      const speed = (multiplier - 2) * 500; // start moving only after 2x
      startOffset = speed % dotSpacing;
    }

    for (let i = -1; i < canvas.width / dotSpacing + 2; i++) {
      const x =
        canvas.width * yAxisOffsetXPercent + i * dotSpacing - startOffset;
      ctx.beginPath();
      ctx.arc(x, xAxisY + dotOffset, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF";
      ctx.fill();
    }

    // === Draw Dots on Y-Axis ===
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
    ctx.lineWidth = 4;
    ctx.beginPath();

    const curveStartX = yAxisX;
    const curveEndX = canvas.width * 0.7;
    const maxCurveWidth = curveEndX - curveStartX;
    const maxCurveHeight = xAxisY - canvas.height * 0.5;

    const a = 1;
    const b = 1.7;
    const step = 0.01;

    const maxMultiplier = 2;
    const pulse = multiplier >= 2 ? Math.sin(Date.now() / 300) * 0.09 : 0; // subtle wave

    for (let t = 0; t <= Math.min(multiplier, maxMultiplier); t += step) {
      const x = curveStartX + (t / maxMultiplier) * maxCurveWidth;

      // Apply pulsing to yValue
      const yValue = a * Math.pow(t, b + pulse);
      const y = xAxisY - (yValue / Math.pow(maxMultiplier, b + pulse)) * maxCurveHeight;

      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();
  }, [multiplier, multiplierValue]);

  return (
    <div className="relative h-full w-full bg-transparent">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white tracking-widest z-10">
        {multiplier.toFixed(2)}x
      </div>
    </div>
  );
}
