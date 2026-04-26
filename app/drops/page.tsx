"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DropsPage() {
  // Set your next drop date here (Year, Month - 1, Day, Hour, Minute)
  const DROP_DATE = new Date(2026, 2, 15, 18, 0, 0).getTime(); // March 15, 2026, 6:00 PM
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = DROP_DATE - now;

      if (distance < 0) {
        setTimeLeft(prev => ({ ...prev, isLive: true }));
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
          isLive: false
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [ DROP_DATE ]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Text Effect */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
        <h1 className="text-[30vw] font-black uppercase tracking-tighter">7H</h1>
      </div>

      <div className="z-10 text-center">
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-red-600 mb-8 animate-pulse">
          /INCOMING TRANSMISSION //
        </h2>

        {timeLeft.isLive ? (
          <div className="space-y-8">
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">
              DROP IS LIVE
            </h1>
            <Link 
              href="/shop" 
              className="inline-block bg-white text-black font-black uppercase tracking-[0.2em] px-12 py-5 text-xl hover:bg-red-600 hover:text-white transition-all transform hover:scale-105"
            >
              Enter the Syndicate
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
              SPRING 26 <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white'}}>MANIFESTO</span>
            </h1>

            {/* The Countdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-y-2 border-white py-12">
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-black">{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Days</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-black">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Hours</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-black">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Mins</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-black">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Secs</span>
              </div>
            </div>

            <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">
              Global Drop: March 15 // 18:00 IST
            </p>
          </div>
        )}
      </div>

      {/* Decorative Serial Number */}
      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-zinc-700">
        REF: 7H-DROP-2026-003
      </div>
    </main>
  );
}