"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // For Expanding Box
  const expandingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: expandingProgress } = useScroll({
    target: expandingRef,
    offset: ["start end", "end start"]
  });
  
  const boxWidth = useTransform(expandingProgress, [0, 0.4], ["20%", "100%"]);
  const boxScale = useTransform(expandingProgress, [0, 0.4], [0.8, 1]);

  return (
    <main ref={containerRef} className="bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* 1. Cinematic Intro (100vh) */}
      <section className="h-screen w-full flex items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <motion.p
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.98, 1, 0.98] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-base font-black uppercase tracking-[1em] text-white/40"
          >
            Scroll Down
          </motion.p>
        </motion.div>
        
        {/* Subtle Background textures */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent)]" />
        </div>
      </section>

      {/* 2. Expanding Box Transition */}
      <section ref={expandingRef} className="relative h-[120vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ width: boxWidth, scale: boxScale }}
          className="relative h-[80vh] overflow-hidden"
        >
          <Image
            src="/hero-cartoon.png"
            alt="Dynamic Story"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </section>

      {/* 3. Our Story Section */}
      <section className="py-40 px-8 text-center max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-red-600 font-black uppercase tracking-[0.5em] text-sm mb-10"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1]"
        >
          &quot;7 HOUSES began as an idea to break away from noise. We don&apos;t chase trends. 
          We build pieces that last, carry identity, and speak without shouting. 
          What started small is now a movement.&quot;
        </motion.p>
      </section>

      {/* 4. Mixed Grid Collage */}
      <section className="py-20 px-4 md:px-20 relative">
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">
            The Story <span className="text-red-600">We Wear</span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-4 h-[120vh]">
          {/* Large Left Item */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="col-span-8 row-span-2 relative overflow-hidden group"
          >
            <Image src="/hero-cartoon.png" alt="Campaign 1" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

          {/* Small Top Right */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             whileHover={{ scale: 1.05 }}
             className="col-span-4 relative overflow-hidden group"
          >
            <Image src="/black_hoodie.png" alt="Black Hoodie" fill className="object-contain bg-[#111] p-10 transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

          {/* Small Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="col-span-4 relative overflow-hidden group"
          >
            <Image src="/7H_red_tshirt.png" alt="7H Red Tee" fill className="object-contain bg-[#0a0a0a] p-10 transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

          {/* Wide Bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="col-span-12 relative h-[60vh] overflow-hidden group"
          >
            <video src="/haunted.mp4" autoPlay loop muted className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-[10px] font-black uppercase tracking-[1em] text-white/50">Synthetic Vision</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Split Section: Culture */}
      <section className="py-40 grid grid-cols-1 lg:grid-cols-2 bg-[#050505]">
        <div className="grid grid-cols-2 gap-4 p-8">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="relative aspect-square overflow-hidden"
           >
              <Image src="/7H_green_tshirt.png" alt="Green" fill className="object-contain p-8 bg-[#111]" />
           </motion.div>
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="relative aspect-square overflow-hidden mt-12"
           >
              <Image src="/blueGradint_hoodie.png" alt="Blue Gradient" fill className="object-contain p-8 bg-[#0a0a0a]" />
           </motion.div>
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="relative aspect-square overflow-hidden -mt-6"
           >
              <Image src="/pink_hoodie.png" alt="Pink" fill className="object-contain p-8 bg-[#0a0a0a]" />
           </motion.div>
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="relative aspect-square overflow-hidden mt-6"
           >
              <Image src="/white_hoodie.png" alt="White" fill className="object-contain p-8 bg-[#111]" />
           </motion.div>
        </div>

        <div className="flex flex-col justify-center px-12 lg:px-24">
           <motion.h2 
             initial={{ x: 50, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="text-[12px] font-black uppercase tracking-[0.5em] text-red-600 mb-6"
           >
              Our Culture
           </motion.h2>
           <motion.p 
             initial={{ x: 50, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-8"
           >
              7 HOUSES is built for those who move differently. We exist between street and precision.
           </motion.p>
           <motion.p 
             initial={{ x: 50, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg text-white/50 leading-relaxed font-medium uppercase tracking-wide"
           >
              Every piece carries intention, balance, and identity.
           </motion.p>
        </div>
      </section>

      {/* Footer link back */}
      <footer className="py-20 border-t border-white/5 text-center">
         <Link href="/" className="text-[10px] font-black uppercase tracking-[0.5em] hover:text-red-500 transition-colors">
            Back to Home
         </Link>
      </footer>
    </main>
  );
}
