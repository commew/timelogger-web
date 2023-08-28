import type { FC } from 'react';
import { Box, Stack, Title, createStyles } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import { TaskItem } from '@/components';
import type { PendingTask, TaskRecording } from '@/features';
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
  pendingTasks: PendingTask[];
};

export const TimerTemplate: FC<Props> = ({ tasksRecording, pendingTasks }) => {
  const { classes, theme } = useStyles();

  return (
    <DefaultLayout>
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
                // TODO: カテゴリー名とカテゴリーグループ名を取得する処理を実装する
                categoryName={'Category'}
                categoryGroupName={'Category Group'}
                duration={taskRecording.duration}
                status={taskRecording.status}
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
                // TODO: カテゴリー名とカテゴリーグループ名を取得する処理を実装する
                categoryName={'Category'}
                categoryGroupName={'Category Group'}
                duration={pendingTask.duration}
                status={pendingTask.status}
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
