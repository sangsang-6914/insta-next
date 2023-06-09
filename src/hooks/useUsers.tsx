import { SimplePost } from '@/model/post';
import { HomeUser } from '@/model/user';
import React, { useCallback } from 'react';

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

function updateFollow(targetId: string, follow: boolean) {
  return fetch('/api/follow', {
    method: 'PUT',
    body: JSON.stringify({
      targetId,
      follow,
    }),
  }).then((res) => res.json());
}

function useUsers() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = useCallback(
    (post: SimplePost, bookmark: boolean) => {
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
    },
    [user, mutate]
  );

  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), {
        populateCache: true,
      });
    },
    [mutate]
  );

  return { user, isLoading, error, setBookmark, toggleFollow };
}

export default useUsers;
