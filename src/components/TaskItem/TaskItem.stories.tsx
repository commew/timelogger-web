import type { ComponentStoryObj } from '@storybook/react';
import { TaskItem } from './TaskItem';

const story = {
  component: TaskItem,
  argTypes: {
    handleCompleteTask: { action: 'handleCompleteTask' },
    handleStartTask: { action: 'handleStartTask' },
    handleStopTask: { action: 'handleStopTask' },
  },
};

export default story;

type Story = ComponentStoryObj<typeof TaskItem>;

export const Default: Story = {
  args: {
    taskId: 1,
    categoryName: 'カテゴリ名',
    categoryGroupName: 'グループ名',
    duration: 14400,
    status: 'recording',
  },
};

export const Pending: Story = {
  args: {
    taskId: 1,
    categoryName: 'カテゴリ名',
    categoryGroupName: 'グループ名',
    duration: 14400,
    status: 'pending',
  },
};
