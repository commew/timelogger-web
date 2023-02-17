import type { FC } from 'react';
import { Menu, Button } from '@mantine/core';
import Link from 'next/link';
import { appUrls } from '@/features';

export const HeaderMenu: FC = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>メニュー</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>リンク</Menu.Label>
        <Menu.Item>
          <Link href={appUrls.top.path} prefetch={false}>
            {appUrls.top.name}
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={appUrls.gitHubAccountSearch.path} prefetch={false}>
            {appUrls.gitHubAccountSearch.name}
          </Link>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
