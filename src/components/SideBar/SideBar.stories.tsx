import type { ComponentStoryObj } from '@storybook/react';
import { SideBar } from './SideBar';

const story = {
  component: SideBar,
};

export default story;

type Story = ComponentStoryObj<typeof SideBar>;

export const Default: Story = {};
