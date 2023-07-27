import type { FC } from 'react';
import { Box, Stack, Title, createStyles } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { MeasuringTaskItem } from '@/components';
import type { TaskRecording } from '@/features';
import { DefaultLayout } from '@/layouts';

const useStyles = createStyles((theme) => ({
  measuringHead: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: theme.colors.red[6],
  },
}));

type Props = {
  tasksRecording: TaskRecording[];
};

export const TimerTemplate: FC<Props> = ({ tasksRecording }) => {
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
              <MeasuringTaskItem
                key={index}
                // TODO: カテゴリー名とカテゴリーグループ名を取得する処理を実装する
                categoryName={'Category'}
                categoryGroupName={'Category Group'}
                isMeasuring={true}
              />
            );
          })
        ) : (
          <Box p={'10px'}>記録中のタスクはありません</Box>
        )}
      </Stack>
    </DefaultLayout>
  );
};
