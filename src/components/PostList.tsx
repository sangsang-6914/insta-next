'use client';

import { SimplePost } from '@/model/post';
import React from 'react';
import useSWR from 'swr';
import PostListCard from './PostListCard';

function PostList() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>('/api/post');

  return (
    <section>
      <ul className="flex flex-col gap-4">
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <PostListCard post={post} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default PostList;
