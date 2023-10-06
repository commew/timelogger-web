import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import {
  fetchPendingTasks,
  fetchTasksRecording,
} from '@/api/server/fetch/task';
import type { PendingTask, TaskGroup, TaskRecording } from '@/features';
import { appUrls } from '@/features';

import { TimerTemplate } from '@/templates';
import { fetchTaskGroups } from '../api/server/fetch/taskGroup';

type Props = {
  tasksRecording: TaskRecording[];
  pendingTasks: PendingTask[];
  taskGroups: TaskGroup[];
};

const TimerPage: NextPage<Props> = ({
  tasksRecording,
  pendingTasks,
  taskGroups,
}) => {
  const [initialTasksRecording, setInitialTasksRecording] =
    useState<TaskRecording[]>(tasksRecording);

  return (
    <TimerTemplate
      tasksRecording={initialTasksRecording}
      setTasksRecording={setInitialTasksRecording}
      pendingTasks={pendingTasks}
      taskGroups={taskGroups}
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

  const fetchTaskGroupsDto = { appToken: session.appToken };
  const taskGroups = await fetchTaskGroups(fetchTaskGroupsDto);

  return {
    props: { tasksRecording, pendingTasks, taskGroups },
  };
};

export default TimerPage;
