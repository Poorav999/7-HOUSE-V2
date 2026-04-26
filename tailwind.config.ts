import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ═══════════════════════════════════════════════════
         MINECRAFT BLOCK COLOR PALETTE
         ═══════════════════════════════════════════════════ */
      colors: {
        // Minecraft Block Colors
        "mc-cobblestone": "#5d5d5d",    // Cobblestone - dark gray background
        "mc-cobblestone-light": "#757575",
        "mc-oak": "#8b6f47",            // Oak Wood - brown borders/accents
        "mc-oak-light": "#a08968",
        "mc-oak-dark": "#6b5335",
        "mc-diamond": "#14b8e0",        // Diamond - blue primary accent
        "mc-diamond-dark": "#0891b2",
        "mc-diamond-light": "#22d3ee",
        "mc-stone": "#707070",          // Stone - secondary
        "mc-grass": "#4a9b4b",          // Grass block green
        "mc-dirt": "#6d4c41",           // Dirt brown
        "mc-sand": "#c4a747",           // Sand beige
        "mc-gravel": "#6b6b6b",         // Gravel - darker gray
        "mc-gold": "#ffd700",           // Gold ore accent
        "mc-iron": "#a8a8a8",           // Iron
        "mc-obsidian": "#1a1a1a",       // Obsidian - very dark/black
        "mc-obsidian-light": "#2d2d2d", // Obsidian light variant
        "mc-obsidian-dark": "#0f0f0f",  // Obsidian dark variant
      },
      fontFamily: {
        sans: ['var(--font-space)', 'sans-serif'],
        syncopate: ['var(--font-syncopate)', 'sans-serif'],
        minecraft: ['var(--font-vt323)', '"Courier New"', 'monospace'],
      },
      keyframes: {
        'marquee-vertical': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'pixel-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'lava-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 69, 0, 0.6)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 100, 20, 0.8)' },
        },
        'block-bounce': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'diamond-shimmer': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(20, 184, 224, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(20, 184, 224, 0.8)' },
        },
        'block-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'card-expand': {
          '0%': { height: '280px' },
          '100%': { height: '420px' },
        },
        'spin-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'cherry-sway': {
          '0%, 100%': { transform: 'translateX(0) translateY(0) scale(1)' },
          '25%': { transform: 'translateX(-15px) translateY(10px) scale(1.02)' },
          '50%': { transform: 'translateX(0) translateY(0) scale(1)' },
          '75%': { transform: 'translateX(15px) translateY(-10px) scale(0.98)' },
        },
        'enhanced-pulse': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'float-bounce': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 122, 26, 0.4), 0 0 40px rgba(255, 122, 26, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 122, 26, 0.6), 0 0 60px rgba(255, 122, 26, 0.2)' },
        },
      },
      animation: {
        'marquee-vertical': 'marquee-vertical 20s linear infinite',
        'pixel-pulse': 'pixel-pulse 2s ease-in-out infinite',
        'lava-glow': 'lava-glow 3s ease-in-out infinite',
        'block-bounce': 'block-bounce 1.5s ease-in-out infinite',
        'diamond-shimmer': 'diamond-shimmer 2s ease-in-out infinite',
        'block-scale': 'block-scale 1.5s ease-in-out infinite',
        'card-expand': 'card-expand 0.5s ease-in-out forwards',
        'spin-rotate': 'spin-rotate 6s linear infinite',
        'cherry-sway': 'cherry-sway 8s ease-in-out infinite',
        'enhanced-pulse': 'enhanced-pulse 3s ease-in-out infinite',
        'float-bounce': 'float-bounce 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;