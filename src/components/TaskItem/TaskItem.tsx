import type { FC } from 'react';
import { Box, Button, createStyles, Flex, Group, Text } from '@mantine/core';
import {
  IconPlayerPause,
  IconHome,
  IconSquare,
  IconPlayerPlay,
} from '@tabler/icons-react';

const useStyles = createStyles(() => ({
  button: {
    width: '80px',
    height: '34px',
    padding: '7px 10px',
  },
}));

type Props = {
  categoryName: string;
  categoryGroupName: string;
  isMeasuring: boolean;
};

export const TaskItem: FC<Props> = ({
  categoryName,
  categoryGroupName,
  isMeasuring,
}) => {
  const { classes, theme } = useStyles();

  return (
    <Flex
      align="center"
      justify="space-between"
      columnGap="xl"
      style={{
        borderLeft: '5px solid #30BCF9',
        padding: '0.5rem 1rem',
        maxWidth: '800px',
      }}
    >
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
            00:00:10
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
          >
            <Text color="gray.0" fz="xs" fw={700}>
              開始
            </Text>
          </Button>
        )}
        <Button
          leftIcon={
            <IconSquare
              size="1rem"
              color={theme.colors.dark[6]}
              stroke={2.75}
            />
          }
          color="gray.4"
          className={classes.button}
          styles={{ leftIcon: { marginRight: '0.5rem' } }}
        >
          <Text color="dark.6" fw={700} fz="xs">
            終了
          </Text>
        </Button>
      </Group>
    </Flex>
  );
};
