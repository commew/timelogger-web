import { z } from 'zod';
import type { FetchGitHubAccount } from '@/features';
import { GitHubAccountNotFoundError, httpStatusCode } from '@/features';

// https://api.github.com/users/USERNAME のResponseBody
// 必要な項目だけ定義している
type FetchGitHubAccountResponseBody = {
  login: string;
  avatar_url: string;
};

const fetchGitHubAccountResponseBodySchema = z.object({
  login: z.string().min(1),
  avatar_url: z.string().url(),
});

export const fetchGitHubAccount: FetchGitHubAccount = async (dto) => {
  const headers: HeadersInit =
    dto.accessToken != null
      ? {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${dto.accessToken}`,
        }
      : { Accept: 'application/vnd.github+json' };

  const options: RequestInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers,
  };

  const response = await fetch(
    `https://api.github.com/users/${dto.name}`,
    options
  );

  if (response.status !== httpStatusCode.ok) {
    if (httpStatusCode.notFound) {
      throw new GitHubAccountNotFoundError();
    }
  }

  // fetchGitHubAccountResponseBodySchema.parse() に失敗した場合例外がThrowされるのでここで型アサーションを使っても型安全は保証されている
  const responseBody =
    (await response.json()) as FetchGitHubAccountResponseBody;

  fetchGitHubAccountResponseBodySchema.parse(responseBody);

  return {
    name: responseBody.login,
    avatarUrl: responseBody.avatar_url,
  };
};
