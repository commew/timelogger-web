import type { ComponentStoryObj } from '@storybook/react';
import { LoginTemplate } from '@/templates';

const story = {
  component: LoginTemplate,
};

export default story;

type Story = ComponentStoryObj<typeof LoginTemplate>;

export const Default: Story = {};
