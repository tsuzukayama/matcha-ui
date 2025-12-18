import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--suzuka-background) / <alpha-value>)',
        foreground: 'rgb(var(--suzuka-foreground) / <alpha-value>)',
      },
    },
  },
  plugins: [],
} satisfies Config;


