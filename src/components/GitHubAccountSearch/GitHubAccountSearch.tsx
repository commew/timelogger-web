import { useState, type FC } from 'react';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useErrorHandler } from 'react-error-boundary';
import { fetchGitHubAccount } from '@/api/client/fetch/gitHub';
import type { GitHubAccount } from '@/features';
import { GitHubAccountCard } from './GitHubAccountCard';

export const GitHubAccountSearch: FC = () => {
  const form = useForm({
    initialValues: { inputGitHubAccountName: 'keitakn' },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gitHubAccount, setGitHubAccount] = useState<GitHubAccount>();

  const handleError = useErrorHandler();

  const onSubmit = form.onSubmit(async (values) => {
    try {
      const inputGitHubAccountName = values.inputGitHubAccountName;

      const fetchedGitHubAccount = await fetchGitHubAccount({
        name: inputGitHubAccountName,
      });

      setGitHubAccount(fetchedGitHubAccount);
    } catch (error) {
      handleError(error);
    }
  });

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form method="post" onSubmit={onSubmit}>
          <TextInput
            withAsterisk
            label="GitHubのAccount名を入力して下さい。"
            {...form.getInputProps('inputGitHubAccountName')}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
        {gitHubAccount ? (
          <GitHubAccountCard gitHubAccount={gitHubAccount} />
        ) : (
          ''
        )}
      </Box>
    </>
  );
};
