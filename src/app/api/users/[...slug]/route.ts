import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from '@/sanity/post';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: {
    slug: string[];
  };
}

export async function GET(_: NextRequest, context: Context) {
  const slug = context.params.slug;
  if (!slug || !Array.isArray(slug) || slug.length > 2) {
    return new Response('Bad Request', { status: 400 });
  }

  const [query, username] = slug;

  let request = getPostsOf;
  if (query === 'liked') {
    request = getLikedPostsOf;
  } else if (query === 'saved') {
    request = getSavedPostsOf;
  }

  return request(username)
    .then((data) => NextResponse.json(data))
    .catch((err) => new Response(`Server Error : ${err}`, { status: 400 }));
}
