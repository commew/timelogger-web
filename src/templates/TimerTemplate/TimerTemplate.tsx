import type { FC } from 'react';
import { Box, Stack, Title, createStyles } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import { useErrorHandler } from 'react-error-boundary';
import { TaskItem } from '@/components';
import {
  findTaskCategoryById,
  type HandleStartTask,
  type HandleCreateTask,
  type PendingTask,
  type TaskGroup,
  type TaskRecording,
} from '@/features';
import { DefaultLayout } from '@/layouts';

const useStyles = createStyles((theme) => ({
  measuringHead: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: theme.colors.red[6],
  },
  pendingHead: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: theme.colors.indigo[6],
  },
}));

type Props = {
  tasksRecording: TaskRecording[];
  handleCreateTask: HandleCreateTask;
  handleStartTask: HandleStartTask;
  pendingTasks: PendingTask[];
  taskGroups: TaskGroup[];
};

export const TimerTemplate: FC<Props> = ({
  tasksRecording,
  handleCreateTask,
  handleStartTask,
  pendingTasks,
  taskGroups,
}) => {
  const { classes, theme } = useStyles();
  const handleError = useErrorHandler();

  const getTaskGroupName = (taskGroupId: number) => {
    try {
      const taskGroup = findTaskCategoryById(taskGroups, taskGroupId);

      return taskGroup.name;
    } catch (error) {
      handleError(error);
    }
  };

  const getTaskCategoryName = (taskCategoryId: number) => {
    try {
      const taskCategory = findTaskCategoryById(taskGroups, taskCategoryId);

      return taskCategory.name;
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <DefaultLayout taskGroups={taskGroups} handleCreateTask={handleCreateTask}>
      <Title order={2} className={classes.measuringHead} mt={'2rem'}>
        <IconPlayerPlay
          size="1.25rem"
          color={theme.colors.red[6]}
          stroke={2.75}
        />
        記録中
      </Title>
      <Stack mt={'1rem'}>
        {tasksRecording.length > 0 ? (
          tasksRecording.map((taskRecording, index) => {
            return (
              <TaskItem
                key={index}
                categoryName={
                  getTaskCategoryName(taskRecording.taskCategoryId) ?? ''
                }
                categoryGroupName={
                  getTaskGroupName(taskRecording.taskGroupId) ?? ''
                }
                duration={taskRecording.duration}
                status={taskRecording.status}
                handleStartTask={handleStartTask}
              />
            );
          })
        ) : (
          <Box p={'10px'}>記録中のタスクはありません</Box>
        )}
      </Stack>

      <Title order={2} className={classes.pendingHead} mt={'2rem'}>
        <IconPlayerPause
          size="1.25rem"
          color={theme.colors.indigo[6]}
          stroke={2.75}
        />
        停止中
      </Title>
      <Stack mt={'1rem'}>
        {pendingTasks.length > 0 ? (
          pendingTasks.map((pendingTask, index) => {
            return (
              <TaskItem
                key={index}
                categoryName={
                  getTaskCategoryName(pendingTask.taskCategoryId) ?? ''
                }
                categoryGroupName={
                  getTaskGroupName(pendingTask.taskGroupId) ?? ''
                }
                duration={pendingTask.duration}
                status={pendingTask.status}
                handleStartTask={handleStartTask}
              />
            );
          })
        ) : (
          <Box p={'10px'}>停止中のタスクはありません</Box>
        )}
      </Stack>
    </DefaultLayout>
  );
};
