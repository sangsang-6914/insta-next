import { createPost, getFollowingPost } from '@/sanity/post';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response('Authentication Fail!', { status: 401 });
  }

  return getFollowingPost(user.username)
    .then((data) => NextResponse.json(data))
    .catch((err) => new Response(`Server Error: ${err}`, { status: 400 }));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Fail', { status: 401 });
  }

  const formData = await req.formData();
  const text = formData.get('text') as string;
  const file = formData.get('file') as Blob;

  if (!text || !file) {
    return new Response('Bad Request', { status: 400 });
  }

  return createPost(user.id, text, file)
    .then((data) => NextResponse.json(data))
    .catch((err) => new Response(`Server Error : ${err}`, { status: 400 }));
}
