import type { FC, MouseEvent } from 'react';
import { Group } from '@mantine/core';
import { signIn } from 'next-auth/react';
import { GoogleLoginButton } from '@/components';

export const LoginTemplate: FC = () => {
  const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await signIn('google');
  };

  return (
    <Group position="center">
      <GoogleLoginButton onClick={handleLogin} />
    </Group>
  );
};
