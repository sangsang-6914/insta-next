import NewPost from '@/components/NewPost';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new Post',
};

async function NewPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }
  return <NewPost user={user} />;
}

export default NewPage;
