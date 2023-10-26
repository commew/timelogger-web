import { z } from 'zod';
import { type paths } from '@/openapi/schema';
import { ExhaustiveError } from '../errors';

const appUrlIdList = ['top', 'gitHubAccountSearch', 'login', 'timer'] as const;

type AppUrlId = (typeof appUrlIdList)[number];

const appUrlPathList = ['/', '/search', '/login', '/timer'] as const;

type AppUrlPath = (typeof appUrlPathList)[number];

export const appUrlNameList = [
  'トップ',
  'GitHubAccount検索',
  'ログイン',
  '計測',
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
  timer: {
    path: '/timer',
    name: '計測',
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

  return 'http://localhost:5656';
};

type AppApiPaths = {
  tasks: '/api/tasks/create';
  startTask: '/api/tasks/start';
  stopTask: '/api/tasks/stop';
  completeTask: '/api/tasks/complete';
};

const appApiPaths: AppApiPaths = {
  tasks: '/api/tasks/create',
  startTask: '/api/tasks/start',
  stopTask: '/api/tasks/stop',
  completeTask: '/api/tasks/complete',
};

type AppApiPathName = keyof AppApiPaths;
type AppApiPath = (typeof appApiPaths)[keyof typeof appApiPaths];

export const getAppApiUrl = (path: AppApiPathName): `${AppApiPath}` => {
  switch (path) {
    case 'tasks':
    case 'startTask':
    case 'stopTask':
    case 'completeTask': {
      const apiPath: AppApiPath = appApiPaths[path];

      return `${apiPath}`;
    }

    default:
      throw new ExhaustiveError(path);
  }
};

type BackendApiPaths = {
  accounts: keyof Pick<paths, '/accounts'>;
  taskGroups: keyof Pick<paths, '/task-groups'>;
  tasks: keyof Pick<paths, '/tasks'>;
  getTasksRecording: keyof Pick<paths, '/tasks/recording'>;
  getTasksPending: keyof Pick<paths, '/tasks/pending'>;
  getTaskGroups: keyof Pick<paths, '/task-groups'>;
};

const backendApiPaths: BackendApiPaths = {
  accounts: '/accounts',
  taskGroups: '/task-groups',
  tasks: '/tasks',
  getTasksRecording: '/tasks/recording',
  getTasksPending: '/tasks/pending',
  getTaskGroups: '/task-groups',
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
  completeTask: (
    path: keyof Pick<paths, '/tasks/{taskId}/complete'>,
    param: string
  ) => string;
  startTask: (
    path: keyof Pick<paths, '/tasks/{taskId}/start'>,
    param: string
  ) => string;
};

type DynamicBackendApiPath = keyof DynamicBackendApiPaths;

const dynamicBackendApiPaths: DynamicBackendApiPaths = {
  stopTask: (path, param) => path.replace('{taskId}', `${param}`),
  completeTask: (path, param) => path.replace('{taskId}', `${param}`),
  startTask: (path, param) => path.replace('{taskId}', `${param}`),
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
    case 'completeTask': {
      const apiPath = dynamicBackendApiPaths[path](
        '/tasks/{taskId}/complete',
        param
      );

      return `${apiUrl}${apiPath}`;
    }
    case 'startTask': {
      const apiPath = dynamicBackendApiPaths[path](
        '/tasks/{taskId}/start',
        param
      );

      return `${apiUrl}${apiPath}`;
    }

    default:
      throw new ExhaustiveError(path);
  }
};
