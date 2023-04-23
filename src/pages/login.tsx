import type { MouseEvent } from 'react';
import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { LoginLayout } from '@/layouts';
import { LoginTemplate } from '@/templates/LoginTemplate';

const handleLogin = async (event: MouseEvent<HTMLImageElement>) => {
  event.preventDefault();

  await signIn('google');
};

const LoginPage: NextPage = () => {
  return (
    <LoginLayout>
      <LoginTemplate handleLogin={handleLogin} />
    </LoginLayout>
  );
};

export default LoginPage;
