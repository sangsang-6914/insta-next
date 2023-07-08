'use client';

import { HomeUser } from '@/model/user';
import React from 'react';
import ScrollableBar from './ScrollableBar';
import Avatar from './Avatar';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import useUsers from '@/hooks/useUsers';

function FollowingBar() {
  const { user, isLoading } = useUsers();
  const following = user?.following;
  return (
    <section className="border border-neutral-50 shadow-sm min-h-[130px] flex items-center justify-center shadow-neutral-300 mb-4 rounded-lg p-4 w-full overflow-x-auto relative z-0">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!following || following.length === 0) && (
          <p>{`You don't have Following`}</p>
        )
      )}
      {following && following.length > 0 && (
        <ScrollableBar>
          {following.map(({ username, image }) => (
            <Link
              key={username}
              href={`/user/${username}`}
              className="flex flex-col items-center w-20"
            >
              <Avatar image={image || ''} size="large" highlight />
              <p className="text-sm overflow-hidden text-ellipsis w-full text-center">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}

export default FollowingBar;
