import type { FC } from 'react';
import { Button, createStyles, Text } from '@mantine/core';
import { IconSquare } from '@tabler/icons-react';
import { useErrorHandler } from 'react-error-boundary';
import { completeTask } from '@/api/client/fetch/task';

const useStyles = createStyles(() => ({
  button: {
    width: '80px',
    height: '34px',
    padding: '7px 10px',
  },
}));

type Props = {
  taskId: number;
};

export const CompleteTaskButton: FC<Props> = ({ taskId }) => {
  const { classes, theme } = useStyles();

  const handleError = useErrorHandler();

  const clickHandler = (taksId: number) => async () => {
    try {
      const completeTaskDto = { taskId: taksId };
      const response = await completeTask(completeTaskDto);
      console.log(response); // TODO: レスポンスデータを元にレンダリングを変更する
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Button
      leftIcon={
        <IconSquare size="1rem" color={theme.colors.dark[6]} stroke={2.75} />
      }
      color="gray.4"
      className={classes.button}
      styles={{ leftIcon: { marginRight: '0.5rem' } }}
      aria-label="COMPLETE"
      onClick={clickHandler(taskId)}
    >
      <Text color="dark.6" fw={700} fz="xs">
        終了
      </Text>
    </Button>
  );
};
