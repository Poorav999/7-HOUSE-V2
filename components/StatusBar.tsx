"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const statusMessages = [
  "SYSTEM_STATUS: ONLINE",
  "7H_SYNDICATE_ENCRYPTED",
  "DROP_01_ACTIVE",
  "NO_REFUNDS",
  "SECURE_CHECKOUT",
  "EXCLUSIVE_ACCESS",
];

export default function StatusBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Cycle through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statusMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 w-full bg-red-600 text-white py-1 z-[10000] overflow-hidden group"
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Scrolling text */}
          <div className="relative flex">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="flex gap-10 whitespace-nowrap text-[10px] font-black uppercase tracking-widest"
            >
              {[...Array(4)].map((_, i) => (
                <AnimatePresence mode="wait" key={i}>
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex gap-10"
                  >
                    {statusMessages.map((msg, idx) => (
                      <span key={idx}>{"/ "}{msg}{" //"}</span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              ))}
            </motion.div>
          </div>

          {/* Close button */}
          <motion.button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11M1 11L11 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>

          {/* Subtle pulse effect */}
          <motion.div
            className="absolute inset-0 bg-red-700/20"
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Alternative: Minimal StatusBar without close button
 */
export function MinimalStatusBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      className="fixed bottom-0 w-full bg-red-600 text-white py-1 z-[10000] overflow-hidden"
    >
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap text-[10px] font-black uppercase tracking-widest"
      >
        {[...Array(4)].map((_, i) => (
          <span key={i}>
            {"/ "}SYSTEM_STATUS: ONLINE{" // "}7H_SYNDICATE_ENCRYPTED{" // "}DROP_01_ACTIVE{" // "}NO_REFUNDS{" // "}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/**
 * Status notification toast (appears temporarily)
 */
export function StatusToast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: {
  message: string;
  type?: "info" | "success" | "error" | "warning";
  duration?: number;
  onClose?: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    info: "bg-blue-600",
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-600",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className={`fixed top-24 right-6 z-[10000] px-6 py-4 ${colors[type]} text-white font-bold uppercase tracking-widest text-sm shadow-lg`}
        >
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className="absolute bottom-0 left-0 h-1 bg-white/30"
          />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
