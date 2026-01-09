import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@matcha-ui/components';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern for accordions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses CSS grid-template-rows for smooth height transitions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent>
          This section is open by default. Multiple sections can be open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent>
          This section is also open by default. Try opening the third one too!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third section</AccordionTrigger>
        <AccordionContent>
          Now all three sections are open. Click any trigger to collapse it.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('item-1');

    return (
      <div className="flex flex-col gap-4">
        <Accordion
          type="single"
          collapsible
          value={value}
          onValueChange={setValue}
          className="w-full max-w-md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Account</AccordionTrigger>
            <AccordionContent>Manage your account settings and preferences.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Password</AccordionTrigger>
            <AccordionContent>Update your password and security settings.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Notifications</AccordionTrigger>
            <AccordionContent>Configure your notification preferences.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="text-sm text-slate-600">
          Current open item: <strong>{value || 'none'}</strong>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setValue('item-1')}
            className="rounded bg-slate-200 px-3 py-1 text-sm"
          >
            Open Account
          </button>
          <button
            onClick={() => setValue('item-2')}
            className="rounded bg-slate-200 px-3 py-1 text-sm"
          >
            Open Password
          </button>
          <button onClick={() => setValue('')} className="rounded bg-slate-200 px-3 py-1 text-sm">
            Close All
          </button>
        </div>
      </div>
    );
  },
};

export const WithDisabledItem: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Available section</AccordionTrigger>
        <AccordionContent>This section is available and can be toggled.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled section</AccordionTrigger>
        <AccordionContent>This content cannot be accessed.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another available section</AccordionTrigger>
        <AccordionContent>This section is also available.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const NotCollapsible: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent>
          This accordion is not collapsible. One item must always be open.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent>Click on the first section - it won't close this one.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third section</AccordionTrigger>
        <AccordionContent>At least one section is always visible.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
