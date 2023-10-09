import type { ComponentStoryObj } from '@storybook/react';
import { TaskMeasurementCategoryButton } from './TaskMeasurementCategoryButton';

const story = {
  component: TaskMeasurementCategoryButton,
  argTypes: {
    handleCreateTask: { action: 'handleCreateTask' },
  },
};

export default story;

type Story = ComponentStoryObj<typeof TaskMeasurementCategoryButton>;

export const Default: Story = {
  args: {
    name: 'カテゴリ名',
    groupId: 1,
    categoryId: 1,
  },
};
