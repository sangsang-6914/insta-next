import { useCacheKey } from '@/context/CacheKeyProvider';
import usePosts from '@/hooks/usePosts';
import { SimplePost } from '@/model/post';
import React from 'react';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import PostGridCard from './PostGridCard';

function PostGrid() {
  const { posts, isLoading, error } = usePosts();

  return (
    <section className="w-full text-center">
      {isLoading && <GridLoader color="red" />}
      <ul className="grid grid-cols-3 gap-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={index}>
              <PostGridCard post={post} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default PostGrid;
