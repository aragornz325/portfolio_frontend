/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        animation: {
          'fade-in': 'fadeIn 1.5s ease-out forwards',
          'typewriter': 'typewriter 2s steps(40) 1s forwards',
        },
        keyframes: {
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
    safelist: ['animate-fade-in'],

  };
  