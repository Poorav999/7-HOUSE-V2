"use client";

import { useEffect, useRef } from "react";

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  width: number;
  opacity: number;
}

export default function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const COUNT = 65;
    const ANGLE = -12; // degrees tilt (wind effect)
    const RAD = (ANGLE * Math.PI) / 180;
    const cos = Math.cos(RAD);
    const sin = Math.sin(RAD);

    const drops: Drop[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 4 + Math.random() * 5,
      length: 14 + Math.random() * 28,
      width: 0.4 + Math.random() * 0.8,
      opacity: 0.06 + Math.random() * 0.18,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach((d) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(180, 220, 255, ${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.lineCap = "round";

        const dx = d.length * cos;
        const dy = d.length * sin;

        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + dx, d.y + dy);
        ctx.stroke();

        d.y += d.speed;
        d.x += d.speed * Math.tan(RAD);

        if (d.y > canvas.height + d.length) {
          d.y = -d.length;
          d.x = Math.random() * canvas.width;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
    />
  );
}
