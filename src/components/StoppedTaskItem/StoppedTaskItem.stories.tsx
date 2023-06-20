import type { ComponentStoryObj } from '@storybook/react';
import { StoppedTaskItem } from './StoppedTaskItem';

const story = {
  component: StoppedTaskItem,
};

export default story;

type Story = ComponentStoryObj<typeof StoppedTaskItem>;

export const Default: Story = {
  args: {
    categoryName: 'カテゴリ名',
    categoryGroupName: 'グループ名',
    isMeasuring: false,
  },
};
