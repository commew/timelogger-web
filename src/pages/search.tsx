import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { fetchTaskGroups } from '@/api/server/fetch/taskGroup';
import { appUrls } from '@/features';
import type { TaskGroup } from '@/features';
import { GitHubAccountSearchTemplate } from '@/templates';

type Props = {
  taskGroups: TaskGroup[];
};

const SearchPage: NextPage<Props> = ({ taskGroups }) => {
  return <GitHubAccountSearchTemplate taskGroups={taskGroups} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: appUrls.login.path,
      },
    };
  }
  const fetchTaskGroupsDto = { appToken: session.appToken };
  const taskGroups = await fetchTaskGroups(fetchTaskGroupsDto);

  return {
    props: { taskGroups },
  };
};

export default SearchPage;
