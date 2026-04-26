"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { useRef } from "react";

interface HeroProduct {
  id: string;
  name: string;
  price: number;
  images?: string[];
}

interface HeroSectionProps {
  heroProduct: HeroProduct;
  heroImage?: string;
}

export default function HeroSection({ heroProduct, heroImage }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax for background image - moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]);

  return (
    <section ref={ref} className="col-span-3 relative flex flex-col justify-end border-r-[6px] border-[#2e1b46] overflow-hidden retro-panel halftone-texture min-h-screen">
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <div className="relative h-full w-full overflow-hidden">
          {heroImage ? (
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative h-full w-full"
            >
              <Image
                src={heroImage}
                alt="Hero Background"
                fill
                unoptimized
                className="object-cover cartoon-filter brightness-[0.45]"
                priority
              />
            </motion.div>
          ) : heroProduct ? (
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative h-full w-full"
            >
              <Image
                src={!heroProduct.images?.[0] ? "/shadyblue.jpg" : (heroProduct.images[0].startsWith("http") || heroProduct.images[0].startsWith("/") ? heroProduct.images[0] : `/${heroProduct.images[0]}`)}
                alt={heroProduct.name}
                fill
                unoptimized
                className="object-cover brightness-[0.35] cartoon-filter"
              />
            </motion.div>
          ) : null}
        </div>
        
        {/* Animated gradient overlay with Retro Comic feel and Halloween tint */}
        <motion.div 
          animate={{ opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-t from-[#09050f] via-[#2a1a3e]/70 to-transparent pointer-events-none"
        ></motion.div>
        <motion.div 
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-transparent via-[#ff7a1a]/20 to-[#8B1538]/35 pointer-events-none"
        ></motion.div>
        
        {/* Comic Speed Lines with animation */}
        <motion.div 
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 speed-lines pointer-events-none"
        ></motion.div>
      </motion.div>

      {/* Foreground Content - stays fixed relative to viewport */}
      <div className="absolute bottom-8 md:bottom-16 left-6 md:left-12 right-6 md:right-24 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 overflow-visible">
        <Reveal delay={0.2} distance={60}>
          <div className="flex flex-col gap-2 md:gap-3 relative max-w-full overflow-visible">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-4xl lg:text-6xl font-serif italic text-[#ffb347] tracking-widest text-left animate-enhanced-pulse"
              style={{
                textShadow: '2px 2px 0px #ff7a1a, 4px 4px 0px #1a1026, 0 0 20px rgba(255, 179, 71, 0.5)'
              }}
            >
              haunted
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="text-[16vw] md:text-[10vw] lg:text-[9vw] leading-[0.9] font-black font-syncopate uppercase tracking-tighter text-white cartoon-text-white max-w-full relative pr-12 md:pr-20 animate-enhanced-pulse"
              style={{
                position: 'relative',
                zIndex: 1
              }}
            >
              DROPS
              {/* Comic burst decoration - positioned relative to DROPS */}
              <motion.span
                className="absolute top-0 md:-top-4 right-0 md:-right-4 text-4xl md:text-6xl"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(255, 230, 109, 1))',
                  zIndex: 10
                }}
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚡
              </motion.span>
            </motion.h3>
          </div>
        </Reveal>

        {heroProduct && (
          <Reveal delay={0.4} direction="left">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <MagneticButton
                href={`/product/${heroProduct.id}`}
                strength={0.25}
                className="group relative bg-[#ff7a1a] text-white px-6 md:px-10 py-4 md:py-5 font-black uppercase tracking-widest overflow-hidden flex shrink-0 items-center justify-center retro-button hover:shadow-[0_0_30px_rgba(255,122,26,0.8)] transition-all"
              >
                <motion.span
                  className="absolute inset-0 bg-[#5f2a8a]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <span className="relative z-10 text-base md:text-lg" style={{ textShadow: '2px 2px 0px rgba(26, 26, 46, 0.5)' }}>
                  Enter the Crypt ★
                </span>
              </MagneticButton>
            </motion.div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
