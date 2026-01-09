import { Select, SelectContent, SelectOption, SelectTrigger } from '@matcha-ui/components';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  render: (args) => (
    <div style={{ marginTop: '100px' }}>
      <Select {...args} className="w-40">
        <SelectTrigger>
          <span>Select</span>
        </SelectTrigger>
        <SelectContent>
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
          <SelectOption value="3">Option 3</SelectOption>
        </SelectContent>
      </Select>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {},
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>(undefined);
    return (
      <Select value={value} onChange={(value) => setValue(`${value} is selected`)}>
        <SelectTrigger>
          <span>Select</span>
        </SelectTrigger>

        <SelectContent>
          <SelectOption value="1">Option 1</SelectOption>
          <SelectOption value="2">Option 2</SelectOption>
          <SelectOption value="3">Option 3</SelectOption>
        </SelectContent>
      </Select>
    );
  },
};
