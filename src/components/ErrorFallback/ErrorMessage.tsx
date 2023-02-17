import type { FC } from 'react';
import { Alert } from '@mantine/core';

const createDisplayErrorMessage = (error: Error) => {
  if (error.name === 'GitHubAccountNotFoundError') {
    return 'GitHubアカウントは見つかりませんでした。';
  }

  return '予期せぬエラーが発生しました。申し訳ありませんが、しばらく時間が経ってからお試し下さい。';
};

type Props = {
  error: Error;
};

export const ErrorMessage: FC<Props> = ({ error }) => {
  return (
    <Alert title="エラーが発生しました。" color="red">
      {createDisplayErrorMessage(error)}
    </Alert>
  );
};
