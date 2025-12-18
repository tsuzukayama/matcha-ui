import type { Preview } from '@storybook/react';
import React from 'react';

import '@suzuka-ds/components/styles.css';

type ThemeMode = 'light' | 'dark';

const setThemeMode = (mode: ThemeMode) => {
  const root = document.documentElement;
  root.classList.toggle('dark', mode === 'dark');
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      setThemeMode(ctx.globals.theme as ThemeMode);
      return React.createElement(
        'div',
        { className: 'suzuka-theme', style: { padding: 24 } },
        React.createElement(Story),
      );
    },
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
