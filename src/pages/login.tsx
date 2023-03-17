import type { NextPage } from 'next';
import { DefaultLayout } from '@/layouts';
import { LoginTemplate } from '@/templates/LoginTemplate';

const LoginPage: NextPage = () => {
  return (
    <DefaultLayout>
      <LoginTemplate />
    </DefaultLayout>
  );
};

export default LoginPage;
