import { useState } from 'react';

import { createTask } from '@/api/client/fetch/task';
import type { TaskRecording, HandleCreateTask, UseTask } from '@/features';

export const useTask: UseTask = (recordingTasks: TaskRecording[]) => {
  const [initialRecordingTasks, setRecordingTasks] =
    useState<TaskRecording[]>(recordingTasks);

  const handleCreateTask: HandleCreateTask = async (dto) => {
    const { taskGroupId, taskCategoryId, status } = dto;

    const createdTask = await createTask({
      taskGroupId,
      taskCategoryId,
      status,
    });

    setRecordingTasks([...recordingTasks, createdTask]);
  };

  return {
    initialRecordingTasks,
    handleCreateTask,
  };
};
