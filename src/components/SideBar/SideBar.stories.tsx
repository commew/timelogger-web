import type { ComponentStoryObj } from '@storybook/react';
import { SideBar } from './SideBar';

const story = {
  component: SideBar,
};

export default story;

type Story = ComponentStoryObj<typeof SideBar>;

export const Default: Story = {
  args: {
    taskGroups: [
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
    ],
  },
};
