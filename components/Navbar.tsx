"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import SearchModal from "@/components/SearchModal";

// Preferred display order; any other live categories are appended after these.
const CATEGORY_ORDER = ["T-Shirts", "Hoodies", "Pants", "Accessories"];

interface NavProduct {
  category?: string;
  stock?: number;
  isSoldOut?: boolean;
}

export default function Navbar() {
  const { cartItems, isLoaded } = useCart();
  const { wishlistItems } = useWishlist();
  const { data: session } = useSession();
  const cartCount = isLoaded ? cartItems.length : 0;
  const wishlistCount = isLoaded ? wishlistItems.length : 0;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  // Only surface categories that actually have in-stock products right now.
  useEffect(() => {
    let active = true;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: NavProduct[]) => {
        if (!active || !Array.isArray(data)) return;
        const present = Array.from(
          new Set(
            data
              .filter((p) => !p.isSoldOut && (p.stock === undefined || p.stock > 0))
              .map((p) => p.category)
              .filter((c): c is string => Boolean(c))
          )
        );
        present.sort((a, b) => {
          const ia = CATEGORY_ORDER.indexOf(a);
          const ib = CATEGORY_ORDER.indexOf(b);
          return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        });
        setCategories(present);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95%] md:max-w-[920px]">
        <nav className="relative flex items-center justify-between bg-white/[0.03] backdrop-blur-3xl px-10 py-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.3)] border border-white/15 rounded-none">
          {/* subtle red HUD accent line + scanline texture */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
            }}
          />
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

              <div className="pointer-events-none absolute left-[-20px] top-full pt-10 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="w-[520px] bg-black/70 backdrop-blur-2xl p-12 border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] rounded-none">
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

            <Link
              href="/shop?status=sale"
              className="font-sans text-[12px] font-black uppercase tracking-[0.3em] transition-all hover:text-white text-red-600 underline underline-offset-8 decoration-2"
            >
              SALE
            </Link>
            <Link
              href="/shop?status=new"
              className="font-sans text-[12px] font-black uppercase tracking-[0.3em] transition-all hover:text-white text-white/60"
            >
              NEW
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-7">
            <motion.button
              whileHover={{ scale: 1.15, color: "#ef4444" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className="text-white/70 transition-all"
              aria-label="Search"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </motion.button>

            {session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-white/70 hover:text-red-500 transition-all"
                aria-label="Sign out"
                title={`Signed in as ${session.user.email ?? session.user.name ?? "you"} — click to sign out`}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            ) : (
              <Link href="/login" className="text-white/70 hover:text-red-500 transition-all" aria-label="Sign in" title="Sign in">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            <Link href="/wishlist" className="relative text-white/70 hover:text-red-500 transition-all" aria-label="Wishlist">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -right-2.5 -top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] font-black text-white shadow-[0_0_8px_rgba(220,38,38,0.5)]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative text-white/70 hover:text-red-500 transition-all" aria-label="Cart">
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
    </>
  );
}
