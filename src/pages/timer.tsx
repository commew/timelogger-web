import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {
  fetchPendingTasks,
  fetchTasksRecording,
} from '@/api/server/fetch/task';
import type { PendingTask, TaskRecording } from '@/features';
import { appUrls } from '@/features';

import { TimerTemplate } from '@/templates';

type Props = {
  tasksRecording: TaskRecording[];
  pendingTasks: PendingTask[];
};

const TimerPage: NextPage<Props> = ({ tasksRecording, pendingTasks }) => {
  return (
    <TimerTemplate
      tasksRecording={tasksRecording}
      pendingTasks={pendingTasks}
    />
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

  const fetchTasksRecordingDto = { appToken: session.appToken };
  const tasksRecording = await fetchTasksRecording(fetchTasksRecordingDto);

  const fetchPendingTasksDto = { appToken: session.appToken };
  const pendingTasks = await fetchPendingTasks(fetchPendingTasksDto);

  return {
    props: { tasksRecording, pendingTasks },
  };
};

export default TimerPage;
