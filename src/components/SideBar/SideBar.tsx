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

type Category = Readonly<{
  id: number;
  name: string;
}>;

type CategoryGroup = Readonly<{
  id: number;
  name: string;
  categories: Category[];
}>;

// ここがAPIのレスポンス結果に置き変わるイメージ。
const mockGroups: CategoryGroup[] = [
  {
    id: 1,
    name: '仕事',
    categories: [
      { id: 1, name: '会議' },
      { id: 2, name: '資料作成' },
    ],
  },
  { id: 2, name: '学習', categories: [{ id: 3, name: 'TOEIC' }] },
  {
    id: 3,
    name: '趣味',
    categories: [
      { id: 4, name: '散歩' },
      { id: 5, name: '読書' },
    ],
  },
  {
    id: 4,
    name: 'グループ未分類',
    categories: [{ id: 6, name: '移動・外出' }],
  },
];

export const SideBar: FC = () => {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronDown : IconChevronUp;

  return (
    <Navbar height={800} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        {mockGroups.map((group) => (
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
                    name={category.name}
                  />
                ))}
              </Group>
            </Collapse>
          </Group>
        ))}
        <TaskMeasurementCategoryButton name="カテゴリ名" />
        <TaskMeasurementCategoryButton name="カテゴリ名" />
      </Navbar.Section>
    </Navbar>
  );
};
