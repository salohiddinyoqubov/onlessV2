import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#173d7a',
          dark: '#0a192f',
          light: '#1c3b69',
          border: '#388bfd',
        },
        background: {
          DEFAULT: '#0d1117',
          dark: '#010409',
          secondary: '#161b22',
          border: '#30363d',
        },
        success: {
          DEFAULT: '#3fb950',
          bg: '#1a3d20',
          border: '#2ea043',
        },
        danger: {
          DEFAULT: '#f85149',
          bg: '#4f2125',
          border: '#da3633',
        },
        warning: '#f39c12',
        neutral: {
          DEFAULT: '#c9d1d9',
          light: '#8b949e',
          dark: '#21262d',
        },
        accent: '#58a6ff',
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
