'use client';

import usePosts from '@/hooks/usePosts';
import React from 'react';
import { GridLoader } from 'react-spinners';
import PostListCard from './PostListCard';

function PostList() {
  const { posts, isLoading } = usePosts();

  return (
    <section className="w-full">
      {isLoading && (
        <div className="text-center">
          <GridLoader color="red" />
        </div>
      )}
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
