import type { DefaultSession } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';
import type { OidcProvider } from '@/features';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    appToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    iat: number;
    exp: number;
    jti: string;
    accessToken?: string;
    provider?: OidcProvider;
  }
}
