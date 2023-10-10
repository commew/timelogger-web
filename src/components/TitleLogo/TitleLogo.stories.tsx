import type { ComponentStoryObj } from '@storybook/react';
import { TitleLogo } from './TitleLogo';

const story = {
  component: TitleLogo,
};

export default story;

type Story = ComponentStoryObj<typeof TitleLogo>;

export const Default: Story = {};
