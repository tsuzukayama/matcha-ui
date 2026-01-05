import { Meta, StoryObj } from '@storybook/react';
import { Field, FieldLabel, FieldDescription, Input, FieldError } from '@matcha-ui/components';

const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  args: {
    error: undefined,
  },
  argTypes: {
    error: {
      control: 'text',
    },
  },
  render: (args) => (
    <Field {...args}>
      <FieldLabel>Field Label</FieldLabel>
      <Input placeholder="Input" />
      <FieldDescription>Field Description</FieldDescription>
      {args.error && <FieldError>{args.error}</FieldError>}
    </Field>
  ),
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {};
