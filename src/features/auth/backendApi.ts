export const createBackendApiBasicAuthCredential = (): string => {
  const basicAuthUser = process.env.API_BASIC_AUTH_USER ?? '';
  const basicAuthPassword = process.env.API_BASIC_AUTH_PASSWORD ?? '';

  return btoa(`${basicAuthUser}:${basicAuthPassword}`);
};
