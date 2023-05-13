import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { findAccount } from '@/api/server/fetch/account';
import {
  getBackendApiUrl,
  InvalidResponseBodyError,
  UnexpectedFeatureError,
} from '@/features';
import {
  mockFindAccount,
  mockFindAccountUnexpectedResponseBody,
  mockAccountUnAuthenticatedError,
  mockInternalServerError,
} from '@/mocks';

const mockHandlers = [rest.get(getBackendApiUrl('accounts'), mockFindAccount)];

const mockServer = setupServer(...mockHandlers);

describe('src/api/server/fetch/account.ts findAccount TestCases', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  const mockAppToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OSIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiZXhwIjoxNjgzNzMxMzIzLCJqdGkiOiIzNTY3ZGIyNy0zM2RlLTQyMTctOGM5Zi01ODhhYjVkMDdhZGQiLCJpYXQiOjE2ODExMzkzOTZ9.wV-4ftbM7EwPvyzoqWTNKaC1eZko3juJ84Q9C6X_dYs';

  it('should be able to get an account', async () => {
    const account = await findAccount({
      appToken: mockAppToken,
    });

    const expected = {
      id: 1,
      name: 'すみっこねこ',
      openIdProviders: [
        {
          sub: '99999999999999999999999999999',
          provider: 'google',
        },
      ],
    };

    expect(account).toStrictEqual(expected);
  });

  it('should return null, because the appToken is invalid', async () => {
    mockServer.use(
      rest.get(getBackendApiUrl('accounts'), mockAccountUnAuthenticatedError)
    );

    const dto = {
      appToken: mockAppToken,
    } as const;

    const result = await findAccount(dto);

    expect(result).toBeNull();
  });

  it('should InvalidResponseBodyError Throw, because unexpected response body', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('accounts'),
        mockFindAccountUnexpectedResponseBody
      )
    );

    const dto = {
      appToken: mockAppToken,
    } as const;

    await expect(findAccount(dto)).rejects.toThrow(InvalidResponseBodyError);
  });

  it('should UnexpectedFeatureError Throw, because http status is InternalServerError', async () => {
    mockServer.use(
      rest.get(getBackendApiUrl('accounts'), mockInternalServerError)
    );

    const dto = {
      appToken: mockAppToken,
    } as const;

    await expect(findAccount(dto)).rejects.toThrow(UnexpectedFeatureError);
  });
});
