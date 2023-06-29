import { SearchUser } from '@/model/user';
import React from 'react';
import Avatar from './Avatar';

interface Props {
  user: SearchUser;
}

function UserCard({ user }: Props) {
  const { image, name, username, followers, following } = user;
  return (
    <section className="border border-gray-200 p-4 flex items-center">
      <Avatar size="large" image={image || ''} />
      <div className="flex flex-col ml-2 leading-5">
        <p className="font-bold">{name}</p>
        <p className="text-opacity-80">{username}</p>
        <p className="text-opacity-80">{`${followers} followers ${following} following`}</p>
      </div>
    </section>
  );
}

export default UserCard;
