"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ProductMarquee from "@/components/ProductMarquee";
import AboutScroller from "@/components/AboutScroller";
import IntroSequence from "@/components/IntroSequence";
import DropCountdown from "@/components/DropCountdown";
import Lookbook from "@/components/Lookbook";
import Manifesto from "@/components/Manifesto";
import NewsletterVIP from "@/components/NewsletterVIP";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}







export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="hide-scrollbar w-full overflow-y-auto overflow-x-hidden bg-black selection:bg-red-500 selection:text-white">
      {/* Intro Video Sequence */}
      <IntroSequence />
      {/* ═══════════ Full-Screen Blurred Hero ═══════════ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Blurred Background Image */}
        <Image
          src="/hero-cartoon.png"
          alt="7H editorial campaign"
          fill
          priority
          className="object-cover scale-110"
          style={{ filter: "blur(12px)" }}
        />

        {/* Dark overlays for contrast */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

        {/* Hero Text Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-sm font-medium uppercase tracking-[0.4em] text-white/80"
          >
            Dress the unconventional
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-9xl lg:text-[12rem] font-black uppercase leading-none tracking-tighter text-white drop-shadow-[0_4px_60px_rgba(255,255,255,0.15)]"
          >
            Wear
            <br />
            The
            <br />
            Hype
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10"
          >
            <Link
              href="/shop"
              className="border-2 border-white px-10 py-4 font-black uppercase tracking-[0.3em] text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
            >
              Shop Now
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                Scroll
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/50"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ Drop Countdown ═══════════ */}
      <DropCountdown targetISO="2026-06-07T19:00:00+05:30" dropName="VAULT 07" />

      {/* ═══════════ About Story Section (Parallax) ═══════════ */}
      <AboutScroller />

      {/* ═══════════ Premium Product Showcase — Horizontal Marquee ═══════════ */}
      <section className="relative w-full bg-black py-28 overflow-hidden">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 px-8 text-left"
        >
          <div className="flex items-center gap-4">
             <div className="h-px w-12 bg-red-600" />
             <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-red-600">
               Cinematic Experience
             </p>
          </div>
          <h2 className="mt-4 text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
            Live Drops
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="flex gap-16 px-8 overflow-hidden">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="w-[360px] h-[480px] shrink-0 rounded-2xl bg-white/5 animate-pulse border border-white/10" />
               ))}
            </div>
          ) : error || products.length === 0 ? (
            <div className="py-24 text-center font-mono uppercase">
              <p className="text-xl font-black tracking-[0.3em] text-red-600">
                inventory offline
              </p>
            </div>
          ) : (
            <ProductMarquee products={products} />
          )}
        </AnimatePresence>
      </section>

      {/* ═══════════ Lookbook ═══════════ */}
      <Lookbook />

      {/* ═══════════ Manifesto ═══════════ */}
      <Manifesto />

      {/* ═══════════ Why 7 House Section ═══════════ */}
      <section className="relative w-full bg-[#111] py-24 border-t border-white/5 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="flex items-end gap-3 text-white">
              <span className="font-serif italic lowercase font-normal text-4xl md:text-6xl tracking-tight">why</span>
              <span className="font-black uppercase text-red-600 text-4xl md:text-6xl tracking-tighter">7 HOUSE?</span>
            </h2>
          </motion.div>

          {/* Stepped Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative min-h-[600px] mt-6 border-l border-dotted border-transparent">
            {/* Value Blocks */}
            {[
              {
                title: "FAST SHIPPING",
                desc: "GET YOUR ORDER DELIVERED QUICKLY, STRAIGHT TO YOUR DOOR.",
                sub: "3-5 BUSINESS DAYS",
                marginTop: "mt-0 md:mt-0",
                delay: 0
              },
              {
                title: "EASY RETURNS",
                desc: "RETURN YOUR ITEMS HASSLE-FREE. OUR FLEXIBLE POLICY MAKES IT SIMPLE.",
                sub: "7 DAYS FROM DELIVERY",
                marginTop: "mt-12 md:mt-32",
                delay: 0.15
              },
              {
                title: "SECURE PAYMENTS",
                desc: "PAY FOR YOUR ORDER WITH CONFIDENCE. YOUR DETAILS ARE ALWAYS PROTECTED.",
                sub: "BANK-GRADE SSL PROTECTION",
                marginTop: "mt-12 md:mt-64",
                delay: 0.3
              },
              {
                title: "CUSTOMER SUPPORT",
                desc: "GET THE HELP YOU NEED, FAST. OUR DEDICATED TEAM IS HERE FOR YOU.",
                sub: "HELLO@7HOUSE.COM",
                marginTop: "mt-12 md:mt-96",
                delay: 0.45
              }
            ].map((block, idx) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: block.delay }}
                className={`relative px-6 py-6 ${idx !== 3 ? 'md:border-r md:border-dotted border-white/20' : ''}`}
              >
                <div className={`flex flex-col gap-10 ${block.marginTop}`}>
                  <p className="font-mono text-[13px] md:text-sm leading-relaxed text-white uppercase max-w-[250px] font-medium tracking-wide">
                    {block.desc}
                  </p>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-black text-3xl md:text-[2rem] uppercase tracking-tighter text-white leading-[0.9]">
                      {block.title}
                    </h3>
                    <p className="font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-widest mt-1">
                      {block.sub}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ Newsletter VIP ═══════════ */}
      <NewsletterVIP onSubscribe={async (email) => { console.log("subscribe:", email); }} />
    </main>
  );
}
