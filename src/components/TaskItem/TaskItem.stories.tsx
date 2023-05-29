import type { ComponentStoryObj } from '@storybook/react';
import { TaskItem } from './TaskItem';

const story = {
  component: TaskItem,
};

export default story;

type Story = ComponentStoryObj<typeof TaskItem>;

export const Default: Story = {
  args: {
    categoryName: 'カテゴリ名',
    categoryGroupName: 'グループ名',
    isMeasuring: true
  },
};
