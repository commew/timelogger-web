import type { ComponentStoryObj } from '@storybook/react';
import { GoogleLoginButton } from '.';

const story = {
  component: GoogleLoginButton,
};

export default story;

type Story = ComponentStoryObj<typeof GoogleLoginButton>;

export const Default: Story = {};

export const WithHandleOnClick: Story = {
  args: {
    onClick: () => {
      console.log('clicked GoogleLoginButton!!');
    },
  },
};
