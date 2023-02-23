import type { ComponentStoryObj } from '@storybook/react';
import { TitleText } from './TitleText';

const story = {
  component: TitleText,
};

export default story;

type Story = ComponentStoryObj<typeof TitleText>;

export const Default: Story = {
  args: {
    title: 'アプリのTitle',
  },
};
