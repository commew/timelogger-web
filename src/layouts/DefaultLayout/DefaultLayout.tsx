import type { FC, ReactNode } from 'react';
import { Container } from '@mantine/core';
import Head from 'next/head';
import { ErrorBoundary } from 'react-error-boundary';
import { HeaderMenu, TitleText } from '@/components';
import { ErrorFallback } from '@/components/ErrorFallback/ErrorFallback';

type Props = {
  children: ReactNode;
};

const onError = (error: Error, info: { componentStack: string }) => {
  // ここでログ出力などを行う
  console.log('error.message', error.message);
  console.log('info.componentStack:', info.componentStack);
};

const title = 'Time Logger（仮）';

// eslint-disable-next-line max-lines-per-function
export const DefaultLayout: FC<Props> = ({ children }) => (
  <>
    <Head>
      <title>Time Logger（仮）</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="robots" content="noindex , nofollow" />
    </Head>
    <Container my="md">
      <TitleText title={title} />
      <HeaderMenu />
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
        {children}
      </ErrorBoundary>
    </Container>
  </>
);
