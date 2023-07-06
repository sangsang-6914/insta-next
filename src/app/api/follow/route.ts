import { follow, unfollow } from '@/sanity/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Fail', { status: 401 });
  }

  const { targetId, follow: isFollow } = await req.json();

  if (!targetId || isFollow === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = isFollow ? follow : unfollow;

  return request(user.id, targetId)
    .then((data) => NextResponse.json(data))
    .catch((err) => new Response(`Server Error: ${err}`, { status: 400 }));
}
