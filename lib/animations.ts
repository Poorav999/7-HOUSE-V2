/**
 * Centralized Animation Configuration
 * Provides consistent timing, easing, and motion presets across the site
 */

import { Variants, Transition } from "framer-motion";

// ==================== TIMING CONSTANTS ====================
export const TIMING = {
  fast: 0.2,
  normal: 0.3,
  medium: 0.4,
  slow: 0.6,
  slower: 0.8,
  verySlow: 1.2,
} as const;

// ==================== EASING FUNCTIONS ====================
export const EASING = {
  // Smooth, elegant curves for luxury feel
  smooth: [0.25, 0.1, 0.25, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  
  // Spring-like curves
  spring: [0.34, 1.56, 0.64, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  
  // Premium curves
  luxury: [0.25, 0.46, 0.45, 0.94],
  elegant: [0.33, 1, 0.68, 1],
} as const;

// ==================== TRANSITION PRESETS ====================
export const TRANSITIONS = {
  smooth: {
    duration: TIMING.normal,
    ease: EASING.smooth,
  },
  
  smoothSlow: {
    duration: TIMING.slow,
    ease: EASING.smooth,
  },
  
  elegant: {
    duration: TIMING.medium,
    ease: EASING.elegant,
  },
  
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  } as Transition,
  
  softSpring: {
    type: "spring",
    stiffness: 200,
    damping: 25,
  } as Transition,
  
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  } as Transition,
} as const;

// ==================== ANIMATION VARIANTS ====================

// Fade animations
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: TRANSITIONS.smooth,
  },
  exit: { 
    opacity: 0,
    transition: TRANSITIONS.smooth,
  },
};

// Fade + slide up
export const fadeUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: TRANSITIONS.elegant,
  },
  exit: { 
    opacity: 0, 
    y: -30,
    transition: TRANSITIONS.smooth,
  },
};

// Fade + slide down
export const fadeDownVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: TRANSITIONS.elegant,
  },
  exit: { 
    opacity: 0, 
    y: 30,
    transition: TRANSITIONS.smooth,
  },
};

// Fade + slide left
export const fadeLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: TRANSITIONS.elegant,
  },
  exit: { 
    opacity: 0, 
    x: -30,
    transition: TRANSITIONS.smooth,
  },
};

// Fade + slide right
export const fadeRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: TRANSITIONS.elegant,
  },
  exit: { 
    opacity: 0, 
    x: 30,
    transition: TRANSITIONS.smooth,
  },
};

// Scale animations
export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: TRANSITIONS.smoothSlow,
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: TRANSITIONS.smooth,
  },
};

// Scale + fade for modals
export const modalVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: TRANSITIONS.smoothSlow,
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
    transition: TRANSITIONS.smooth,
  },
};

// Stagger container
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger item
export const staggerItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: TRANSITIONS.elegant,
  },
};

// ==================== HOVER VARIANTS ====================

export const hoverScale = {
  scale: 1.05,
  transition: TRANSITIONS.spring,
};

export const hoverScaleSmall = {
  scale: 1.02,
  transition: TRANSITIONS.softSpring,
};

export const hoverLift = {
  y: -4,
  transition: TRANSITIONS.softSpring,
};

export const hoverGlow = {
  boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
  transition: TRANSITIONS.smooth,
};

// ==================== PAGE TRANSITION VARIANTS ====================

export const pageVariants: Variants = {
  initial: { 
    opacity: 0,
    y: 20,
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.slow,
      ease: EASING.elegant,
    },
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: TIMING.medium,
      ease: EASING.smooth,
    },
  },
};

export const pageFadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: TIMING.medium,
      ease: EASING.smooth,
    },
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: TIMING.fast,
      ease: EASING.smooth,
    },
  },
};

export const pageSlideVariants: Variants = {
  initial: { 
    opacity: 0,
    x: 100,
  },
  animate: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.slow,
      ease: EASING.elegant,
    },
  },
  exit: { 
    opacity: 0,
    x: -100,
    transition: {
      duration: TIMING.medium,
      ease: EASING.smooth,
    },
  },
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Create a stagger transition with custom timing
 */
export function createStagger(
  staggerChildren = 0.1,
  delayChildren = 0
): Transition {
  return {
    staggerChildren,
    delayChildren,
  };
}

/**
 * Create a custom fade variant with configurable options
 */
export function createFadeVariant(
  direction?: "up" | "down" | "left" | "right",
  distance = 30
): Variants {
  const getTransform = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return {};
    }
  };

  return {
    hidden: {
      opacity: 0,
      ...getTransform(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: TRANSITIONS.elegant,
    },
  };
}

/**
 * Get parallax transform values based on scroll progress
 */
export function getParallaxTransform(scrollProgress: number, speed = 0.5) {
  return scrollProgress * speed * 100;
}

// ==================== SCROLL ANIMATION HOOKS ====================

export const scrollFadeInVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 50,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.slow,
      ease: EASING.elegant,
    },
  },
};

// ==================== BUTTON VARIANTS ====================

export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: TRANSITIONS.softSpring,
  },
  tap: { 
    scale: 0.95,
    transition: TRANSITIONS.smooth,
  },
};

export const buttonSlideVariants: Variants = {
  initial: { x: 0 },
  hover: { 
    x: 4,
    transition: TRANSITIONS.smooth,
  },
};

// ==================== CARD VARIANTS ====================

export const cardHoverVariants: Variants = {
  initial: { 
    scale: 1,
    y: 0,
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
  },
  hover: { 
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
    transition: TRANSITIONS.softSpring,
  },
};

// ==================== LOADING VARIANTS ====================

export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const shimmerVariants: Variants = {
  shimmer: {
    x: ["-100%", "100%"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ==================== EXPORTS ====================

const animationExports = {
  TIMING,
  EASING,
  TRANSITIONS,
  fadeVariants,
  fadeUpVariants,
  fadeDownVariants,
  fadeLeftVariants,
  fadeRightVariants,
  scaleVariants,
  modalVariants,
  staggerContainerVariants,
  staggerItemVariants,
  pageVariants,
  pageFadeVariants,
  pageSlideVariants,
  buttonVariants,
  cardHoverVariants,
  scrollFadeInVariants,
  createStagger,
  createFadeVariant,
  getParallaxTransform,
};

export default animationExports;
