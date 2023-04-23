import type { FC } from 'react';
import { createStyles, Header, Group, Menu, Center } from '@mantine/core';
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
  },
  linkLabel: {
    marginRight: 40,
    fontWeight: 700,
    color: theme.colors.dark[6],
  },
}));

export const HeaderNavigation: FC = () => {
  const { classes } = useStyles();

  return (
    <Header height={60} mb={20} px={60} className={classes.header}>
      <div className={classes.inner}>
        <MantineLogo size={28} />
        <Group spacing={4} pl={30}>
          <Menu>
            <Menu.Target>
              <Link href={'/'} className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>計測</span>
                </Center>
              </Link>
            </Menu.Target>
          </Menu>
          <Menu>
            <Menu.Target>
              <Link href={'/'} className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>集計</span>
                </Center>
              </Link>
            </Menu.Target>
          </Menu>
          <Menu>
            <Menu.Target>
              <Link href={'/'} className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>タスク履歴</span>
                </Center>
              </Link>
            </Menu.Target>
          </Menu>
          <Menu>
            <Menu.Target>
              <Link href={'/'} className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>各種設定</span>
                </Center>
              </Link>
            </Menu.Target>
          </Menu>
        </Group>
        <Group position="right" ml={'auto'}>
          <Link href={'/'} className={classes.link}>
            <Center>
              <span className={classes.linkLabel}>ログアウト</span>
            </Center>
          </Link>
        </Group>
      </div>
    </Header>
  );
};
