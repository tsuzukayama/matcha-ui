import { Switch, SwitchTrack, SwitchThumb, SwitchLabel } from '@matcha-ui/components';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  render: (args) => (
    <Switch {...args}>
      <SwitchTrack>
        <SwitchThumb />
      </SwitchTrack>
      <SwitchLabel>Enable notifications</SwitchLabel>
    </Switch>
  ),
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <Switch checked={checked} onCheckedChange={setChecked}>
          <SwitchTrack>
            <SwitchThumb />
          </SwitchTrack>
          <SwitchLabel>Dark mode</SwitchLabel>
        </Switch>
        <p className="text-sm">Current state: {checked ? 'On' : 'Off'}</p>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: (args) => (
    <Switch {...args}>
      <SwitchTrack>
        <SwitchThumb />
      </SwitchTrack>
    </Switch>
  ),
  args: {
    defaultChecked: true,
  },
};
