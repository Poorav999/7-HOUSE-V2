"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function AboutScroller() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center bg-black">
      {/* Zooming Background */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero-cartoon.png"
          alt="About Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 max-w-4xl px-8 text-center"
      >
        <p className="mb-6 text-[12px] font-black uppercase tracking-[0.6em] text-red-600">
          About Us
        </p>
        
        <h2 className="mb-8 text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
          7 HOUSE is more than clothing, <br /> it&apos;s a statement.
        </h2>

        <p className="mb-12 text-lg md:text-xl font-medium tracking-wide text-white/60 leading-relaxed max-w-2xl mx-auto">
          Built from culture, driven by identity, and made for those who don’t follow trends but define them.
        </p>

        <Link
          href="/about"
          className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-white/20 px-12 py-5 font-black uppercase tracking-[0.4em] text-white transition-all hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
        >
          View More
        </Link>
      </motion.div>
    </section>
  );
}
