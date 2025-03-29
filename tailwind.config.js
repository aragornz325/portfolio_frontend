/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          ok: "#00bfff",
          warn: "#ffcc00",
          error: "#ff4d4d",
          info: "#36d399",
          fg: "#00ff88",
          neutro: "#ffffff",
        },
      },
      fontFamily: {
        terminal: ['Cascadia Code', 'Courier New', 'monospace'],
      },
      screens: {
        xs: "360px",
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'typewriter': 'typewriter 2s steps(40) 1s forwards',
        glitch: 'glitch 1s infinite',
        scanlines: 'scanlines 2s infinite linear',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'none' },
          '50%': { transform: 'translateX(2px) skewX(5deg)' },
        },
        scanlines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        typewriter: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'animate-fade-in',
    'text-terminal-ok',
    'text-terminal-warn',
    'text-terminal-error',
    'text-terminal-info',
  ],
};

export default config;
