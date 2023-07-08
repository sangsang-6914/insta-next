import { withSessionUser } from '@/util/session';
import { getPost } from '@/sanity/post';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async (user) => {
    return getPost(context.params.id)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(`Server Error : ${err}`, { status: 400 }));
  });
}
