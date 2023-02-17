import type { FC } from 'react';
import { GitHubAccountSearch } from '@/components';
import { DefaultLayout } from '@/layouts';

export const GitHubAccountSearchTemplate: FC = () => {
  return (
    <DefaultLayout>
      <GitHubAccountSearch />
    </DefaultLayout>
  );
};
