module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#E6FAFB',
          DEFAULT: '#00BCD4',
          600: '#00ACC1',
          dark: '#0097A7',
        },
        accent: {
          DEFAULT: '#34D399',
          light: '#A7F3D0',
          dark: '#059669',
        },
        background: '#ffffff',
        surface: '#f9fafb',
        card: '#ffffff',
        border: '#e0e0e0',
        muted: '#94A3B8',
        'text-primary': '#102A43',
        'text-secondary': '#334155',
        'text-tertiary': '#64748b',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      boxShadow: {
        soft: '0 6px 20px rgba(16, 42, 67, 0.06)',
        'soft-lg': '0 15px 35px rgba(16, 42, 67, 0.08)',
        'wellness-md': '0 8px 25px rgba(0, 188, 212, 0.08)',
        'aqua-glow': '0 0 25px rgba(0, 188, 212, 0.12)',
        'mint-glow': '0 0 25px rgba(52, 211, 153, 0.12)',
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
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
        pulseAqua: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 188, 212, 0.6)' },
          '70%': { boxShadow: '0 0 0 10px rgba(0, 188, 212, 0)' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        pulseAqua: 'pulseAqua 2s infinite',
        slideInFromLeft: 'slideInFromLeft 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
