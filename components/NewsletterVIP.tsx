"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * NewsletterVIP — full-bleed VIP signup with manifesto copy.
 *
 *   <NewsletterVIP />
 *
 * Pass `onSubscribe` to hook into your real backend. No-op by default.
 */

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterVIP({
  onSubscribe,
}: {
  onSubscribe?: (email: string) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      if (onSubscribe) await onSubscribe(email);
      else await new Promise((r) => setTimeout(r, 700)); // demo delay
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-red-600 py-28 md:py-36">
      {/* Diagonal stripes background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 14px, rgba(0,0,0,0.6) 14px 16px)",
        }}
      />
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-black/40 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 gap-16 px-6 md:px-8 lg:grid-cols-12 lg:items-end">
        {/* Left — copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-black" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-black">
              Members Only · Vol 001
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black md:text-7xl lg:text-8xl"
          >
            Join the
            <span className="block italic font-serif lowercase font-light text-black/80">
              syndicate.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-xl font-mono text-sm uppercase leading-relaxed tracking-widest text-black/80"
          >
            Drop alerts 60 minutes before the public. Members-only colorways.
            Studio cuts that never hit the shop. — No spam. Ever.
          </motion.p>

          {/* Perks chips */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
            }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {[
              "Early Access",
              "15% Off First Order",
              "Studio Cuts",
              "Birthday Drop",
            ].map((perk) => (
              <motion.li
                key={perk}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                className="border border-black px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-black"
              >
                {perk}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="border-2 border-black bg-black p-8 text-white"
          >
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-red-500">
              · Enlist Below
            </p>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-6"
                >
                  <p className="text-3xl font-black uppercase tracking-tighter text-white">
                    You&apos;re in.
                  </p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-white/60">
                    Check your inbox for the welcome drop.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@somewhere.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      className="w-full bg-transparent border-b-2 border-white/30 pb-3 pt-1 text-base uppercase tracking-widest text-white outline-none transition-colors placeholder:text-white/30 focus:border-red-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative w-full overflow-hidden border-2 border-white bg-white px-6 py-4 font-black uppercase tracking-[0.3em] text-black transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:text-white disabled:opacity-60"
                  >
                    <span className="relative z-10">
                      {status === "loading" ? "Sending…" : "Enlist Now →"}
                    </span>
                  </button>

                  {status === "error" && (
                    <p className="font-mono text-[11px] uppercase tracking-widest text-red-400">
                      · Enter a valid email and try again.
                    </p>
                  )}

                  <p className="font-mono text-[10px] leading-relaxed uppercase tracking-[0.25em] text-white/40">
                    By enlisting you agree to receive 7H emails. Unsubscribe
                    anytime.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
