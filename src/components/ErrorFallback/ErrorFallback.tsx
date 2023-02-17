import type { FC } from 'react';
import { Button } from '@mantine/core';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorMessage } from '@/components/ErrorFallback/ErrorMessage';

export const ErrorFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <>
      <ErrorMessage error={error} />
      <Button onClick={resetErrorBoundary}>もう一度試す</Button>
    </>
  );
};
