"use client";

import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function GameCard({ id, name, price, image }: GameCardProps) {
  return (
    <Link href={`/product/${id}`} className="game-card group">
      {/* Top Console Buttons - NETHER STYLE */}
      <div className="game-card-topbar">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-[#ff4500]" style={{ boxShadow: '0 0 8px rgba(255, 69, 0, 0.8)' }} />
          <span className="w-3 h-3 bg-[#ff6b1a]" style={{ boxShadow: '0 0 8px rgba(255, 107, 26, 0.8)' }} />
          <span className="w-3 h-3 bg-[#ffb800]" style={{ boxShadow: '0 0 8px rgba(255, 184, 0, 0.8)' }} />
        </div>
        <span className="text-[8px] uppercase tracking-[0.3em] text-[#ff6b1a] font-minecraft font-bold">NETHER</span>
      </div>

      {/* Screen Area */}
      <div className="game-card-screen">
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-90"
          />
          {/* Lava glow effect */}
          <div className="screen-glow" />
        </div>
      </div>

      {/* Bottom Controls - PIXEL STYLE */}
      <div className="game-card-controls px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Plus Button */}
          <button className="console-btn" aria-label="Add">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="2" x2="6" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          {/* Select Knob */}
          <button className="knob-btn" aria-label="Select">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Price - Gold colors */}
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] text-[#ffb800] font-minecraft font-bold">$</span>
          <span className="text-sm font-minecraft font-bold text-[#ffb800] tracking-wider">
            {price.toString().padStart(3, "0")}
          </span>
        </div>
      </div>

      {/* Product Name */}
      <div className="px-4 py-2 border-t border-[#ff6b1a]/30">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#e8d5a0] font-minecraft truncate group-hover:text-[#ffb800] transition-colors">
          {name}
        </p>
      </div>
    </Link>
  );
}
