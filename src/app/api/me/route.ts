import { getUserByUsername } from '@/service/user';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  return withSessionUser(async (user) =>
    getUserByUsername(user.username)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(`Error Message : ${err}`, { status: 400 }))
  );
}
