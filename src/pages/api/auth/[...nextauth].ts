import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { appUrls } from '@/features';

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
      return `${baseUrl}${appUrls.gitHubAccountSearch.path}`;
    },
  },
};
export default NextAuth(authOptions);
