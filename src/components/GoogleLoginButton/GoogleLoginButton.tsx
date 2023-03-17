import type { FC, ComponentPropsWithoutRef } from 'react';
import { Button } from '@mantine/core';
import { AiFillGoogleCircle } from 'react-icons/ai';

export const GoogleLoginButton: FC<ComponentPropsWithoutRef<'button'>> = ({
  onClick,
}) => {
  return (
    <Button
      leftIcon={<AiFillGoogleCircle size={40} />}
      onClick={onClick}
      size="xl"
      color="#4285F4"
    >
      Googleでログイン
    </Button>
  );
};
