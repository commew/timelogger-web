import type { ComponentStoryObj } from '@storybook/react';
import { CategoryButton } from './CategoryButton';

const story = {
  component: CategoryButton,
};

export default story;

type Story = ComponentStoryObj<typeof CategoryButton>;

export const Default: Story = {
  args: {
    name: 'カテゴリ名',
  },
};
