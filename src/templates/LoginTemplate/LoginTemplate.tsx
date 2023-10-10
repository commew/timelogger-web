import type { FC, MouseEventHandler } from 'react';
import { Group, createStyles } from '@mantine/core';
import Image from 'next/image';

const useStyles = createStyles(() => ({
  loginContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  googleBtn: {
    cursor: 'pointer',
  },
}));

type Props = {
  handleLogin: MouseEventHandler;
};

export const LoginTemplate: FC<Props> = ({ handleLogin }) => {
  const { classes } = useStyles();

  return (
    <Group className={classes.loginContent} pl={20} pt={20}>
      <Image src="/timmew_logo.webp" alt="logo" width={162.79} height={30} />
      <Image
        src="/btn_google_signin_dark_normal_web@2x.webp"
        alt="Google Login"
        width={252}
        height={63}
        onClick={handleLogin}
        className={classes.googleBtn}
      />
    </Group>
  );
};
