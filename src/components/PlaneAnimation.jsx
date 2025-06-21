import React, { useEffect, useRef, useState } from "react";
import planeImgOneSrc from "../assets/rocket-one.png";
import planeImgTwoSrc from "../assets/rocket-two.png";
import startSound from "../assets/audio/sfxRocketStart.mp3";
import crashSound from "../assets/audio/sfxRocketCrash.mp3";

export default function PlaneAnimation({ multiplierValue, onComplete }) {
  // State for the multiplier value displayed
  const [multiplier, setMultiplier] = useState(0.0);
  // State to track if plane images are loaded
  const [planeLoaded, setPlaneLoaded] = useState(false);
  // State for switching between two plane images (for animation)
  const [planeIndex, setPlaneIndex] = useState(0);
  // State to trigger the fly away animation
  const [flyAway, setFlyAway] = useState(false);
  // State for fly away animation progress (0 to 1)
  const [flyAwayProgress, setFlyAwayProgress] = useState(0);
  // State to show "Flew Away!" message
  const [showFlewAway, setShowFlewAway] = useState(false);

  // Refs for canvas and images
  const canvasRef = useRef(null);
  const planeImgsRef = useRef([null, null]);
  const flyAwayRef = useRef(false);

  // Refs for audio elements
  const startAudioRef = useRef(null);
  const crashAudioRef = useRef(null);

  // Load both plane images once on mount
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

  // Switch plane image twice a second for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaneIndex((prev) => (prev === 0 ? 1 : 0));
    }, 100); // 500ms = twice a second
    return () => clearInterval(interval);
  }, []);

  // Increment multiplier until it reaches multiplierValue, then trigger fly away
  useEffect(() => {
    if (flyAway) return; // Stop incrementing when flying away
    const interval = setInterval(() => {
      setMultiplier((prev) => {
        const next = +(prev + 0.01).toFixed(2);
        if (next >= multiplierValue) {
          clearInterval(interval);
          setFlyAway(true); // Start fly away
          setShowFlewAway(true);
          flyAwayRef.current = true;
          // After 5 seconds, call onComplete and hide "Flew Away!"
          setTimeout(() => {
            setShowFlewAway(false);
            onComplete?.();
          }, 5000);
          return multiplierValue;
        }
        return next;
      });
    }, 50); // Update every 50ms
    return () => clearInterval(interval);
  }, [multiplierValue, onComplete, flyAway]);

  // Animate the fly away progress over 2 seconds
  useEffect(() => {
    if (!flyAway) return;
    let start;
    let animationFrame;
    const duration = 2000; // 2 seconds to fly away

    function animateFlyAway(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      let progress = Math.min(elapsed / duration, 1);
      setFlyAwayProgress(progress);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateFlyAway);
      }
    }
    animationFrame = requestAnimationFrame(animateFlyAway);
    return () => cancelAnimationFrame(animationFrame);
  }, [flyAway]);

  // Main drawing effect for axes, curve, dots, and plane
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // === Axis Offsets (for positioning axes) ===
    const xAxisOffsetYPercent = 0.08;
    const yAxisOffsetXPercent = 0.03;

    // Calculate axis positions
    const xAxisY = canvas.height * (1 - xAxisOffsetYPercent);
    const yAxisX = canvas.width * yAxisOffsetXPercent;

    // === Draw Axes ===
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 2;

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, xAxisY);
    ctx.lineTo(canvas.width, xAxisY);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(yAxisX, canvas.height);
    ctx.lineTo(yAxisX, 0);
    ctx.stroke();

    // === Dots on Axes ===
    const dotOffset = canvas.height * 0.03;
    const dotSpacing = 0.1 * canvas.width;
    // Animate dots when multiplier > 2
    let startOffset =
      multiplier > 2 ? ((multiplier - 2) * 500) % dotSpacing : 0;

    // Dots along X axis
    for (let i = -1; i < canvas.width / dotSpacing + 2; i++) {
      const x =
        canvas.width * yAxisOffsetXPercent + i * dotSpacing - startOffset;
      ctx.beginPath();
      ctx.arc(x, xAxisY + dotOffset, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF";
      ctx.fill();
    }

    // Dots along Y axis
    for (let i = -1; i < canvas.width / dotSpacing + 2; i++) {
      const y =
        canvas.width * yAxisOffsetXPercent + i * dotSpacing + startOffset;
      ctx.beginPath();
      ctx.arc(yAxisX - dotOffset, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#2fa1e4";
      ctx.fill();
    }

    // === Draw Curve (hide when flying away) ===
    if (!flyAway) {
      ctx.strokeStyle = "#e50539";
      ctx.fillStyle = "rgba(229, 5, 57, 0.2)";
      ctx.lineWidth = 4;

      // Curve parameters
      const a = 1;
      const b = 1.7;
      const step = 0.01;
      const maxMultiplier = 2;
      // Deep pulse effect for curve and plane
      const pulse = multiplier >= 2 ? Math.sin(Date.now() / 300) * 0.18 : 0;

      // Curve X/Y range, pulsing with 'pulse'
      const curveStartX = yAxisX;
      const curveEndX = canvas.width * (0.7 + pulse * 0.08); // X axis endpoint pulses
      const maxCurveWidth = curveEndX - curveStartX;
      const maxCurveHeight = (xAxisY - canvas.height * 0.5) * (1 + pulse * 0.08); // Y axis endpoint pulses

      // Calculate curve points
      const points = [];
      for (let t = 0; t <= Math.min(multiplier, maxMultiplier); t += step) {
        const x = curveStartX + (t / maxMultiplier) * maxCurveWidth;
        const yVal = a * Math.pow(t, b + pulse);
        const y =
          xAxisY - (yVal / Math.pow(maxMultiplier, b + pulse)) * maxCurveHeight;
        points.push([x, y]);
      }

      // Fill under the curve
      if (points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points[0][0], xAxisY);
        for (const [x, y] of points) ctx.lineTo(x, y);
        ctx.lineTo(points[points.length - 1][0], xAxisY);
        ctx.closePath();
        ctx.fill();

        // Draw the curve line
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.stroke();
      }
    }

    // === Draw Plane at End of Curve or flying away ===
    if (planeLoaded) {
      let lastX, lastY;
      if (!flyAway) {
        // Use the end of the curve for plane position
        const pulse = multiplier >= 2 ? Math.sin(Date.now() / 300) * 0.18 : 0;
        const curveStartX = yAxisX;
        const curveEndX = canvas.width * (0.7 + pulse * 0.08);
        const maxCurveWidth = curveEndX - curveStartX;
        const maxCurveHeight = (xAxisY - canvas.height * 0.5) * (1 + pulse * 0.08);
        const a = 1;
        const b = 1.7;
        const maxMultiplier = 2;
        const t = Math.min(multiplier, maxMultiplier);
        lastX = curveStartX + (t / maxMultiplier) * maxCurveWidth;
        const yVal = a * Math.pow(t, b + pulse);
        lastY =
          xAxisY - (yVal / Math.pow(maxMultiplier, b + pulse)) * maxCurveHeight;
      } else {
        // Use the end of the curve at maxMultiplier for fly away start
        const pulse = Math.sin(Date.now() / 300) * 0.18;
        const curveStartX = yAxisX;
        const curveEndX = canvas.width * (0.7 + pulse * 0.08);
        const maxCurveWidth = curveEndX - curveStartX;
        const maxCurveHeight = (xAxisY - canvas.height * 0.5) * (1 + pulse * 0.08);
        const a = 1;
        const b = 1.7;
        const maxMultiplier = 2;
        const t = Math.min(multiplier, maxMultiplier);
        lastX = curveStartX + (t / maxMultiplier) * maxCurveWidth;
        const yVal = a * Math.pow(t, b + pulse);
        lastY =
          xAxisY - (yVal / Math.pow(maxMultiplier, b + pulse)) * maxCurveHeight;

        // Move plane diagonally up and right as it flies away
        const flyDistanceX = canvas.width * 0.4;
        const flyDistanceY = canvas.height * 0.5;
        lastX += flyAwayProgress * flyDistanceX;
        lastY -= flyAwayProgress * flyDistanceY;
      }

      ctx.save();
      // Draw the plane image at calculated position
      ctx.drawImage(
        planeImgsRef.current[planeIndex],
        lastX - 20,
        lastY - 90,
        200,
        100
      );
      ctx.restore();
    }
  // Redraw when these change
  }, [multiplier, multiplierValue, planeLoaded, planeIndex, flyAway, flyAwayProgress]);

  // Play start sound when multiplier starts
  useEffect(() => {
    if (multiplier === 0 && startAudioRef.current) {
      startAudioRef.current.currentTime = 0;
      startAudioRef.current.play().catch(() => {});
    }
  }, [multiplier]);

  // Play crash sound when multiplier stops (reaches multiplierValue)
  useEffect(() => {
    if (multiplier >= multiplierValue && crashAudioRef.current) {
      crashAudioRef.current.currentTime = 0;
      crashAudioRef.current.play().catch(() => {});
    }
  }, [multiplier, multiplierValue]);

  return (
    <div className="relative h-full w-full bg-transparent">
      {/* Sound effects */}
      <audio ref={startAudioRef} src={startSound} />
      <audio ref={crashAudioRef} src={crashSound} />

      {/* Canvas for drawing animation */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      {/* Overlay for multiplier and "Flew Away!" message */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        {showFlewAway && (
          <div className="mb-4 text-4xl font-bold text-red-500 drop-shadow-lg">
            Flew Away!
          </div>
        )}
        <div
          className="text-4xl font-bold tracking-widest"
          style={{
            color: multiplier >= multiplierValue ? "#e50539" : "white",
            textShadow: "0 2px 8px #000",
          }}
        >
          {multiplier.toFixed(2)}x
        </div>
      </div>
    </div>
  );
}
