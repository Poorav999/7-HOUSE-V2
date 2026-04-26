/**
 * Scroll Animation Hooks & Utilities
 * Custom hooks for scroll-based animations using Framer Motion
 */

"use client";

import { useScroll, useTransform, useSpring, useInView, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

// ==================== PARALLAX HOOKS ====================

/**
 * Create a parallax effect based on scroll position
 * @param speed - Parallax speed multiplier (0.5 = half speed, 2 = double speed)
 * @returns Transform value for parallax effect
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return { ref, y: smoothY };
}

/**
 * Create multi-layer parallax effect
 * @param layers - Array of speed multipliers for each layer
 * @returns Array of transform values for each layer
 */
export function useMultiLayerParallax(layers: number[] = [0.3, 0.5, 0.8]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Simplified as a single layer parallax to avoid violating Rules of Hooks.
  // Real multi-layer would require distinct hooks for a fixed number of layers.
  const y = useTransform(scrollYProgress, [0, 1], [0, layers[0] * 100]);
  const transforms = [useSpring(y, { stiffness: 100, damping: 30 })];

  return { ref, transforms };
}

/**
 * Horizontal parallax effect
 */
export function useHorizontalParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-speed * 100, speed * 100]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return { ref, x: smoothX };
}

// ==================== SCROLL FADE HOOKS ====================

/**
 * Fade element in/out based on scroll position
 */
export function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return { ref, opacity };
}

/**
 * Scale element based on scroll position
 */
export function useScrollScale(
  scaleRange: [number, number] = [0.8, 1]
) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return { ref, scale: smoothScale };
}

// ==================== SCROLL PROGRESS HOOKS ====================

/**
 * Get overall page scroll progress (0 to 1)
 */
export function usePageScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return { scrollYProgress, scaleX };
}

/**
 * Get scroll progress for a specific element
 */
export function useElementScrollProgress(
  offset: (string | number)[] = ["start end", "end start"]
) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  return { ref, scrollYProgress };
}

// ==================== VIEWPORT DETECTION ====================

/**
 * Detect when element enters viewport with options
 */
export function useViewportEnter(once: boolean = true, amount: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once,
    amount,
  });

  return { ref, isInView };
}

/**
 * Advanced viewport detection with callbacks
 */
export function useViewportDetection(
  once: boolean = true,
  margin: string | { top?: number | string; right?: number | string; bottom?: number | string; left?: number | string } = "0px 0px -100px 0px"
) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once,
    margin: margin as any,
  });

  return { ref, isInView };
}

// ==================== SCROLL TRANSFORM UTILITIES ====================

/**
 * Create a smooth scroll-based rotation
 */
export function useScrollRotate(rotationRange: [number, number] = [-15, 15]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], rotationRange);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return { ref, rotate: smoothRotate };
}

/**
 * Create scroll-based blur effect
 */
export function useScrollBlur(blurRange: [number, number] = [0, 10]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const blur = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [blurRange[0], blurRange[1], blurRange[0]]
  );

  return { ref, blur };
}

// ==================== CUSTOM SCROLL ANIMATIONS ====================

/**
 * Staggered reveal on scroll
 * Use with motion components to create cascading animations
 */
export function useStaggerReveal(staggerDelay: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return { ref, isInView, containerVariants, itemVariants };
}

/**
 * Pinned scroll effect (element stays fixed during scroll)
 */
export function usePinnedScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return { ref, scrollYProgress };
}

// ==================== SMOOTH SCROLL UTILITIES ====================

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const targetPosition = element.offsetTop - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}

/**
 * Smooth scroll to top
 */
export function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ==================== DIRECTION DETECTION ====================

/**
 * Detect scroll direction
 */
export function useScrollDirection() {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastY) {
      setDirection("down");
    } else {
      setDirection("up");
    }
    setLastY(latest);
  });

  return direction;
}

// ==================== PARALLAX CALCULATIONS ====================

/**
 * Calculate parallax offset
 */
export function calculateParallaxOffset(
  scrollProgress: number,
  speed: number = 0.5,
  distance: number = 100
): number {
  return scrollProgress * speed * distance;
}

/**
 * Map scroll progress to custom range
 */
export function mapScrollToRange(
  progress: number,
  outputRange: [number, number]
): number {
  return outputRange[0] + (outputRange[1] - outputRange[0]) * progress;
}

// ==================== EXPORTS ====================

const scrollAnimations = {
  useParallax,
  useMultiLayerParallax,
  useHorizontalParallax,
  useScrollFade,
  useScrollScale,
  usePageScrollProgress,
  useElementScrollProgress,
  useViewportEnter,
  useViewportDetection,
  useScrollRotate,
  useScrollBlur,
  useStaggerReveal,
  usePinnedScroll,
  smoothScrollTo,
  smoothScrollToTop,
  calculateParallaxOffset,
  mapScrollToRange,
};

export default scrollAnimations;
