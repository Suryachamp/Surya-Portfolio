/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0d1117',
        'bg-secondary': '#161b22',
        'bg-card': '#1c2333',
        'bg-card-hover': '#21293d',
        accent: '#00e5b0',
        'accent-dim': 'rgba(0, 229, 176, 0.12)',
        'accent-border': 'rgba(0, 229, 176, 0.35)',
        'text-primary': '#e6edf3',
        'text-secondary': '#8b949e',
        'text-muted': '#6e7681',
        border: 'rgba(255, 255, 255, 0.07)',
        'border-hover': 'rgba(255, 255, 255, 0.15)',
      },
      fontFamily: {
        display: ['"Fira Code"', 'monospace'],
        body: ['"Space Grotesk"', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
        mono: ['monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        accent: '0 0 20px rgba(0, 229, 176, 0.15)',
        glow: '0 0 40px rgba(0, 229, 176, 0.25)',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0, 229, 176, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 229, 176, 0.8)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease both',
        'fade-in-up-delay-1': 'fadeInUp 0.7s ease 0.1s both',
        'fade-in-up-delay-2': 'fadeInUp 0.7s ease 0.2s both',
        'fade-in-up-delay-3': 'fadeInUp 0.7s ease 0.3s both',
        'fade-in': 'fadeIn 0.4s ease',
        'pulse-glow': 'pulseGlow 2s ease infinite',
        blink: 'blink 1s step-end infinite',
        float: 'float 4s ease-in-out infinite',
      },
      maxWidth: {
        container: '1140px',
      },
    },
  },
  plugins: [],
}
