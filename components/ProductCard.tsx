"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { TRANSITIONS } from "@/lib/animations";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(percentX);
    mouseY.set(percentY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <Reveal>
      <Link href={`/product/${product.id}`} className="group block">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            scale: 1.02,
            transition: TRANSITIONS.softSpring,
          }}
          className="relative overflow-hidden aspect-[3/4] bg-zinc-900 border-2 border-transparent group-hover:border-red-600/30 transition-all duration-500 will-change-transform"
        >
          {/* Animated gradient overlay - moves on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-10"
            style={{
              background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(239, 68, 68, 0.15), transparent 40%)",
            }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Image with zoom effect */}
          <motion.div
            className="relative w-full h-full"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.6, ease: [0, 0, 0.2, 1] },
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{ transform: "translateZ(20px)" }}
            />
          </motion.div>

          {/* Dark overlay that fades on hover */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />

          {/* Floating badge - slides in on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-4 bg-white text-black px-2 py-1 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100"
            style={{ transform: "translateZ(40px)" }}
          >
            [ Limited Release ]
          </motion.div>

          {/* Bottom CTA - slides in on hover */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-black uppercase tracking-tighter border border-red-500 opacity-0 group-hover:opacity-100"
            style={{ transform: "translateZ(40px)" }}
          >
            View Details
          </motion.div>

          {/* Glow effect on borders */}
          <motion.div
            className="absolute inset-0 border-2 border-red-600 opacity-0 group-hover:opacity-20 blur-sm pointer-events-none"
            animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Product Info - Enhanced with animations */}
        <motion.div
          className="mt-6 flex justify-between items-start"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          <div>
            <motion.h3
              className="text-lg font-black uppercase tracking-tighter group-hover:text-red-600 transition-colors duration-300"
              whileHover={{ x: 4 }}
              transition={TRANSITIONS.smooth}
            >
              {product.name}
            </motion.h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] group-hover:text-zinc-400 transition-colors">
              {product.category} /SYNDICATE_SERIES
            </p>
          </div>
          <motion.p
            className="font-black text-xl italic font-syncopate"
            whileHover={{ scale: 1.05 }}
            transition={TRANSITIONS.softSpring}
          >
            ₹{product.price}
          </motion.p>
        </motion.div>
      </Link>
    </Reveal>
  );
}

// Reveal wrapper with animation
function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
}