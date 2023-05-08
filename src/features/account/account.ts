import type { OidcProvider } from '@/features';
import type { components } from '@/openapi/schema';

type Sub = components['schemas']['OpenIdProvider']['sub'];

type CreateAccountDto = {
  sub: Sub;
  oidcProvider: OidcProvider;
};

type Account = components['schemas']['Account'] & {
  readonly openIdProviders: Array<{
    sub: Sub;
    provider: OidcProvider;
  }>;
};

export type CreateAccount = (dto: CreateAccountDto) => Promise<Account>;

type FindAccountDto = {
  appToken: string;
};

export type FindAccount = (dto: FindAccountDto) => Promise<Account | null>;
