"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Lookbook — editorial asymmetric image gallery.
 *
 * Pulls images from /public by default. Pass your own via `items`.
 *
 *   <Lookbook />
 *   <Lookbook items={[{ src: "/foo.png", title: "...", caption: "..." }, ...]} />
 *
 * Images are sized via aspect ratio + Next/Image fill so the layout holds at any width.
 */

interface LookItem {
  src: string;
  title: string;
  caption?: string;
  href?: string;
  /** Optional row span / col span overrides for the bento layout. */
  className?: string;
}

const DEFAULT_ITEMS: LookItem[] = [
  {
    src: "/SVN_Hoodie_Chrome7Houses_Red.png",
    title: "Chrome / Red",
    caption: "Vol. 03 — Heat Edition",
    href: "/shop",
    className: "md:col-span-2 md:row-span-2 aspect-[4/5]",
  },
  {
    src: "/SVN_Hoodie_PinkScript_Green.png",
    title: "Pink Script",
    caption: "Studio Cut",
    href: "/shop",
    className: "aspect-square",
  },
  {
    src: "/SVN_Tshirt_Organic75_Pink_Ice.png",
    title: "Organic 75",
    caption: "Pink Ice",
    href: "/shop",
    className: "aspect-square",
  },
  {
    src: "/Black_limited_7h.png",
    title: "Black / Limited",
    caption: "Numbered run · 100",
    href: "/drops",
    className: "md:col-span-2 aspect-[16/10]",
  },
  {
    src: "/SVN_Hoodie_Snake_White.png",
    title: "Snake / White",
    caption: "Capsule 02",
    href: "/shop",
    className: "aspect-[4/5]",
  },
  {
    src: "/SVN_Tshirt_Organic75_Blue.png",
    title: "Organic 75 / Blue",
    caption: "Daily Ritual",
    href: "/shop",
    className: "aspect-[4/5]",
  },
];

export default function Lookbook({
  items = DEFAULT_ITEMS,
  title = "Lookbook",
  eyebrow = "Editorial · SS26",
}: {
  items?: LookItem[];
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] py-28 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 md:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-red-600" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-red-600">
                {eyebrow}
              </p>
            </div>
            <h2 className="mt-4 flex items-end gap-3 text-white">
              <span className="font-serif italic lowercase font-normal text-4xl md:text-6xl tracking-tight">
                the
              </span>
              <span className="font-black uppercase text-4xl md:text-6xl tracking-tighter">
                {title}
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-md font-mono text-xs uppercase tracking-widest text-white/50"
          >
            Shot on the streets · styled in the studio. Each look is a chapter
            of the 7H universe.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {items.map((item, i) => {
            const wrapperClass = item.className ?? "aspect-square";
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group relative h-full w-full overflow-hidden rounded-sm border border-white/10 bg-black/40"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* gradient veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                {/* corner index */}
                <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </div>

                {/* meta */}
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="font-black uppercase tracking-tight text-white text-base md:text-lg leading-tight">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
                        {item.caption}
                      </p>
                    )}
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:bg-red-600 group-hover:border-red-600">
                    →
                  </span>
                </div>
              </motion.div>
            );
            return item.href ? (
              <Link href={item.href} key={item.src + i} className={`block ${wrapperClass}`}>
                {inner}
              </Link>
            ) : (
              <div key={item.src + i} className={wrapperClass}>{inner}</div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 border border-white/30 px-8 py-4 font-black uppercase tracking-[0.3em] text-white transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]"
          >
            View Full Collection
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
