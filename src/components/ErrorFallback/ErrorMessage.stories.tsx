import type { ComponentStoryObj } from '@storybook/react';
import { GitHubAccountNotFoundError } from '@/features';
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

export const ShowGitHubAccountNotFoundError: Story = {
  args: {
    error: new GitHubAccountNotFoundError(),
  },
};
