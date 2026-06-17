"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * DropCountdown — full-bleed brutalist countdown to the next drop.
 *
 * Usage:
 *   <DropCountdown
 *     targetISO="2026-06-07T19:00:00+05:30"
 *     dropName="VAULT 07"
 *     ctaHref="/drops"
 *   />
 *
 * Falls back to "LIVE NOW" once target passes.
 */

interface DropCountdownProps {
  /** ISO date string for the drop time. Defaults to 14 days from now. */
  targetISO?: string;
  /** Name of the drop, e.g. "VAULT 07". */
  dropName?: string;
  /** Where the CTA links to. */
  ctaHref?: string;
  /** Subtitle copy under the headline. */
  tagline?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function diff(target: number): TimeLeft {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: ms === 0 };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function DropCountdown({
  targetISO,
  dropName = "VAULT 07",
  ctaHref = "/drops",
  tagline = "Limited release. Once it's gone, it's gone.",
}: DropCountdownProps) {
  // Lock target on mount so server/client agree.
  const [target, setTarget] = useState<number | null>(
    targetISO ? new Date(targetISO).getTime() : null
  );

  useEffect(() => {
    if (target === null) {
      const t = setTimeout(() => setTarget(Date.now() + 14 * 86_400_000), 0);
      return () => clearTimeout(t);
    }
  }, [target]);

  const [t, setT] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    if (target === null) return;
    const t = setTimeout(() => setT(diff(target)), 0);
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => { clearTimeout(t); clearInterval(id); };
  }, [target]);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-black py-28 md:py-36">
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Red beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-1/2 h-[600px] w-[150%] -translate-y-1/2 rotate-[-8deg] bg-gradient-to-r from-transparent via-red-600/10 to-transparent blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-red-600" />
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-red-600">
            {t.done ? "Now Live" : "Next Drop"}
          </p>
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-6xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-8xl lg:text-[10rem]"
        >
          {dropName}
          <span className="block text-red-600">DROPS SOON</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl font-mono text-sm uppercase tracking-widest text-white/60"
        >
          {tagline}
        </motion.p>

        {/* Counter */}
        {!t.done ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/10 md:grid-cols-4"
          >
            {units.map((u) => (
              <div
                key={u.label}
                className="flex flex-col items-start justify-between bg-black p-6 md:p-8"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
                  {u.label}
                </p>
                <p className="mt-6 font-black text-6xl tracking-tighter text-white tabular-nums md:text-8xl">
                  {pad(u.value)}
                </p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-14 rounded-sm border-2 border-red-600 bg-red-600/10 p-12 text-center"
          >
            <p className="text-3xl font-black uppercase tracking-tighter text-red-500 md:text-5xl">
              The Drop Is Live
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <Link
            href={ctaHref}
            className="group relative inline-flex items-center gap-3 border-2 border-white bg-white px-8 py-4 font-black uppercase tracking-[0.3em] text-black transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:text-white hover:shadow-[0_0_40px_rgba(239,68,68,0.45)]"
          >
            <span>{t.done ? "Shop the Drop" : "Set a Reminder"}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
            Members get 60-min early access
          </p>
        </motion.div>
      </div>
    </section>
  );
}
