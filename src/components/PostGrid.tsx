import { SimplePost } from '@/model/post';
import React from 'react';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import PostGridCard from './PostGridCard';
interface Props {
  username: string;
  query: string;
}

function PostGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${query}/${username}`);
  console.log(posts);
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
