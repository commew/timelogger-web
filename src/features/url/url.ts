import { z } from 'zod';
import { type paths } from '@/openapi/schema';
import { ExhaustiveError } from '../errors';

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

type BackendApiPaths = {
  accounts: keyof Pick<paths, '/accounts'>;
  taskGroups: keyof Pick<paths, '/task-groups'>;
  tasks: keyof Pick<paths, '/tasks'>;
};

const backendApiPaths: BackendApiPaths = {
  accounts: '/accounts',
  taskGroups: '/task-groups',
  tasks: '/tasks',
};

type BackendApiPath = keyof BackendApiPaths;

type BackendApiUrl = AppUrl;

const isBackendApiUrl = (value: unknown): value is BackendApiUrl => {
  return isAppUrl(value);
};

const backendApiUrl = (): BackendApiUrl => {
  if (isBackendApiUrl(process.env.BACKEND_API_BASE_URL)) {
    return process.env.BACKEND_API_BASE_URL;
  }

  return 'http://localhost:5757';
};

export const getBackendApiUrl = (
  path: BackendApiPath
): `${BackendApiUrl}${keyof paths}` => {
  const apiUrl = backendApiUrl();

  const apiPath: keyof paths = backendApiPaths[path];

  return `${apiUrl}${apiPath}`;
};

type DynamicBackendApiPaths = {
  stopTask: (
    path: keyof Pick<paths, '/tasks/{taskId}/stop'>,
    param: string
  ) => string;
};

type DynamicBackendApiPath = keyof DynamicBackendApiPaths;

const dynamicBackendApiPaths: DynamicBackendApiPaths = {
  stopTask: (path, param) => path.replace('{taskId}', `${param}`),
};

export const getDynamicBackendApiUrl = (
  path: DynamicBackendApiPath,
  param: string
): string => {
  const apiUrl = backendApiUrl();

  switch (path) {
    case 'stopTask': {
      const apiPath = dynamicBackendApiPaths[path](
        '/tasks/{taskId}/stop',
        param
      );

      return `${apiUrl}${apiPath}`;
    }

    default:
      throw new ExhaustiveError(path);
  }
};
