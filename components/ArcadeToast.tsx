"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface UnlockDetail {
  name: string;
  image: string | null;
}

interface Toast extends UnlockDetail {
  id: number;
}

/**
 * ArcadeToast — listens for the global `7h:unlock` window event (fired from
 * CartContext.addToCart) and pops a game-style "ITEM UNLOCKED" achievement
 * card in the bottom-right. No props; mount once in the root layout.
 */
export default function ArcadeToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    function onUnlock(e: Event) {
      const detail = (e as CustomEvent<UnlockDetail>).detail;
      const id = counter.current++;
      setToasts((prev) => [...prev.slice(-2), { id, ...detail }]);
      // Auto-clear after the pop animation finishes.
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2400);
    }
    window.addEventListener("7h:unlock", onUnlock as EventListener);
    return () => window.removeEventListener("7h:unlock", onUnlock as EventListener);
  }, []);

  const getImageUrl = (src: string | null) => {
    if (!src) return "/shadyblue.jpg";
    if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("/")) return src;
    return `/${src}`;
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[10000] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="unlock-pop scanlines relative flex items-center gap-3 overflow-hidden border border-red-600/50 bg-black/85 px-4 py-3 pr-6 shadow-[0_0_40px_rgba(220,38,38,0.35)] backdrop-blur-xl"
        >
          {/* Item thumbnail */}
          <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-white/15 bg-white/[0.04]">
            <Image
              src={getImageUrl(t.image)}
              alt=""
              fill
              unoptimized
              className="object-contain p-1"
            />
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.35em] text-red-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-600 arcade-blink" />
              Item Unlocked
            </span>
            <span className="mt-0.5 max-w-[200px] truncate text-[11px] font-black uppercase tracking-wider text-white">
              {t.name}
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-green-400">
              + Added to cart
            </span>
          </div>

          {/* HUD corner */}
          <span className="absolute right-2 top-2 h-2.5 w-2.5 border-r-2 border-t-2 border-red-600/70" />
        </div>
      ))}
    </div>
  );
}
