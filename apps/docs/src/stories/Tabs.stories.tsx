import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from '@matcha-ui/components';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">Account content</div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">Password content</div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">Settings content</div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultValue: 'account',
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('account');

    return (
      <div className="flex flex-col gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="rounded-lg border border-slate-200 p-4">Account content</div>
          </TabsContent>
          <TabsContent value="password">
            <div className="rounded-lg border border-slate-200 p-4">Password content</div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="rounded-lg border border-slate-200 p-4">Settings content</div>
          </TabsContent>
        </Tabs>
        <p className="text-sm text-slate-600">
          Current tab: <strong>{activeTab}</strong>
        </p>
      </div>
    );
  },
};

export const WithDisabledTab: Story = {
  args: {
    defaultValue: 'account',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="premium" disabled>
          Premium
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">Account content</div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">Password content</div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="premium">
        <Card>
          <CardHeader>
            <CardTitle>Premium Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">Premium content (disabled)</div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  args: {
    defaultValue: 'overview',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">Overview content</div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">Analytics content</div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};
