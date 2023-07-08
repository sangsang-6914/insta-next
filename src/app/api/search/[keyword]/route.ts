import { getSearchUser } from '@/sanity/user';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: {
    keyword: string;
  };
}

export async function GET(_: NextRequest, context: Context) {
  const keyword = context.params.keyword;

  return getSearchUser(keyword)
    .then((data) => NextResponse.json(data))
    .catch((err) => new Response(`Server Error : ${err}`, { status: 400 }));
}
