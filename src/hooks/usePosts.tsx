import { SimplePost } from '@/model/post';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      like,
    }),
    headers: {
      'Context-Type': 'application/json',
    },
  }).then((res) => res.json());
}

function commentAdd(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({
      id,
      comment,
    }),
  }).then((res) => res.json());
}

function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>('/api/posts');

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter((item) => item !== username),
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));
      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  const addComment = useCallback(
    (post: SimplePost, comment: string) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };

      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));
      mutate(commentAdd(post.id, comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, error, setLike, addComment };
}

export default usePosts;
