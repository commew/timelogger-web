import type { ComponentStoryObj } from '@storybook/react';
import { HeaderMenu } from './HeaderMenu';

const story = {
  component: HeaderMenu,
};

export default story;

type Story = ComponentStoryObj<typeof HeaderMenu>;

export const Default: Story = {};
