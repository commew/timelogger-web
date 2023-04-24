import type { FC, MouseEventHandler } from 'react';
import { createStyles, Header, Group, Menu, Button } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.timmew[0],
    borderBottom: 0,
  },
  inner: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    marginRight: 40,
    fontWeight: 700,
    color: theme.colors.dark[6],
  },
  logoutBtn: {
    textDecoration: 'none',
    marginRight: 40,
    fontWeight: 700,
    color: theme.colors.dark[6],
    '&:hover': {
      background: 'none',
    },
  },
}));

type Props = {
  handleLogout: MouseEventHandler;
};

export const HeaderNavigation: FC<Props> = ({ handleLogout }) => {
  const { classes } = useStyles();

  return (
    <Header height={60} mb={20} px={60} className={classes.header}>
      <div className={classes.inner}>
        <MantineLogo size={28} />
        <Group spacing={4} pl={30}>
          <Menu>
            <Menu.Target>
              <Link href={'/'} className={classes.link}>
                計測
              </Link>
            </Menu.Target>
          </Menu>
          <Menu>
            <Menu.Target>
              <Link href={'/'} className={classes.link}>
                集計
              </Link>
            </Menu.Target>
          </Menu>
          <Menu>
            <Menu.Target>
              <Link href={'/'} className={classes.link}>
                タスク履歴
              </Link>
            </Menu.Target>
          </Menu>
          <Menu>
            <Menu.Target>
              <Link href={'/'} className={classes.link}>
                各種設定
              </Link>
            </Menu.Target>
          </Menu>
        </Group>
        <Group position="right" ml={'auto'}>
          <Button
            onClick={handleLogout}
            className={classes.logoutBtn}
            variant="subtle"
          >
            ログアウト
          </Button>
        </Group>
      </div>
    </Header>
  );
};
