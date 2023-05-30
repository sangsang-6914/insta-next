import { getServerSession } from 'next-auth/next';

import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';

async function NewPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }
  return <div>NewPage</div>;
}

export default NewPage;
