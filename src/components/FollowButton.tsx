'use client';

import useUsers from '@/hooks/useUsers';
import { HomeUser, ProfileUser } from '@/model/user';
import React from 'react';
import useSWR from 'swr';
import Button from './ui/Button';

interface Props {
  user: ProfileUser;
}

function FollowButton({ user }: Props) {
  const { user: loggedInUser } = useUsers();
  const showButton = loggedInUser && loggedInUser.username !== user.username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === user.username);
  const text = following ? 'UnFollow' : 'Follow';
  return (
    <>
      {showButton && (
        <Button
          text={text}
          onClick={() => {}}
          color={text === 'UnFollow' ? 'red' : 'blue'}
        />
      )}
    </>
  );
}

export default FollowButton;
