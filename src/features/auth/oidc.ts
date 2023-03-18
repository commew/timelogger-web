// 利用するProviderの種類が増えたら文字列リテラルのユニオン型を使って拡張する
export type OidcProvider = 'google';

export const isOidcProvider = (value: unknown): value is OidcProvider => {
  if (typeof value !== 'string') {
    return false;
  }

  // Providerの種類が増えたらリファクタリングを検討
  // Providerの種類が増えたら https://next-auth.js.org/providers/ を参照
  return value === 'google';
};
