type GitHubAccountName = string;

type GitHubAvatarUrl = string;

type GitHubAccessToken = string;

export type GitHubAccount = {
  name: GitHubAccountName;
  avatarUrl: GitHubAvatarUrl;
};

type FetchGitHubAccountDto = {
  name: GitHubAccountName;
  accessToken?: GitHubAccessToken;
};

export type FetchGitHubAccount = (
  dto: FetchGitHubAccountDto
) => Promise<GitHubAccount>;
