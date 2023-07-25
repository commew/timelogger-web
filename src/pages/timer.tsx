import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { fetchTasksRecording } from '@/api/client/fetch/task';
import type { TaskRecording } from '@/features';
import { appUrls } from '@/features';

import { TimerTemplate } from '@/templates';

type Props = {
  tasksRecording: TaskRecording[];
};

const TimerPage: NextPage<Props> = ({ tasksRecording }) => {
  return <TimerTemplate tasksRecording={tasksRecording} />;
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

  const fetchTasksRecordingDto = { appToken: session.appToken };
  const tasksRecording = await fetchTasksRecording(fetchTasksRecordingDto);

  return {
    props: { tasksRecording },
  };
};

export default TimerPage;
