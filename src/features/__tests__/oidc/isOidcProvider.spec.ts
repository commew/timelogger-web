import { isOidcProvider } from '@/features';

type TestTable = {
  arg: unknown;
  expected: boolean;
};

describe('src/features/auth/oidc.ts isOidcProvider Test Cases', () => {
  it.each`
    arg          | expected
    ${'google'}  | ${true}
    ${'amazon'}  | ${false}
    ${1}         | ${false}
    ${{}}        | ${false}
    ${null}      | ${false}
    ${undefined} | ${false}
  `(
    'should returns $expected when the input is $arg',
    ({ arg, expected }: TestTable) => {
      expect(isOidcProvider(arg)).toBe(expected);
    }
  );
});
