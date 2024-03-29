import type { FC } from 'react';
import { createStyles, Box } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconHome } from '@tabler/icons-react';
import Image from 'next/image';
import type { HandleCreateTask } from '@/features';
import hoveredImageSrc from './hover.webp';

const useStyles = createStyles((theme) => ({
  button: {
    alignItems: 'center',
    boxSizing: 'border-box',
    color: theme.black,
    display: 'grid',
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    gap: theme.spacing.xs,
    gridTemplateColumns: '1fr 32px',
    minHeight: '32px',
    maxWidth: '240px',
    width: '100%',

    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

type Props = {
  groupId: number;
  categoryId: number;
  name: string;
  handleCreateTask: HandleCreateTask;
};

export const TaskMeasurementCategoryButton: FC<Props> = ({
  groupId,
  categoryId,
  name,
  handleCreateTask,
}) => {
  const { classes, theme } = useStyles();
  const { hovered, ref } = useHover();

  const handleClick = async () => {
    await handleCreateTask({
      taskGroupId: groupId,
      taskCategoryId: categoryId,
      status: 'recording',
    });
  };

  return (
    <Box
      className={classes.button}
      ref={ref}
      role="button"
      onClick={handleClick}
    >
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: 'auto 1fr',
          gap: '14px',
        }}
      >
        <IconHome size="1rem" stroke={1.5} color={theme.colors.blue[6]} />
        {name}
      </Box>
      {hovered ? (
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={hoveredImageSrc}
          alt={'タスクの計測を開始'}
          width={32}
          height={32}
        />
      ) : (
        ''
      )}
    </Box>
  );
};
