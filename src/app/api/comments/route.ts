import { withSessionUser } from '@/util/session';
import { addComment } from '@/sanity/post';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment } = await req.json();

    return addComment(id, user.id, comment)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(`Server Error : ${err}`, { status: 400 }));
  });
}
