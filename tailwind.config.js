/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        concrete: {
          50: '#FAFAF9',
          100: '#F5F5F3', // Main Background — warm concrete white
          200: '#E8E8E5', // Section Background — light concrete gray
          300: '#D6D6D2',
          400: '#A8A8A2',
          500: '#737373', // Muted Text
          700: '#4B4B4B', // Body Text
          800: '#2A2A2A',
          900: '#1C1C1C', // Dark Section / Primary Headings
          950: '#141414', // Footer Dark Charcoal
        },
        charcoal: {
          950: '#141414', // Footer dark charcoal
          900: '#181818', // Navbar deep charcoal
          800: '#1C1C1C', // Dark section charcoal
          700: '#262626',
          600: '#383838',
          500: '#4B4B4B',
        },
        construction: {
          orange: '#F59E0B', // Construction Orange Primary Accent
          dark: '#D97706',   // Secondary Deep Accent
          light: '#FEF3C7',
          gray: '#E8E8E5',
          white: '#F5F5F3',
          card: '#FFFFFF',
          text: '#1C1C1C',
          body: '#4B4B4B',
          muted: '#737373',
        },
        amk: {
          navy: {
            950: '#141414',
            900: '#181818',
            800: '#1C1C1C',
            700: '#262626',
            600: '#383838',
            500: '#4B4B4B',
            100: '#E8E8E5',
            50: '#F5F5F3'
          },
          amber: {
            600: '#D97706',
            500: '#F59E0B',
            400: '#FBBF24',
            100: '#FEF3C7',
            50: '#FFFBEB'
          },
          dark: '#1C1C1C',
          accent: {
            red: '#EF4444',
            green: '#10B981',
            purple: '#8B5CF6',
            blue: '#2563EB',
            cyan: '#0284C7'
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'glow-amber': '0 0 25px -5px rgba(245, 161, 30, 0.35)',
        'glow-navy': '0 0 30px -5px rgba(13, 42, 74, 0.4)',
        'glow-photo': '0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 30px -5px rgba(245, 161, 30, 0.25)',
        'card-hover': '0 20px 30px -10px rgba(7, 21, 38, 0.12), 0 10px 15px -5px rgba(245, 161, 30, 0.05)'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'kenburns-zoom': 'kenburnsZoom 18s ease-in-out infinite alternate',
        'kenburns-pan': 'kenburnsPan 22s ease-in-out infinite alternate',
        'lens-sweep': 'lensSweep 10s ease-in-out infinite',
        'photo-shimmer': 'photoShimmer 2.5s infinite linear',
        'rec-blink': 'recBlink 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        kenburnsZoom: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.16) translate(-1%, -1.5%)' }
        },
        kenburnsPan: {
          '0%': { transform: 'scale(1.12) translate(-2%, 0)' },
          '100%': { transform: 'scale(1.05) translate(2%, -1%)' }
        },
        lensSweep: {
          '0%': { transform: 'translateX(-100%) rotate(25deg)', opacity: '0' },
          '30%': { opacity: '0.4' },
          '70%': { opacity: '0.4' },
          '100%': { transform: 'translateX(200%) rotate(25deg)', opacity: '0' }
        },
        photoShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        recBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' }
        }
      }
    },
  },
  plugins: [],
}

