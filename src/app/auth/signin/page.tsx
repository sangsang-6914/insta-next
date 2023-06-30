import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CustomSignIn from '@/components/CustomSignIn';
import ColorButton from '@/components/ui/ColorButton';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signup or Login to Instantgram',
};
interface Props {
  searchParams: {
    callbackUrl: string;
  };
}

async function SignInPage({ searchParams: { callbackUrl } }: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/');
  }
  const providers = await getProviders();

  return <CustomSignIn providers={providers} callbackUrl={callbackUrl} />;
}

export default SignInPage;
