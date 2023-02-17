import type { FC } from 'react';
import { Avatar, Paper, Text } from '@mantine/core';
import type { GitHubAccount } from '@/features';

type Props = {
  gitHubAccount: GitHubAccount;
};

export const GitHubAccountCard: FC<Props> = ({ gitHubAccount }) => {
  return (
    <Paper radius="md" withBorder p="lg">
      <Avatar src={gitHubAccount.avatarUrl} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {gitHubAccount.name}
      </Text>
    </Paper>
  );
};
