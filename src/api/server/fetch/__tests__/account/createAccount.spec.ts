import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { createAccount } from '@/api/server/fetch/account';
import {
  getBackendApiUrl,
  InvalidResponseBodyError,
  UnexpectedFeatureError,
} from '@/features';
import {
  mockCreateAccount,
  mockCreateAccountUnexpectedResponseBody,
  mockInternalServerError,
} from '@/mocks';

const mockHandlers = [
  rest.post(getBackendApiUrl('accounts'), mockCreateAccount),
];

const mockServer = setupServer(...mockHandlers);

describe('src/api/server/fetch/account.ts createAccount TestCases', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  it('should be able to create an account', async () => {
    const createdAccount = await createAccount({
      sub: '99999999999999999999999999999',
      oidcProvider: 'google',
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

    expect(createdAccount).toStrictEqual(expected);
  });

  it('should InvalidResponseBodyError Throw, because unexpected response body', async () => {
    mockServer.use(
      rest.post(
        getBackendApiUrl('accounts'),
        mockCreateAccountUnexpectedResponseBody
      )
    );

    const dto = {
      sub: '99999999999999999999999999999',
      oidcProvider: 'google',
    } as const;

    await expect(createAccount(dto)).rejects.toThrow(InvalidResponseBodyError);
  });

  it('should UnexpectedFeatureError Throw, because http status is not created', async () => {
    mockServer.use(
      rest.post(getBackendApiUrl('accounts'), mockInternalServerError)
    );

    const dto = {
      sub: '99999999999999999999999999999',
      oidcProvider: 'google',
    } as const;

    await expect(createAccount(dto)).rejects.toThrow(UnexpectedFeatureError);
  });
});
