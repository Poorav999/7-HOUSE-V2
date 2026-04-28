"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Manifesto — giant brutalist typography brand statement.
 *
 * Words reveal as you scroll past the section. Drop in anywhere:
 *   <Manifesto />
 *
 * Pass `lines` to override the copy.
 */

const DEFAULT_LINES = [
  "WE DON'T",
  "FOLLOW",
  "TRENDS.",
  "WE",
  "DRESS",
  { text: "THE OUTLIERS.", red: true },
];

type Line = string | { text: string; red?: boolean };

export default function Manifesto({
  lines = DEFAULT_LINES,
  signature = "— THE 7H SYNDICATE",
}: {
  lines?: Line[];
  signature?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle background drift
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden border-y border-white/5 bg-black py-32 md:py-48"
    >
      {/* Massive ghosted background numeral */}
      <motion.div
        aria-hidden
        style={{ y: bgY, x: xLeft }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="select-none text-[40rem] font-black leading-none tracking-tighter text-white/[0.025] md:text-[60rem]">
          7
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="h-px w-16 bg-red-600" />
          <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-red-600">
            Manifesto · 001
          </p>
        </motion.div>

        {/* Lines */}
        <div className="space-y-2 md:space-y-4">
          {lines.map((line, i) => {
            const isObj = typeof line === "object";
            const text = isObj ? line.text : line;
            const red = isObj ? line.red : false;
            return (
              <motion.h2
                key={i + text}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                className={`font-black uppercase leading-[0.85] tracking-tighter text-[3.5rem] md:text-[8rem] lg:text-[11rem] ${
                  red ? "text-red-600" : "text-white"
                }`}
              >
                {text}
              </motion.h2>
            );
          })}
        </div>

        {/* Signature row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: lines.length * 0.1 + 0.1 }}
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-dotted border-white/20 pt-6"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/50">
            {signature}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/30">
            EST. 2024 · CHICAGO / MUMBAI
          </p>
        </motion.div>
      </div>
    </section>
  );
}
