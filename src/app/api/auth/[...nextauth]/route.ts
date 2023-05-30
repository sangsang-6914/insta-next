import { createUser } from '@/sanity/sanity';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          id: token.id as string,
          username: user.email?.split('@')[0] || '',
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user: { id, image, email, name } }) {
      if (!email) return false;

      const user = {
        id,
        image,
        name: name || '',
        username: email.split('@')[0],
        email,
      };

      createUser(user);

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
