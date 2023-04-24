import jwt from 'jsonwebtoken';
import NextAuth, {
  type NextAuthOptions,
  type Session,
  type User,
} from 'next-auth';
import type { JWT } from 'next-auth/jwt/types';
import GoogleProvider from 'next-auth/providers/google';
import { appUrls, isOidcProvider } from '@/features';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_OIDC_CLIENT_ID != null
          ? process.env.GOOGLE_OIDC_CLIENT_ID
          : '',
      clientSecret:
        process.env.GOOGLE_OIDC_CLIENT_SECRET != null
          ? process.env.GOOGLE_OIDC_CLIENT_SECRET
          : '',
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    redirect: async ({ baseUrl }) => {
      return `${baseUrl}${appUrls.top.path}`;
    },
    session: async ({
      session,
      token,
    }: {
      session: Session;
      user: User;
      token: JWT;
      // eslint-disable-next-line @typescript-eslint/require-await
    }) => {
      if (token.sub != null && token.provider != null) {
        session.appToken = jwt.sign(
          {
            sub: token.sub,
            provider: token.provider,
            exp: token.exp,
            jti: token.jti,
          },
          String(process.env.NEXTAUTH_SECRET)
        );
      }

      return session;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    jwt: async ({ token, account }) => {
      if (account) {
        if (isOidcProvider(account.provider)) {
          token.provider = account.provider;
        }

        if (account.access_token != null) {
          token.accessToken = account.access_token;
        }
      }

      return token;
    },
  },
};
export default NextAuth(authOptions);
