import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(_req: NextRequest) {
  // 포스틍
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Fail', { status: 401 });
  }

  const request;

  // 현재사용자 정보
  return request
    .then((data) => NextResponse.json(data))
    .catch((err) => new Response(`Server Error: ${err}`, { status: 400 }));
}
