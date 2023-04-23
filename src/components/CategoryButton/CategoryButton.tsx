import type { FC } from 'react';
import { createStyles, Box } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconHome } from '@tabler/icons-react';
import Image from 'next/image';

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
  name: string;
};

export const CategoryButton: FC<Props> = ({ name }) => {
  const { classes, theme } = useStyles();
  const { hovered, ref } = useHover();

  return (
    <Box className={classes.button} ref={ref}>
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
          src={'/CategoryButton/hover.svg'}
          alt={'ホバー時に表示されるボタン'}
          width={32}
          height={32}
        />
      ) : (
        ''
      )}
    </Box>
  );
};
