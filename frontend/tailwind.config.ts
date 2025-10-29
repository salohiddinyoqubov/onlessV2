import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e5f8c',
          dark: '#0f2942',
          light: '#2a7ab5',
          border: '#4da3e0',
        },
        background: {
          DEFAULT: '#1a1d29',
          dark: '#0f1117',
          secondary: '#252936',
          border: '#3d4254',
        },
        success: {
          DEFAULT: '#10b981',
          bg: '#064e3b',
          border: '#059669',
        },
        danger: {
          DEFAULT: '#ef4444',
          bg: '#7f1d1d',
          border: '#dc2626',
        },
        warning: '#f59e0b',
        neutral: {
          DEFAULT: '#e5e7eb',
          light: '#9ca3af',
          dark: '#374151',
        },
        accent: '#3b82f6',
      },
      fontFamily: {
        sans: ['Roboto', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};

export default config;
