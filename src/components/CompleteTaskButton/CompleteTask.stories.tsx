import type { ComponentStoryObj } from '@storybook/react';
import { CompleteTaskButton } from './CompleteTaskButton';

const story = {
  component: CompleteTaskButton,
  argTypes: {
    handleCompleteTask: { action: 'handleCompleteTask' },
  },
};

export default story;

type Story = ComponentStoryObj<typeof CompleteTaskButton>;

export const Default: Story = {
  args: {
    taskId: 1,
  },
};
