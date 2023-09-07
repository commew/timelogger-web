import type { ComponentStoryObj } from '@storybook/react';
import { TimerTemplate } from '@/templates';

const story = {
  component: TimerTemplate,
};

export default story;

type Story = ComponentStoryObj<typeof TimerTemplate>;

const taskGroups = [
  {
    id: 1,
    name: '仕事',
    categories: [
      {
        id: 1,
        name: '会議',
      },
      {
        id: 2,
        name: '資料作成',
      },
    ],
  },
  {
    id: 2,
    name: '学習',
    categories: [
      {
        id: 3,
        name: 'TOEIC',
      },
    ],
  },
  {
    id: 3,
    name: '趣味',
    categories: [
      {
        id: 4,
        name: '散歩',
      },
      {
        id: 5,
        name: '読書',
      },
    ],
  },
  {
    id: 4,
    name: 'グループ未分類',
    categories: [
      {
        id: 6,
        name: '移動・外出',
      },
    ],
  },
];

export const Default: Story = {
  args: {
    tasksRecording: [
      {
        id: 1,
        status: 'recording',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskGroupId: 1,
        taskCategoryId: 1,
      },
      {
        id: 2,
        status: 'recording',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskGroupId: 2,
        taskCategoryId: 3,
      },
      {
        id: 3,
        status: 'recording',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskGroupId: 3,
        taskCategoryId: 4,
      },
    ],
    pendingTasks: [
      {
        id: 1,
        status: 'pending',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskGroupId: 4,
        taskCategoryId: 6,
      },
      {
        id: 2,
        status: 'pending',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskGroupId: 1,
        taskCategoryId: 1,
      },
      {
        id: 3,
        status: 'pending',
        startAt: '2019-08-24T14:15:22Z',
        endAt: '2019-08-24T18:15:22Z',
        duration: 14400,
        taskGroupId: 1,
        taskCategoryId: 1,
      },
    ],
    taskGroups,
  },
};

export const NoTasks: Story = {
  args: {
    tasksRecording: [],
    pendingTasks: [],
    taskGroups,
  },
};
