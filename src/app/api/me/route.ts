import { getUserByUsername } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response('Authentication Fail', { status: 401 });
  }

  return getUserByUsername(user.username)
    .then((data) => NextResponse.json(data))
    .catch((err) => new Response(`Error Message : ${err}`, { status: 400 }));
}
