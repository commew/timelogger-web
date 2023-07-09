import type { FC, ReactNode } from 'react';
import { Card, createStyles } from '@mantine/core';
import Head from 'next/head';

type Props = {
  children: ReactNode;
};

const useStyles = createStyles(() => ({
  layoutLogin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '480px',
    height: '240px',
  },
}));

// eslint-disable-next-line max-lines-per-function
export const LoginLayout: FC<Props> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Timmew ログイン</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="noindex , nofollow" />
        <meta name="description" content="Timmewのログインページです。" />
      </Head>
      <Card shadow="sm" radius="md" withBorder className={classes.layoutLogin}>
        {children}
      </Card>
    </>
  );
};
