import type { ComponentStoryObj } from '@storybook/react';
import { StopTaskButton } from './StopTaskButton';

const story = {
  component: StopTaskButton,
  argTypes: {
    handleStopTask: { action: 'handleStopTask' },
  },
};

export default story;

type Story = ComponentStoryObj<typeof StopTaskButton>;

export const Default: Story = {
  args: {
    taskId: 1,
  },
};
