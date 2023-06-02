import type { ComponentStoryObj } from '@storybook/react';
import { MeasuringTaskItem } from './MeasuringTaskItem';

const story = {
  component: MeasuringTaskItem,
};

export default story;

type Story = ComponentStoryObj<typeof MeasuringTaskItem>;

export const Default: Story = {
  args: {
    categoryName: 'カテゴリ名',
    categoryGroupName: 'グループ名',
    isMeasuring: true,
  },
};
