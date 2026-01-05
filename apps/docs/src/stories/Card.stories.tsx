import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldLabel,
  Input,
} from '@matcha-ui/components';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {},
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <div className="flex">
      <Card {...args}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input placeholder="Email" />
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input placeholder="Password" />
            </Field>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button type="button" variant="outline" className="w-full">
            Forgot password?
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
