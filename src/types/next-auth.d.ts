import NextAuth, { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      username?: string;
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
