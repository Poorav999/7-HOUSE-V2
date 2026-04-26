"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, useState } from "react";
import { TRANSITIONS } from "@/lib/animations";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  ripple?: boolean;
  className?: string;
}

/**
 * Enhanced Button with smooth animations and optional ripple effect
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  ripple = false,
  className = "",
  ...props
}: ButtonProps) {
  const [rippleArray, setRippleArray] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { x, y, id: Date.now() };
      setRippleArray([...rippleArray, newRipple]);

      setTimeout(() => {
        setRippleArray((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }

    if (props.onClick) {
      props.onClick(e);
    }
  };

  const baseStyles = "relative overflow-hidden font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-red-600 text-white hover:bg-red-700 border border-red-600 hover:border-red-500",
    secondary: "bg-white text-black hover:bg-zinc-100 border border-white",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black",
    ghost: "bg-transparent text-white hover:bg-white/10 border border-transparent",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <motion.button
      {...props}
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={{
        scale: 1.05,
        boxShadow: variant === "primary" 
          ? "0 10px 30px rgba(239, 68, 68, 0.3)" 
          : "0 10px 30px rgba(255, 255, 255, 0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={TRANSITIONS.softSpring}
    >
      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Ripple effect */}
      {ripple && rippleArray.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: 300,
            height: 300,
            opacity: 0,
            x: -150,
            y: -150,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Hover overlay gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.button>
  );
}

/**
 * Icon Button variant
 */
export function IconButton({
  children,
  className = "",
  ...props
}: Omit<HTMLMotionProps<"button">, "children"> & { children: ReactNode }) {
  return (
    <motion.button
      {...props}
      className={`p-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all ${className}`}
      whileHover={{
        scale: 1.1,
        backgroundColor: "rgba(239, 68, 68, 0.1)",
      }}
      whileTap={{ scale: 0.9 }}
      transition={TRANSITIONS.softSpring}
    >
      {children}
    </motion.button>
  );
}

/**
 * Link-style button (appears as text link)
 */
export function LinkButton({
  children,
  className = "",
  ...props
}: Omit<HTMLMotionProps<"button">, "children"> & { children: ReactNode }) {
  return (
    <motion.button
      {...props}
      className={`relative text-zinc-300 hover:text-white font-bold uppercase tracking-widest transition-colors ${className}`}
      whileHover={{ x: 4 }}
      transition={TRANSITIONS.smooth}
    >
      {children}
      
      {/* Animated underline */}
      <motion.div
        className="absolute -bottom-1 left-0 h-[2px] bg-red-600"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

/**
 * Floating Action Button (FAB)
 */
export function FAB({
  children,
  className = "",
  ...props
}: Omit<HTMLMotionProps<"button">, "children"> & { children: ReactNode }) {
  return (
    <motion.button
      {...props}
      className={`fixed bottom-8 right-8 p-4 rounded-full bg-red-600 text-white shadow-lg z-50 ${className}`}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)",
      }}
      whileTap={{ scale: 0.9 }}
      transition={TRANSITIONS.softSpring}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
    >
      {children}
    </motion.button>
  );
}

/**
 * Animated gradient button
 */
export function GradientButton({
  children,
  className = "",
  ...props
}: Omit<HTMLMotionProps<"button">, "children"> & { children: ReactNode }) {
  return (
    <motion.button
      {...props}
      className={`relative px-8 py-4 font-bold uppercase tracking-widest text-white overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={TRANSITIONS.softSpring}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 100%" }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
