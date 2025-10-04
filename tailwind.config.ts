import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        neon: {
          pink: "var(--neon-pink)",
          purple: "var(--neon-purple)",
          cyan: "var(--neon-cyan)",
          green: "var(--neon-green)",
          yellow: "var(--neon-yellow)",
        },
        dark: {
          DEFAULT: "var(--dark)",
          light: "var(--dark-light)",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glitch': 'glitch 1s linear infinite',
        'tilt': 'tilt 10s infinite linear',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'grid-move': 'grid-move 20s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-2px, 2px)' },
          '66%': { transform: 'translate(2px, -2px)' },
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'grid-move': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
