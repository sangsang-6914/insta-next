import { withSessionUser } from '@/util/session';
import { addBookmark, removeBookmark } from '@/sanity/user';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { postId, bookmark } = await req.json();

    if (!postId || bookmark === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(postId, user.id)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(`Server Error : ${err}`, { status: 400 }));
  });
}
