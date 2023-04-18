import { useState } from 'react';
import type { FC } from 'react';
import {
  Group,
  Box,
  Collapse,
  Navbar,
  UnstyledButton,
  createStyles,
  NavLink,
} from '@mantine/core';
import { IconChevronUp, IconChevronDown, IconHome } from '@tabler/icons-react';

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
    name: 'グループ名1',
    categories: [
      {
        id: 1,
        name: 'カテゴリ名1',
      },
      {
        id: 2,
        name: 'カテゴリ名2',
      },
      {
        id: 3,
        name: 'カテゴリ名3',
      },
    ],
  },
  {
    id: 2,
    name: 'グループ名2',
    categories: [
      {
        id: 4,
        name: 'カテゴリ名4',
      },
      {
        id: 5,
        name: 'カテゴリ名5',
      },
      {
        id: 6,
        name: 'カテゴリ名6',
      },
    ],
  },
  {
    id: 3,
    name: 'グループ名3',
    categories: [
      {
        id: 7,
        name: 'カテゴリ名7',
      },
      {
        id: 8,
        name: 'カテゴリ名8',
      },
      {
        id: 9,
        name: 'カテゴリ名9',
      },
    ],
  },
  {
    id: 4,
    name: 'グループ名4',
    categories: [
      {
        id: 10,
        name: 'カテゴリ名10',
      },
      {
        id: 11,
        name: 'カテゴリ名11',
      },
      {
        id: 12,
        name: 'カテゴリ名12',
      },
    ],
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
          <Group key={group.id}>
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
            <Collapse in={opened[group.id]} pl={'1.25rem'}>
              <Group>
                <NavLink
                  icon={
                    <IconHome
                      size="1rem"
                      stroke={1.5}
                      color={theme.colors.blue[6]}
                    />
                  }
                  label="カテゴリ名"
                ></NavLink>
                <NavLink
                  icon={
                    <IconHome
                      size="1rem"
                      stroke={1.5}
                      color={theme.colors.blue[6]}
                    />
                  }
                  label="カテゴリ名カテゴリ名カテゴリ名カテゴリ名カテゴリ名カテゴリ名"
                ></NavLink>
                <NavLink
                  icon={
                    <IconHome
                      size="1rem"
                      stroke={1.5}
                      color={theme.colors.blue[6]}
                    />
                  }
                  label="カテゴリ名"
                ></NavLink>
              </Group>
            </Collapse>
          </Group>
        ))}
        <NavLink
          icon={
            <IconHome size="1rem" stroke={1.5} color={theme.colors.blue[6]} />
          }
          label="カテゴリ名"
        ></NavLink>
        <NavLink
          icon={
            <IconHome size="1rem" stroke={1.5} color={theme.colors.blue[6]} />
          }
          label="カテゴリ名"
        ></NavLink>
      </Navbar.Section>
    </Navbar>
  );
};
