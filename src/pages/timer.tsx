import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { appUrls } from '@/features';
import { useTasks } from '@/hooks';
import { TimerTemplate } from '@/templates';

type Props = {
  appToken: string;
};

const TimerPage: NextPage<Props> = ({ appToken }) => {
  const { tasksRecording } = useTasks(appToken);

  return <TimerTemplate tasksRecording={tasksRecording} />;
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
    props: { appToken: session.appToken },
  };
};

export default TimerPage;
