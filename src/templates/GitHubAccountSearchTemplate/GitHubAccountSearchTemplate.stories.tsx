import type { ComponentStoryObj } from '@storybook/react';
import { rest } from 'msw';
import {
  mockFetchGitHubAccount,
  mockFetchGitHubAccountUnexpectedResponseBody,
  mockNotFoundError,
} from '@/mocks';
import { GitHubAccountSearchTemplate } from '@/templates';

const story = {
  component: GitHubAccountSearchTemplate,
};

export default story;

type Story = ComponentStoryObj<typeof GitHubAccountSearchTemplate>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('https://api.github.com/users/*', mockFetchGitHubAccount),
      ],
    },
  },
};

export const ShowGitHubAccountNotFoundError: Story = {
  parameters: {
    msw: {
      handlers: [rest.get('https://api.github.com/users/*', mockNotFoundError)],
    },
  },
};

export const ShowUnexpectedResponseBodyError: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get(
          'https://api.github.com/users/*',
          mockFetchGitHubAccountUnexpectedResponseBody
        ),
      ],
    },
  },
};
