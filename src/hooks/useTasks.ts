import { useState, useEffect } from 'react';
import { fetchTasksRecording } from '@/api/client/fetch/task';
import type { TaskRecording } from '@/features';

export const useTasks = (
  appToken: string
): { tasksRecording: TaskRecording[] } => {
  // 計測中のタスクを取得する
  const [tasksRecording, setTasksRecording] = useState<TaskRecording[]>([]);

  useEffect(() => {
    const startFetching = async () => {
      setTasksRecording([]);
      const result = await fetchTasksRecording({ appToken });
      if (!ignore) {
        setTasksRecording(result);
      }
    };

    let ignore = false;
    void startFetching();

    return () => {
      ignore = true;
    };
  }, [appToken]);

  return { tasksRecording };
};
