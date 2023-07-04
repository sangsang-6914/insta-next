import { dislikePost, likePost } from '@/sanity/post';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PUT(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Fail', { status: 401 });
  }

  const { id, like } = await req.json();
  if (!id || like === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = like ? likePost : dislikePost;

  return request(id, user.id)
    .then((data) => NextResponse.json(data))
    .catch((err) => new Response(`Server Error: ${err}`, { status: 400 }));
}
