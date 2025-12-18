import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--matcha-background) / <alpha-value>)',
        foreground: 'rgb(var(--matcha-foreground) / <alpha-value>)',
      },
    },
  },
  plugins: [],
} satisfies Config;
