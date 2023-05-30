import './globals.css';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextAuthProvider } from '@/context/NextAuthProvider';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <NextAuthProvider>
          <Header />
          <main>{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
