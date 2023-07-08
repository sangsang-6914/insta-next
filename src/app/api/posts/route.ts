import { withSessionUser } from '@/util/session';
import { createPost, getFollowingPost } from '@/sanity/post';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(_: NextRequest) {
  return withSessionUser(async (user) => {
    return getFollowingPost(user.username)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(`Server Error: ${err}`, { status: 400 }));
  });
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const formData = await req.formData();
    const text = formData.get('text') as string;
    const file = formData.get('file') as Blob;

    if (!text || !file) {
      return new Response('Bad Request', { status: 400 });
    }

    return createPost(user.id, text, file)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(`Server Error : ${err}`, { status: 400 }));
  });
}
