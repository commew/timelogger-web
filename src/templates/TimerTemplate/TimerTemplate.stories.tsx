import type { ComponentStoryObj } from '@storybook/react';
import { TimerTemplate } from '@/templates';

const story = {
  component: TimerTemplate,
  argTypes: { handleLogin: { action: 'handleLogin' } },
};

export default story;

type Story = ComponentStoryObj<typeof TimerTemplate>;

export const Default: Story = {};
