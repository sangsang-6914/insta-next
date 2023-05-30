'use client';

import { AuthUser, HomeUser } from '@/model/user';
import React from 'react';
import useSWR from 'swr';

function FollowingBar() {
  const { data, isLoading } = useSWR<HomeUser>('/api/me');
  console.log(data);
  const following = data?.following;
  return (
    <>
      {following &&
        following.map((user) => <div key={user.username}>{user.username}</div>)}
    </>
  );
}

export default FollowingBar;
