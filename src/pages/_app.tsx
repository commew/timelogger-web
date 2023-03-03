import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { getNullableGoogleTagManagerId } from '@/features';
import { GoogleTagManager } from '@/components/GoogleTagManager';

const googleTagManagerId = getNullableGoogleTagManagerId();

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        {googleTagManagerId !== null ? (
          <GoogleTagManager googleTagManagerId={googleTagManagerId} />
        ) : (
          ''
        )}
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
};

export default App;
