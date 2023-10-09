import { useState } from 'react';
import type { FC } from 'react';
import {
  Group,
  Box,
  Collapse,
  Navbar,
  UnstyledButton,
  createStyles,
} from '@mantine/core';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import type { TaskGroup, HandleCreateTask } from '@/features';
import { TaskMeasurementCategoryButton } from '../TaskMeasurementCategoryButton';

const useStyles = createStyles((theme) => ({
  button: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },
  chevron: {
    transition: 'transform 200ms ease',
  },
  navbar: {
    backgroundColor: theme.white,
    paddingBottom: 0,
    borderRightWidth: 0,
    width: '30%',
  },
}));

type Props = {
  taskGroups: TaskGroup[];
  handleCreateTask: HandleCreateTask;
};

export const SideBar: FC<Props> = ({ taskGroups, handleCreateTask }) => {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronDown : IconChevronUp;

  return (
    <Navbar height={800} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        {taskGroups.map((group) => (
          <Group
            key={group.id}
            sx={{ rowGap: theme.spacing.xs, paddingBottom: theme.spacing.xs }}
          >
            <UnstyledButton
              onClick={() => {
                setOpened((prevOpened) => ({
                  ...prevOpened,
                  [group.id]: !prevOpened[group.id],
                }));
              }}
              className={classes.button}
            >
              <Group position="apart" spacing={0}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ChevronIcon
                    className={classes.chevron}
                    size="1rem"
                    stroke={1.5}
                    style={{
                      transform: opened[group.id]
                        ? `rotate(${theme.dir !== 'rtl' ? -180 : -180}deg)`
                        : 'none',
                    }}
                  />
                  <Box ml="2rem">{group.name}</Box>
                </Box>
              </Group>
            </UnstyledButton>
            <Collapse in={opened[group.id]} pl={'1.25rem'} w={'100%'}>
              <Group spacing={0}>
                {group.categories.map((category) => (
                  <TaskMeasurementCategoryButton
                    key={category.id}
                    groupId={group.id}
                    categoryId={category.id}
                    name={category.name}
                    handleCreateTask={handleCreateTask}
                  />
                ))}
              </Group>
            </Collapse>
          </Group>
        ))}
      </Navbar.Section>
    </Navbar>
  );
};
