import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { appUrls } from '@/features';
import { GitHubAccountSearchTemplate } from '@/templates';

const SearchPage: NextPage = () => {
  return <GitHubAccountSearchTemplate />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: appUrls.login.path,
      },
    };
  }

  return {
    props: {},
  };
};

export default SearchPage;
