import type { FC } from 'react';
import { GitHubAccountSearch } from '@/components';
import type { TaskGroup } from '@/features';
import { DefaultLayout } from '@/layouts';

type Props = {
  taskGroups: TaskGroup[];
};

export const GitHubAccountSearchTemplate: FC<Props> = ({ taskGroups }) => {
  return (
    <DefaultLayout taskGroups={taskGroups}>
      <GitHubAccountSearch />
    </DefaultLayout>
  );
};
