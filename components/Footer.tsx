"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="w-full bg-[#0a0a0a] text-white border-t border-white/10 pt-20 px-4 md:px-8 pb-8 font-mono overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* Left: Contact Info */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            <div className="flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-3 mb-1">
                <Image src="/logo.png" alt="7H Logo" width={40} height={40} className="object-contain brightness-110" />
                <h3 className="text-xl font-black uppercase tracking-tighter">7 HOUSES</h3>
              </div>
              <p className="text-sm italic font-serif">clothing store</p>
            </div>

            <div className="flex flex-col gap-5 text-sm uppercase tracking-widest font-bold">
              <span className="text-red-500">CONTACT US</span>
              <div className="flex flex-col gap-1 text-white/80">
                <p>7H STUDIO</p>
                <p>26 NEW LANE, WOLF ST</p>
                <p>CHICAGO 60070</p>
              </div>
              <div className="flex flex-col gap-3 mt-2 text-white transition-colors">
                <a href="mailto:hello@7houses.com" className="flex items-center gap-2 hover:text-red-500 w-fit">
                  HELLO@7HOUSES.COM <span className="text-lg leading-none mt-[-2px]">↗</span>
                </a>
                <a href="tel:+919999991626" className="flex items-center gap-2 hover:text-red-500 w-fit">
                  +91 (999) 999-1626 <span className="text-lg leading-none mt-[-2px]">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Newsletter */}
          <div className="flex flex-col gap-8 md:pl-20">
            <p className="text-[13px] md:text-sm font-bold uppercase tracking-widest leading-relaxed">
              JOIN TO RECEIVE EXCLUSIVE OFFERS AND 15% OFF YOUR FIRST ORDER.
            </p>

            {status === "success" ? (
              <div className="border border-red-600/40 bg-red-600/10 px-6 py-4">
                <p className="text-sm font-black uppercase tracking-widest text-red-400">
                  YOU&apos;RE IN. WELCOME TO THE SYNDICATE.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative w-full group">
                <label className="text-[10px] uppercase text-white/50 tracking-[0.2em] mb-2 block">
                  Your Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  required
                  disabled={status === "loading"}
                  className="w-full bg-transparent border-b-2 border-red-800 pb-3 pt-2 text-sm uppercase tracking-widest outline-none focus:border-red-500 transition-colors text-white placeholder-white/30 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-0 bottom-[14px] text-sm font-black uppercase tracking-widest hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "SEND"}
                </button>
                {status === "error" && (
                  <p className="mt-2 text-[10px] text-red-500 uppercase tracking-widest">
                    Something went wrong. Try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-5 border border-white/20 mb-12">
          {[
            { label: "ALL", href: "/shop" },
            { label: "DROPS", href: "/drops" },
            { label: "NEW", href: "/shop?status=new" },
            { label: "SALE", href: "/shop?status=sale" },
            { label: "ABOUT", href: "/about" },
          ].map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              className={`py-8 text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-colors ${
                idx !== 4 ? "border-b md:border-b-0 md:border-r border-white/20" : ""
              } ${idx % 2 === 0 && idx !== 4 ? "border-r md:border-r-0" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-between items-center gap-6 mb-16 text-xs font-bold uppercase tracking-[0.2em] px-4 md:px-12 text-white/80">
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/60 hover:text-red-500 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-white/60 hover:text-red-500 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 1.2h3.7l-8 9.1 9.4 12.5h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9zM17.6 20.6h2L6.5 3.3H4.3z" />
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-white/60 hover:text-red-500 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3.3v13.4a2.5 2.5 0 1 1-2.5-2.5c.26 0 .5.04.74.11V8.6a5.86 5.86 0 0 0-.74-.05 5.88 5.88 0 1 0 5.88 5.88V8.1a7.5 7.5 0 0 0 4.36 1.39V6.16a4.3 4.3 0 0 1-3.45-.36z" />
              </svg>
            </a>
          </div>
          <button
            onClick={() => window.dispatchEvent(new Event("7h:open-currency"))}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            INR <span className="text-[16px]">🇮🇳</span>
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-8">
          <div className="flex flex-col gap-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            <p>BUILT BY POORAV 7HOUSES</p>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-white">PRIVACY POLICY</Link>
              <Link href="/terms" className="hover:text-white">TERMS & CONDITION</Link>
            </div>
          </div>

          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            © 2026 7 HOUSES CLOTHING STORE
          </p>
        </div>
      </div>
    </footer>
  );
}
