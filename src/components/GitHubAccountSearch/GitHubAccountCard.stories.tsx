import type { ComponentStoryObj } from '@storybook/react';
import { GitHubAccountCard } from './GitHubAccountCard';

const story = {
  component: GitHubAccountCard,
};

export default story;

type Story = ComponentStoryObj<typeof GitHubAccountCard>;

export const Default: Story = {
  args: {
    gitHubAccount: {
      name: 'cat',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/32682645?s=460&v=4',
    },
  },
};
