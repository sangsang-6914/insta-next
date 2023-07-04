import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest, res: NextResponse) {
  console.log('POST api request...');
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Fail', { status: 401 });
  }

  const { body } = req;
  console.log(body);
}
