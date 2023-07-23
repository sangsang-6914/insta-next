'use client';

import useUsers from '@/hooks/useUsers';
import { ProfileUser } from '@/model/user';
import { useRouter } from 'next/navigation';

import React, { useState, useTransition } from 'react';
import { PulseLoader } from 'react-spinners';

import Button from './ui/Button';

interface Props {
  user: ProfileUser;
}

function FollowButton({ user }: Props) {
  const { user: loggedInUser, toggleFollow } = useUsers();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;
  const showButton = loggedInUser && loggedInUser.username !== user.username;
  const following =
    loggedInUser &&
    loggedInUser?.following?.find((item) => item.username === user.username);
  const text = following ? 'UnFollow' : 'Follow';
  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <div className="relative">
        {isUpdating && (
          <div className="absolute inset-0 flex justify-center items-center z-20">
            <PulseLoader size={6} />
          </div>
        )}
        {showButton && (
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            color={text === 'UnFollow' ? 'red' : 'blue'}
          />
        )}
      </div>
    </>
  );
}

export default FollowButton;
