import type { FC } from 'react';
import { Box, createStyles, Flex, Group, Text } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import {
  StopTaskButton,
  StartTaskButton,
  CompleteTaskButton,
} from '@/components';
import { ExhaustiveError } from '@/features';
import type { HandleStartTask, HandleStopTask } from '@/features';
import { useTaskTimer } from '@/hooks';

const useStyles = createStyles((theme) => ({
  button: {
    width: '80px',
    height: '34px',
    padding: '7px 10px',
  },
  task_item: {
    borderLeft: '5px solid #30BCF9',
    padding: '0.5rem 1rem',
    maxWidth: '800px',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: theme.spacing.xl,
  },
}));

type Props = {
  categoryName: string;
  categoryGroupName: string;
  duration: number;
  status: 'recording' | 'pending' | 'completed';
  handleStartTask: HandleStartTask;
  handleStopTask: HandleStopTask;
};

export const TaskItem: FC<Props> = ({
  categoryName,
  categoryGroupName,
  duration,
  status,
  handleStartTask,
  handleStopTask,
}) => {
  const { classes, theme } = useStyles();

  const time = useTaskTimer(duration, status);

  const renderChangeStatusButton = () => {
    switch (status) {
      case 'recording':
        return <StopTaskButton taskId={1} handleStopTask={handleStopTask} />;
      case 'pending':
        return <StartTaskButton taskId={1} handleStartTask={handleStartTask} />;
      case 'completed':
        return;
      default:
        throw new ExhaustiveError(status);
    }
  };

  return (
    <Flex className={classes.task_item}>
      <Flex
        align="center"
        justify="space-between"
        columnGap="xl"
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <Flex align="center" columnGap="1rem">
          <IconHome size="2.5rem" stroke={1.5} color="#30BCF9" />
          <Flex direction="column">
            <Text color="dark.6" fz="sm">
              {categoryGroupName}
            </Text>
            <Text color="dark.6" fz="xl">
              {categoryName}
            </Text>
          </Flex>
        </Flex>

        <Box>
          <Text fz="sm">計測時間</Text>
          <Text color="dark.6" fz={theme.headings.sizes.h1.fontSize} fw={700}>
            {time}
          </Text>
        </Box>
      </Flex>

      <Group style={{ alignSelf: 'flex-end' }}>
        {renderChangeStatusButton()}
        <CompleteTaskButton taskId={1} />
      </Group>
    </Flex>
  );
};
