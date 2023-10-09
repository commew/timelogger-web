import type { ComponentStoryObj } from '@storybook/react';
import { StartTaskButton } from './StartTaskButton';

const story = {
  component: StartTaskButton,
  argTypes: {
    handleStartTask: { action: 'handleStartTask' },
  },
};

export default story;

type Story = ComponentStoryObj<typeof StartTaskButton>;

export const Default: Story = {
  args: {
    taskId: 1,
  },
};
