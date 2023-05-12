import { z } from 'zod';
import type { OidcProvider } from '@/features';
import { oidcProviderSchema } from '@/features/auth';
import type { components } from '@/openapi/schema';

type Sub = components['schemas']['OpenIdProvider']['sub'];

type CreateAccountDto = {
  sub: Sub;
  oidcProvider: OidcProvider;
};

export type Account = components['schemas']['Account'] & {
  readonly openIdProviders: Array<{
    sub: Sub;
    provider: OidcProvider;
  }>;
};

const accountSchema = z.object({
  id: z.number(),
  name: z.string(),
  openIdProviders: z.array(oidcProviderSchema),
});

export const isAccount = (value: unknown): value is Account => {
  const result = accountSchema.safeParse(value);

  return result.success;
};

export type CreateAccount = (dto: CreateAccountDto) => Promise<Account>;

type FindAccountDto = {
  appToken: string;
};

export type FindAccount = (dto: FindAccountDto) => Promise<Account | null>;
