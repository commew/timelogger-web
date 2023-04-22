import type { NextPage } from 'next';
import { LoginLayout } from '@/layouts';
import { LoginTemplate } from '@/templates/LoginTemplate';

const LoginPage: NextPage = () => {
  return (
    <LoginLayout>
      <LoginTemplate />
    </LoginLayout>
  );
};

export default LoginPage;
