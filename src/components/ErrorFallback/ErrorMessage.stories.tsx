import type { ComponentStoryObj } from '@storybook/react';
import { TaskCategoryNotFoundError, TaskGroupNotFoundError } from '@/features';
import { ErrorMessage } from './ErrorMessage';

const story = {
  component: ErrorMessage,
};

export default story;

type Story = ComponentStoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    error: new Error(),
  },
};

export const ShowTaskCategoryNotFoundError: Story = {
  args: {
    error: new TaskCategoryNotFoundError(),
  },
};

export const ShowTaskGroupNotFoundError: Story = {
  args: {
    error: new TaskGroupNotFoundError(),
  },
};
