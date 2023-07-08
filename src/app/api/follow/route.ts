import { withSessionUser } from '@/util/session';
import { follow, unfollow } from '@/sanity/user';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { targetId, follow: isFollow } = await req.json();

    if (!targetId || isFollow === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = isFollow ? follow : unfollow;

    return request(user.id, targetId)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(`Server Error: ${err}`, { status: 400 }));
  });
}
