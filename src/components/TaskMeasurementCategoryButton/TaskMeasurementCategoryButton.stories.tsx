import type { ComponentStoryObj } from '@storybook/react';
import { TaskMeasurementCategoryButton } from './TaskMeasurementCategoryButton';

const story = {
  component: TaskMeasurementCategoryButton,
};

export default story;

type Story = ComponentStoryObj<typeof TaskMeasurementCategoryButton>;

export const Default: Story = {
  args: {
    name: 'カテゴリ名',
  },
};
