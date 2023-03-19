import { isOidcProvider } from '@/features';

describe('src/features/auth/oidc.ts isOidcProvider Test Cases', () => {
  it.each([
    [true, 'google'],
    [false, 'amazon'],
    [false, 1],
    [false, {}],
    [false, null],
    [false, undefined],
  ])('returns %p when the input is %p', (expected, input) => {
    expect(isOidcProvider(input)).toBe(expected);
  });
});
