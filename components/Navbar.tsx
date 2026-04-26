"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartContext";

const categories = [
  "T-Shirts",
  "Hoodies",
  "Sweatshirts",
  "Pants",
  "Jacket",
  "Accessories",
  "Caps",
  "Archive",
];

export default function Navbar() {
  const { cartItems, isLoaded } = useCart();
  const cartCount = isLoaded ? cartItems.length : 0;

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95%] md:max-w-[920px]">
      <nav className="flex items-center justify-between bg-[#111] px-10 py-3.5 shadow-[0_30px_70px_rgba(0,0,0,0.7)] border border-white/5 rounded-none">
        {/* Logo Section */}
        <Link href="/" className="flex items-center group relative">
          <Image
            src="/logo.png"
            alt="7H Logo"
            width={100}
            height={100}
            className="object-contain h-10 w-auto transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            style={{ filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))" }}
            priority
          />
        </Link>

        {/* Center Links */}
        <div className="flex items-center gap-10">
          {/* Shop with Dropdown */}
          <div className="group relative">
            <Link
              href="/shop"
              className="flex items-center gap-1.5 font-sans text-[12px] font-black uppercase tracking-[0.3em] text-white transition-all hover:text-red-500"
            >
              SHOP
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 opacity-60">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </Link>

            {/* Dropdown Menu - Sharp geometric style like reference */}
            <div className="pointer-events-none absolute left-[-20px] top-full pt-10 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="w-[520px] bg-[#0a0a0a] p-12 border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.95)] rounded-none">
                <Link
                  href="/shop"
                  className="mb-10 block border-[2px] border-white/80 py-4 text-center font-sans text-sm font-black uppercase tracking-[0.5em] text-white transition-all hover:bg-white hover:text-black"
                >
                  SHOP ALL
                </Link>

                <div className="grid grid-cols-2 gap-x-14 gap-y-7">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/shop?category=${encodeURIComponent(category.toLowerCase())}`}
                      className="font-sans text-[12px] font-black uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drops with Vector Crown */}
          <Link
            href="/drops"
            className="group/drops relative font-sans text-[12px] font-black uppercase tracking-[0.3em] text-white transition-all hover:text-red-500"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-red-600 group-hover/drops:-translate-y-0.5 transition-transform duration-300 scale-75">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z"/>
              </svg>
            </div>
            DROPS
          </Link>

          {["SALE", "NEW"].map((item) => (
            <Link
              key={item}
              href="/shop"
              className={`font-sans text-[12px] font-black uppercase tracking-[0.3em] transition-all hover:text-white ${
                item === "SALE" ? "text-red-600 underline underline-offset-8 decoration-2" : "text-white/60"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-7">
          <motion.button
            whileHover={{ scale: 1.15, color: "#ef4444" }}
            whileTap={{ scale: 0.95 }}
            className="text-white/70 transition-all"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </motion.button>

          <Link href="/wishlist" className="text-white/70 hover:text-red-500 transition-all">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </Link>

          <Link href="/cart" className="relative text-white/70 hover:text-red-500 transition-all">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-2.5 -top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] font-black text-white shadow-[0_0_8px_rgba(220,38,38,0.5)]">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}
