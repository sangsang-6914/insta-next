import { AuthUser } from '@/sanity/sanity';
import NextAuth, { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}
