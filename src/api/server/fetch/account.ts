import type { Account, CreateAccount } from '@/features';
import {
  getBackendApiUrl,
  httpStatusCode,
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  isAccount,
} from '@/features';
import type { components } from '@/openapi/schema';

export const createAccount: CreateAccount = async (dto) => {
  const { sub, oidcProvider } = dto;

  const requestBody: components['schemas']['OpenIdProvider'] = {
    sub,
    provider: oidcProvider,
  };

  const response = await fetch(getBackendApiUrl('accounts'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (response.status !== httpStatusCode.created) {
    throw new UnexpectedFeatureError(
      `failed to createAccount. status: ${
        response.status
      }, body: ${await response.text()}`
    );
  }

  const account = (await response.json()) as Account;
  if (!isAccount(account)) {
    throw new InvalidResponseBodyError(
      `responseBody is not in the expected format. body: ${JSON.stringify(
        account
      )}`
    );
  }

  return account;
};
