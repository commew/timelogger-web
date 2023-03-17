import { z } from 'zod';

const appUrlIdList = ['top', 'gitHubAccountSearch', 'login'] as const;

type AppUrlId = (typeof appUrlIdList)[number];

const appUrlPathList = ['/', '/search', '/login'] as const;

type AppUrlPath = (typeof appUrlPathList)[number];

export const appUrlNameList = [
  'トップ',
  'GitHubAccount検索',
  'ログイン',
] as const;

type AppUrlName = (typeof appUrlNameList)[number];

type AppUrls = {
  [key in AppUrlId]: {
    path: AppUrlPath;
    name: AppUrlName;
  };
};

export const appUrls: AppUrls = {
  top: {
    path: '/',
    name: 'トップ',
  },
  gitHubAccountSearch: {
    path: '/search',
    name: 'GitHubAccount検索',
  },
  login: {
    path: '/login',
    name: 'ログイン',
  },
};

type AppUrl = `http://localhost:${string}` | `https://${string}`;

const isAppUrl = (value: unknown): value is AppUrl => {
  const schema = z.string().url();

  try {
    schema.parse(value);

    return true;
  } catch (error) {
    return false;
  }
};

export const appUrl = (): AppUrl => {
  if (isAppUrl(process.env.NEXT_PUBLIC_APP_URL)) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  return 'http://localhost:3000';
};
