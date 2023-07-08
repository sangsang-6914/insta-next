import { withSessionUser } from '@/util/session';
import { dislikePost, likePost } from '@/sanity/post';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, res: NextResponse) {
  return withSessionUser(async (user) => {
    const { id, like } = await req.json();
    if (!id || like === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = like ? likePost : dislikePost;

    return request(id, user.id)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(`Server Error: ${err}`, { status: 400 }));
  });
}
