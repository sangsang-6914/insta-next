import { SimplePost } from '@/model/post';
import { HomeUser } from '@/model/user';
import React from 'react';

import useSWR from 'swr';

function updateBookmark(postId: string, bookmark: boolean) {
  return fetch('/api/bookmark', {
    method: 'PUT',
    body: JSON.stringify({
      postId,
      bookmark,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}

function useUsers() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = (post: SimplePost, bookmark: boolean) => {
    const newUser = user && {
      ...user,
      bookmarks: bookmark
        ? [...user.bookmarks, post.id]
        : user.bookmarks.filter((item) => item !== post.id),
    };

    return mutate(updateBookmark(post.id, bookmark), {
      optimisticData: newUser,
      rollbackOnError: true,
      revalidate: false,
      populateCache: false,
    });
  };

  return { user, isLoading, error, setBookmark };
}

export default useUsers;
