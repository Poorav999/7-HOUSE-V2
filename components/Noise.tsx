"use client";

export default function Noise() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-[9998] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      }}
    ></div>
  );
}