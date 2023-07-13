import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { appUrls } from '@/features';
import { DefaultLayout } from '@/layouts';

const TimerPage: NextPage = () => {
  return (
    <DefaultLayout>
      <div>TODO このページにタスクの計測等の機能を載せる</div>
    </DefaultLayout>
  );
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

export default TimerPage;
