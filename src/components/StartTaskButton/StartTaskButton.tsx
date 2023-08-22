import type { FC } from 'react';
import { Button, createStyles, Text } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useErrorHandler } from 'react-error-boundary';

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

export const StartTaskButton: FC<Props> = ({ taskId }) => {
  const { classes, theme } = useStyles();

  const handleError = useErrorHandler();

  const clickHandler = (taksId: number) => {
    try {
      // TODO: 停止したタスクを再開するAPIが実装されたらリクエスト処理を実装する
      console.log(`${taksId}のタスクを再開します`);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Button
      leftIcon={
        <IconPlayerPlay
          size="1.25rem"
          color={theme.colors.gray[0]}
          stroke={2.75}
        />
      }
      color="red.6"
      className={classes.button}
      styles={{ leftIcon: { marginRight: '0.5rem' } }}
      aria-label="START"
      onClick={() => {
        clickHandler(taskId);
      }}
    >
      <Text color="gray.0" fz="xs" fw={700}>
        開始
      </Text>
    </Button>
  );
};
