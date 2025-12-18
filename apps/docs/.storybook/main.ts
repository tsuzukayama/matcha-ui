import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(cfg) {
    // main.ts lives in apps/docs/.storybook, so repo root is 4 levels up.
    const repoRoot = new URL('../../../../', import.meta.url).pathname;

    // Ensure Vite doesn't prebundle the workspace package (so changes in dist trigger reloads)
    cfg.optimizeDeps = {
      ...(cfg.optimizeDeps ?? {}),
      exclude: [...(cfg.optimizeDeps?.exclude ?? []), '@suzuka-ds/components'],
    };

    // Allow Storybook's Vite server to read workspace package files
    cfg.server = {
      ...(cfg.server ?? {}),
      fs: {
        ...(cfg.server?.fs ?? {}),
        allow: [...(cfg.server?.fs?.allow ?? []), repoRoot],
      },
    };

    return cfg;
  },
};

export default config;
