import { useState } from 'react';

import {
  completeTask,
  createTask,
  startTask,
  stopTask,
} from '@/api/client/fetch/task';
import type {
  TaskRecording,
  HandleCreateTask,
  UseTask,
  PendingTask,
  HandleStartTask,
  HandleStopTask,
  HandleCompleteTask,
} from '@/features';

export const useTask: UseTask = (
  recordingTasks: TaskRecording[],
  pendingTasks: PendingTask[]
) => {
  const [initialRecordingTasks, setRecordingTasks] =
    useState<TaskRecording[]>(recordingTasks);
  const [initialPendingTasks, setPendingTasks] =
    useState<PendingTask[]>(pendingTasks);

  const handleCreateTask: HandleCreateTask = async (dto) => {
    const { taskGroupId, taskCategoryId, status } = dto;

    const createdTask = await createTask({
      taskGroupId,
      taskCategoryId,
      status,
    });

    setRecordingTasks([...recordingTasks, createdTask]);
  };

  const handleStartTask: HandleStartTask = async (dto) => {
    const { taskId } = dto;

    const startedTask = await startTask({
      taskId,
    });

    setRecordingTasks([...recordingTasks, startedTask]);
    setPendingTasks(pendingTasks.filter((task) => task.id !== taskId));
  };

  const handleStopTask: HandleStopTask = async (dto) => {
    const { taskId } = dto;

    const stoppedTask = await stopTask({
      taskId,
    });

    setRecordingTasks(
      initialRecordingTasks.filter((task) => task.id !== taskId)
    );
    setPendingTasks([...initialPendingTasks, stoppedTask]);
  };

  const handleCompleteTask: HandleCompleteTask = async (dto) => {
    const { taskId } = dto;

    const completedTask = await completeTask({
      taskId,
    });

    setPendingTasks(
      initialPendingTasks.filter((task) => task.id !== completedTask.id)
    );
    setRecordingTasks(
      initialRecordingTasks.filter((task) => task.id !== taskId)
    );
  };

  return {
    initialRecordingTasks,
    initialPendingTasks,
    handleCreateTask,
    handleStartTask,
    handleStopTask,
    handleCompleteTask,
  };
};
