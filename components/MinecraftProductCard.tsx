"use client";

import Image from "next/image";
import { useState } from "react";

interface MinecraftProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
  rarity?: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
  stats?: Array<{
    label: string;
    value: string;
  }>;
  href?: string;
}

export default function MinecraftProductCard({
  title,
  price,
  imageUrl,
  rarity = "Rare",
  stats = [
    { label: "Quality", value: "Premium" },
    { label: "Limited", value: "1/100" },
  ],
  href = "#",
}: MinecraftProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => setIsExpanded(true), 100);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    setIsHovered(false);
  };

  const getRarityColor = () => {
    switch (rarity) {
      case "Legendary":
        return {
          bg: "bg-mc-gold",
          text: "text-mc-obsidian",
          border: "border-mc-gold",
        };
      case "Epic":
        return {
          bg: "bg-mc-diamond",
          text: "text-mc-obsidian",
          border: "border-mc-diamond",
        };
      case "Rare":
        return {
          bg: "bg-mc-grass",
          text: "text-mc-cobblestone",
          border: "border-mc-grass",
        };
      case "Uncommon":
        return {
          bg: "bg-mc-iron",
          text: "text-mc-obsidian",
          border: "border-mc-iron",
        };
      default:
        return {
          bg: "bg-mc-gravel",
          text: "text-mc-sand",
          border: "border-mc-gravel",
        };
    }
  };

  const rarityColor = getRarityColor();

  return (
    <div
      className="relative group cursor-pointer transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => (window.location.href = href)}
    >
      {/* Main Card Container - Obsidian Border */}
      <div
        className={`
          relative w-full overflow-hidden
          bg-mc-cobblestone border-4 border-mc-obsidian
          transition-all duration-500
          ${
            isHovered
              ? "shadow-[0_0_32px_rgba(10,10,10,1),inset_0_0_20px_rgba(20,184,224,0.15)]"
              : "shadow-[0_6px_0_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
          }
        `}
        style={{
          height: isExpanded ? "460px" : "300px",
        }}
      >
        {/* Top Bar - Obsidian Frame with Diamond Accent */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-mc-obsidian-light to-mc-obsidian border-b-3 border-mc-obsidian-dark flex items-center justify-between px-3 z-20">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 bg-mc-diamond animate-pulse" />
            <div className="w-2.5 h-2.5 bg-mc-diamond-light" />
            <div className="w-2.5 h-2.5 bg-mc-diamond-dark" />
          </div>
          <span className="text-[8px] font-minecraft text-mc-diamond uppercase tracking-widest font-bold">
            BLOCK
          </span>
        </div>

        {/* Image Container with Spin Animation */}
        <div className="relative w-full h-44 mt-7 overflow-hidden flex items-center justify-center bg-gradient-to-b from-mc-stone to-mc-gravel">
          {/* Spinning Image */}
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              animation: isHovered ? "spin-360 2s linear infinite" : "none",
            }}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover brightness-100 group-hover:brightness-110 transition-all duration-300"
              priority
            />

            {/* Obsidian Border Overlay */}
            <div className="absolute inset-0 border-2 border-mc-obsidian-dark opacity-40" />
          </div>

          {/* Premium Shine Overlay (on hover) */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-mc-diamond/15 via-transparent to-transparent opacity-60 animate-pulse" />
          )}

          {/* Corner Obsidian Accent (on hover) */}
          {isHovered && (
            <div className="absolute top-1 right-1 w-4 h-4 border-2 border-mc-diamond opacity-70" />
          )}
        </div>

        {/* Product Info Section - Always Visible */}
        <div className="px-3 py-2 border-t-3 border-mc-obsidian bg-mc-cobblestone">
          {/* Title */}
          <h3 className="font-minecraft text-mc-sand text-xs uppercase tracking-wider truncate font-bold">
            {title}
          </h3>

          {/* Price */}
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-[9px] font-minecraft text-mc-gold font-bold">$</span>
            <span className="font-minecraft text-mc-gold font-bold text-sm">
              {price.toFixed(2)}
            </span>
          </div>

          {/* Rarity Badge */}
          <div className="mt-2 inline-block">
            <span
              className={`
                text-[9px] font-minecraft px-2 py-1 border-2 uppercase tracking-wider font-bold
                ${rarityColor.bg} ${rarityColor.text} ${rarityColor.border}
              `}
            >
              {rarity}
            </span>
          </div>
        </div>

        {/* Stats Section - Shows on Hover (Expands Card) */}
        {isExpanded && (
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-mc-obsidian via-mc-obsidian/80 to-mc-obsidian/40 border-t-4 border-mc-diamond px-3 py-3"
            style={{
              animation: "slideUp 0.3s ease-out forwards",
              maxHeight: "160px",
              overflow: "hidden",
            }}
          >
            {/* Stats Grid */}
            <div className="space-y-1.5">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-mc-obsidian-light pb-1"
                  style={{
                    animation: `slideInLeft 0.3s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <span className="text-[8px] font-minecraft text-mc-sand uppercase tracking-wider font-bold">
                    {stat.label}
                  </span>
                  <span className="text-[8px] font-minecraft text-mc-diamond font-bold pixel-text">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Hover Indicator */}
            <div className="mt-2 text-center text-[7px] font-minecraft text-mc-diamond-light opacity-70 uppercase tracking-widest">
              ▸ CLICK TO VIEW
            </div>
          </div>
        )}

        {/* Obsidian Border Frame - 3D Effect */}
        <div className="absolute inset-0 border-4 border-mc-obsidian pointer-events-none" />

        {/* Global Animations */}
        <style>{`
          @keyframes spin-360 {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(360deg);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .pixel-text {
            font-family: 'VT323', 'Courier New', monospace;
            letter-spacing: 0.1em;
          }
        `}</style>
      </div>

      {/* Obsidian Glow Effect (below card) */}
      {isHovered && (
        <div
          className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mc-diamond to-transparent opacity-60 blur-sm"
          style={{
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}
