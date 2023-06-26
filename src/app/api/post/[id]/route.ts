import { getPost } from '@/sanity/post';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(_: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Fail', { status: 401 });
  }

  return getPost(context.params.id)
    .then((data) => NextResponse.json(data))
    .catch((err) => new Response(`Server Error : ${err}`, { status: 400 }));
}
