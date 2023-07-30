import type { ComponentStoryObj } from '@storybook/react';
import { TimerTemplate } from '@/templates';

const story = {
  component: TimerTemplate,
};

export default story;

type Story = ComponentStoryObj<typeof TimerTemplate>;

export const Default: Story = {
  args: {
    tasksRecording: [
      {
        id: 1,
        status: 'recording',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
      {
        id: 2,
        status: 'recording',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
      {
        id: 3,
        status: 'recording',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
    ],
    pendingTasks: [
      {
        id: 1,
        status: 'pending',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
      {
        id: 2,
        status: 'pending',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
      {
        id: 3,
        status: 'pending',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskCategoryId: 1,
      },
    ],
  },
};

export const NoTasks: Story = {
  args: {
    tasksRecording: [],
    pendingTasks: [],
  },
};
