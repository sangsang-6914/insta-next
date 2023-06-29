import { SearchUser } from '@/model/user';
import Link from 'next/link';
import React from 'react';
import Avatar from './Avatar';

interface Props {
  user: SearchUser;
}

function UserCard({ user }: Props) {
  const { image, name, username, followers, following } = user;
  return (
    <Link
      href={`/user/${username}`}
      className="border border-netural-300 mb-2 p-4 flex items-center w-full rounded-sm bg-white hover:bg-neutral-50"
    >
      <Avatar size="large" image={image || ''} />
      <div className="text-netural-500 ml-2">
        <p className="text-black font-bold leading-4">{name}</p>
        <p>{username}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}

export default UserCard;
