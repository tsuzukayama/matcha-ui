import { Button, Input } from '@matcha-ui/components';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Input',
    disabled: false,
    error: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Input',
  },
};

export const WithButton: Story = {
  args: {
    placeholder: 'Input',
  },
  render: (args) => (
    <div className="flex gap-2">
      <Input {...args} />
      <Button>Button</Button>
    </div>
  ),
};
