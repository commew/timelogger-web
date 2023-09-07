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
  parameters: {
    msw: {
      handlers: [
        rest.get('https://api.github.com/users/*', mockFetchGitHubAccount),
      ],
    },
  },
  args: {
    taskGroups,
  },
};

export const ShowGitHubAccountNotFoundError: Story = {
  parameters: {
    msw: {
      handlers: [rest.get('https://api.github.com/users/*', mockNotFoundError)],
    },
  },
  args: {
    taskGroups,
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
  args: {
    taskGroups,
  },
};
