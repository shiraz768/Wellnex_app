/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Satoshi"', 'sans-serif'],
        display: ['"Clash Display"', 'sans-serif'],
      },
      colors: {
        background: '#0D0D0F',
        surface: '#18181B',
        primary: '#06B6D4', // cyan accent
        secondary: '#9333EA', // purple accent
        accent: '#4ADE80', // mint accent
        muted: '#A1A1AA', // subtle gray
        light: '#F4F4F5',
        border: '#27272A',
      },
      backgroundImage: {
        'gradient-glow': 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.15), transparent 70%)',
        'hero-dark': 'linear-gradient(135deg, #0D0D0F 0%, #18181B 100%)',
      },
      boxShadow: {
        glow: '0 0 25px rgba(6, 182, 212, 0.25)',
        soft: '0 10px 25px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};
