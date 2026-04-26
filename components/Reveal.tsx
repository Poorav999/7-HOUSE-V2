"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { EASING, TIMING } from "@/lib/animations";

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
  className?: string;
}

export default function Reveal({ 
  children, 
  width = "fit-content",
  direction = "up",
  delay = 0.15,
  duration = TIMING.slow,
  distance = 50,
  once = true,
  stagger = false,
  staggerDelay = 0.1,
  className = "",
}: RevealProps) {
  
  // Create directional transform
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
        return { y: distance };
    }
  };

  const variants: Variants = stagger
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : {
        hidden: { 
          opacity: 0, 
          ...getTransform(),
        },
        visible: { 
          opacity: 1, 
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: EASING.elegant,
          },
        },
      };

  return (
    <div style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Reveal item for use inside stagger containers
 */
export function RevealItem({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
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

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Simple fade reveal (no directional movement)
 */
export function FadeReveal({ 
  children, 
  delay = 0,
  duration = TIMING.medium,
}: { 
  children: ReactNode; 
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: EASING.smooth }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale reveal for emphasis
 */
export function ScaleReveal({ 
  children, 
  delay = 0,
}: { 
  children: ReactNode; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: TIMING.slow, 
        delay, 
        ease: EASING.elegant,
      }}
    >
      {children}
    </motion.div>
  );
}