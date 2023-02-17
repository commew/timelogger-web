import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class CustomDocument extends Document {
  static getInitialProps = getInitialProps;

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
