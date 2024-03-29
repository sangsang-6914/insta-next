import './globals.css';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import { NextAuthProvider } from '@/context/NextAuthProvider';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Metadata } from 'next';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Instantgram',
    template: 'Instantgram | %s',
  },
  description: 'Instantgram Photos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sans.className} w-full overflow-auto bg-neutral-50`}>
        <NextAuthProvider>
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-screen-xl mx-auto">
              <Header />
            </div>
          </header>
          <main className="w-full flex justify-center mx-auto max-w-screen-xl">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </NextAuthProvider>
        <div id="portal" />
      </body>
    </html>
  );
}
