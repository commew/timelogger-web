import type { FC, MouseEvent } from 'react';
import { Group, createStyles } from '@mantine/core';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const useStyles = createStyles(() => ({
  loginContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  google_btn: {
    cursor: 'pointer',
  },
}));

export const LoginTemplate: FC = () => {
  const { classes } = useStyles();
  const handleLogin = async (event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault();

    await signIn('google');
  };

  return (
    <Group className={classes.loginContent} pl={20} pt={20}>
      <Image src="/mantine-logo.svg" alt="logo" width={80} height={80} />
      <Image
        src="/btn_google_signin_dark_normal_web@2x.png"
        alt="Google Login"
        width={252}
        height={63}
        onClick={handleLogin}
        className={classes.google_btn}
      />
    </Group>
  );
};
