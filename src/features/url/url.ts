const appUrlIdList = ['top', 'gitHubAccountSearch'] as const;

type AppUrlId = (typeof appUrlIdList)[number];

const appUrlPathList = ['/', '/search'] as const;

type AppUrlPath = (typeof appUrlPathList)[number];

export const appUrlNameList = ['トップ', 'GitHubAccount検索'] as const;

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
};
