import type { FC, ReactNode, MouseEvent } from 'react';
import { Container, createStyles } from '@mantine/core';
import Head from 'next/head';
import { signOut } from 'next-auth/react';
import { ErrorBoundary } from 'react-error-boundary';
import { HeaderMenu, TitleText, HeaderNavigation, SideBar } from '@/components';
import type { TaskGroup } from '@/features';
import { ErrorFallback } from '@/components/ErrorFallback/ErrorFallback';

type Props = {
  children: ReactNode;
  taskGroups: TaskGroup[];
};

const onError = (error: Error, info: { componentStack: string }) => {
  // ここでログ出力などを行う
  console.log('error.message', error.message);
  console.log('info.componentStack:', info.componentStack);
};

const title = 'Time Logger（仮）';

const useStyles = createStyles(() => ({
  layoutWrapper: {
    display: 'flex',
    width: '100%',
  },
  mainContent: {
    width: '70%',
  },
}));

const handleLogout = async (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();

  await signOut({ callbackUrl: '/login' });
};

// eslint-disable-next-line max-lines-per-function
export const DefaultLayout: FC<Props> = ({ children, taskGroups }) => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Timmew</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="noindex , nofollow" />
        <meta name="description" content="Timmewのページです。" />
      </Head>
      <HeaderNavigation handleLogout={handleLogout}></HeaderNavigation>
      <Container size="xl">
        <div className={classes.layoutWrapper}>
          <SideBar taskGroups={taskGroups} />
          <div className={classes.mainContent}>
            <TitleText title={title} />
            <HeaderMenu />
            <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
              {children}
            </ErrorBoundary>
          </div>
        </div>
      </Container>
    </>
  );
};
