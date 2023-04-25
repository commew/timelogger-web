import type { ComponentStoryObj } from '@storybook/react';
import { HeaderNavigation } from './HeaderNavigation';

const story = {
  component: HeaderNavigation,
  argTypes: { handleLogout: { action: 'handleLogout' } },
};

export default story;

type Story = ComponentStoryObj<typeof HeaderNavigation>;

export const Default: Story = {};
