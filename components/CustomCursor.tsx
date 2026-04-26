"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  const springConfig = { damping: 30, stiffness: 800, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOut = () => setIsVisible(false);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseleave", handleOut);
    
    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseleave", handleOut);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999999]">
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        {/* Simple dot cursor */}
        <div className="w-3 h-3 bg-white rounded-full opacity-80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/30 rounded-full" />
      </motion.div>
    </div>
  );
}