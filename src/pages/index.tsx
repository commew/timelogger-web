import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { fetchTaskGroups } from '@/api/server/fetch/taskGroup';
import { appUrls } from '@/features';
import type { TaskGroup } from '@/features';
import { DefaultLayout } from '@/layouts';

type Props = {
  taskGroups: TaskGroup[];
};

const IndexPage: NextPage<Props> = ({ taskGroups }) => {
  return (
    <DefaultLayout taskGroups={taskGroups}>
      <a href="https://github.com/commew/timelogger-web/issues/91">
        TODO 91のissue
      </a>
      でこのページは削除されLPの内容が表示されるようになります。
    </DefaultLayout>
  );
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

export default IndexPage;
