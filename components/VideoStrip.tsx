"use client";

import { useRef, useEffect } from "react";

export default function VideoStrip() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <div className="video-strip">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/haunted.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a0a] via-transparent to-[#1a0a0a]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-[1400px] mx-auto px-8">
        {/* Left decorative line */}
        <div className="hidden md:flex items-center gap-3 flex-1">
          <div className="w-2 h-2 bg-[#ff6b1a]/60 rotate-45" style={{ boxShadow: '0 0 8px rgba(255, 107, 26, 0.6)' }} />
          <div className="flex-1 h-px bg-gradient-to-r from-[#ff6b1a]/40 to-transparent" />
        </div>

        {/* Center Text */}
        <div className="flex flex-col items-center gap-1 px-8">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#ffb800]/70 font-minecraft font-bold">
            ⚔ NOW BURNING ⚔
          </span>
          <h3 className="text-sm md:text-base font-minecraft uppercase tracking-[0.2em] text-[#e8d5a0] font-bold whitespace-nowrap">
            Nether Shopping Experience
          </h3>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#ff6b1a]/50 font-minecraft">
            EPISODE 01 — LAVA EDITION
          </span>
        </div>

        {/* Right decorative line */}
        <div className="hidden md:flex items-center gap-3 flex-1">
          <div className="flex-1 h-px bg-gradient-to-l from-[#ff6b1a]/40 to-transparent" />
          <div className="w-2 h-2 bg-[#ff6b1a]/60 rotate-45" style={{ boxShadow: '0 0 8px rgba(255, 107, 26, 0.6)' }} />
        </div>
      </div>

      {/* Animated progress bar - LAVA EFFECT */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2d1514]/50">
        <div className="h-full bg-gradient-to-r from-[#ff6b1a]/80 to-[#ff4500]/40 animate-video-progress" />
      </div>
    </div>
  );
}
