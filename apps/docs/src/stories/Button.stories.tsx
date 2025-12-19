import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@matcha-ui/components';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    size: 'md',
    variant: 'primary',
    type: 'button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
};
