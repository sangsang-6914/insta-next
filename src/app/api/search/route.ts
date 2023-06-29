import { getSearchUser } from '@/sanity/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  return getSearchUser()
    .then((data) => NextResponse.json(data))
    .catch((err) => new Response(`Server Error : ${err}`, { status: 400 }));
}
