import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {
  fetchTasksPending,
  fetchTasksRecording,
} from '@/api/client/fetch/task';
import type { TaskPending, TaskRecording } from '@/features';
import { appUrls } from '@/features';

import { TimerTemplate } from '@/templates';

type Props = {
  tasksRecording: TaskRecording[];
  tasksPending: TaskPending[];
};

const TimerPage: NextPage<Props> = ({ tasksRecording, tasksPending }) => {
  return (
    <TimerTemplate
      tasksRecording={tasksRecording}
      tasksPending={tasksPending}
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

  const fetchTasksPendingDto = { appToken: session.appToken };
  const tasksPending = await fetchTasksPending(fetchTasksPendingDto);

  return {
    props: { tasksRecording, tasksPending },
  };
};

export default TimerPage;
