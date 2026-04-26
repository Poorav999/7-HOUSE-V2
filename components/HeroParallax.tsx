"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ReactNode, useRef } from "react";

interface HeroParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Hero section with parallax background effect
 */
export default function HeroParallax({ 
  children, 
  speed = 0.5,
  className = "",
}: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Multi-layer parallax for complex hero sections
 */
export function MultiLayerParallax({ 
  background,
  midground,
  foreground,
  className = "",
}: {
  background: ReactNode;
  midground?: ReactNode;
  foreground: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yMidground = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityForeground = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Background layer - slowest */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 will-change-transform"
      >
        {background}
      </motion.div>

      {/* Midground layer - medium speed */}
      {midground && (
        <motion.div 
          style={{ y: yMidground }}
          className="absolute inset-0 will-change-transform"
        >
          {midground}
        </motion.div>
      )}

      {/* Foreground - static with fade */}
      <motion.div 
        style={{ opacity: opacityForeground }}
        className="relative z-10 will-change-opacity"
      >
        {foreground}
      </motion.div>
    </div>
  );
}

/**
 * Simple parallax image wrapper
 */
export function ParallaxImage({ 
  src, 
  alt, 
  speed = 0.5,
  className = "",
}: { 
  src: string; 
  alt: string; 
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 50}%`, `${speed * 50}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image 
          src={src} 
          alt={alt} 
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
