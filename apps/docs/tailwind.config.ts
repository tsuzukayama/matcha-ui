import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
