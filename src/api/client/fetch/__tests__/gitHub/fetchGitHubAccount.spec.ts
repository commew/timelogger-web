import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ZodError } from 'zod';
import { fetchGitHubAccount } from '@/api/client/fetch/gitHub';
import { GitHubAccountNotFoundError } from '@/features';
import {
  mockFetchGitHubAccount,
  mockFetchGitHubAccountUnexpectedResponseBody,
  mockNotFoundError,
} from '@/mocks';

const mockHandlers = [
  rest.get('https://api.github.com/users/dummy', mockFetchGitHubAccount),
];

const mockServer = setupServer(...mockHandlers);

describe('src/api/client/fetch/gitHub.ts fetchGitHubAccount TestCases', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  it('should be able to fetch a GItHubAccount', async () => {
    const fetchedGitHubAccount = await fetchGitHubAccount({
      name: 'dummy',
      accessToken: '',
    });

    const expected = {
      name: 'keitakn',
      avatarUrl: 'https://avatars.githubusercontent.com/u/11032365?v=4',
    };

    expect(fetchedGitHubAccount).toStrictEqual(expected);
  });

  it('should GitHubAccountNotFoundError Throw, because GitHubAccount not found', async () => {
    mockServer.use(
      rest.get('https://api.github.com/users/dummy', mockNotFoundError)
    );

    const dto = {
      name: 'dummy',
      accessToken: '',
    };

    await expect(fetchGitHubAccount(dto)).rejects.toThrow(
      GitHubAccountNotFoundError
    );
  });

  it('should ZodError Throw, because unexpected response body', async () => {
    mockServer.use(
      rest.get(
        'https://api.github.com/users/dummy',
        mockFetchGitHubAccountUnexpectedResponseBody
      )
    );

    const dto = {
      name: 'dummy',
      accessToken: '',
    };

    await expect(fetchGitHubAccount(dto)).rejects.toThrow(ZodError);
  });
});
