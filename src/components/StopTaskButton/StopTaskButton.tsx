import type { FC } from 'react';
import { Button, createStyles, Text } from '@mantine/core';
import { IconPlayerPause } from '@tabler/icons-react';
import { useErrorHandler } from 'react-error-boundary';
import type { HandleStopTask } from '@/features';

const useStyles = createStyles(() => ({
  button: {
    width: '80px',
    height: '34px',
    padding: '7px 10px',
  },
}));

type Props = {
  taskId: number;
  handleStopTask: HandleStopTask;
};

export const StopTaskButton: FC<Props> = ({ taskId, handleStopTask }) => {
  const { classes, theme } = useStyles();

  const handleError = useErrorHandler();

  const clickHandler = async (taksId: number) => {
    try {
      const stopTaskDto = { taskId: taksId };
      await handleStopTask(stopTaskDto);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Button
      leftIcon={
        <IconPlayerPause
          size="1.25rem"
          color={theme.colors.gray[0]}
          stroke={2.75}
        />
      }
      color="indigo.6"
      className={classes.button}
      styles={{ leftIcon: { marginRight: '0.5rem' } }}
      aria-label="STOP"
      onClick={async () => {
        await clickHandler(taskId);
      }}
    >
      <Text color="gray.0" fz="xs" fw={700}>
        停止
      </Text>
    </Button>
  );
};
