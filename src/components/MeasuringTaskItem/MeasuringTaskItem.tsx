import type { FC } from 'react';
import { Box, Button, createStyles, Flex, Group, Text } from '@mantine/core';
import { IconPlayerPause, IconHome, IconPlayerPlay } from '@tabler/icons-react';
import { CompleteTaskButton } from '../CompleteTaskButton/CompleteTaskButton';

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
  isMeasuring: boolean;
};

export const MeasuringTaskItem: FC<Props> = ({
  categoryName,
  categoryGroupName,
  isMeasuring,
}) => {
  const { classes, theme } = useStyles();

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
            00:00:10 {/* TODO: ここは動的に値を変更できるようにする */}
          </Text>
        </Box>
      </Flex>

      <Group style={{ alignSelf: 'flex-end' }}>
        {isMeasuring ? (
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
          >
            <Text color="gray.0" fz="xs" fw={700}>
              停止
            </Text>
          </Button>
        ) : (
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
          >
            <Text color="gray.0" fz="xs" fw={700}>
              開始
            </Text>
          </Button>
        )}
        <CompleteTaskButton taskId={1} />
      </Group>
    </Flex>
  );
};
