'use client';

import { ProfileUser } from '@/model/user';
import React from 'react';
import Avatar from './Avatar';
import FollowButton from './FollowButton';

interface Props {
  user: ProfileUser;
}

function UserProfile({ user }: Props) {
  const { image, followers, following, posts, username, name } = user;
  const info = [
    {
      data: posts,
      title: 'posts',
    },
    { data: followers, title: 'followers' },
    { data: following, title: 'following' },
  ];

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300">
      <Avatar image={image || ''} highlight size="xlarge" />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="text-xl md:mr-6 md:mb-0">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="flex gap-3 my-4">
          {info.map(({ data, title }, index) => (
            <li key={index} className="flex gap-1">
              <p className="font-bold mr-1">{data}</p>
              <p>{title}</p>
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">{name}</p>
      </div>
    </section>
  );
}

export default UserProfile;
