import { Input } from '@matcha-ui/components';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Input',
  },
};
