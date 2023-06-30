'use client';

import { ProfileUser } from '@/model/user';
import React, { useState } from 'react';
import BookmarkIcon from './icons/BookmarkIcon';
import HeartIcon from './icons/HeartIcon';
import PostsIcon from './icons/PostsIcon';
import PostGrid from './PostGrid';

interface Props {
  user: ProfileUser;
}

const tabs = [
  { type: 'posts', icon: <PostsIcon /> },
  { type: 'saved', icon: <BookmarkIcon className="w-3 h-3" /> },
  { type: 'liked', icon: <HeartIcon className="w-3 h-3" /> },
];

function UserPostList({ user }: Props) {
  const { username } = user;
  const [query, setQuery] = useState(tabs[0].type);
  return (
    <section>
      <ul className="flex justify-center uppercase">
        {tabs.map(({ type, icon }, index) => (
          <li
            key={index}
            onClick={() => setQuery(type)}
            className={`${
              type === query ? 'border-t border-black font-bold' : ''
            } cursor-pointer p-4 mx-12`}
          >
            <button className="scale-150 md:scale-100">{icon}</button>
            <span className="hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid query={query} username={username} />
    </section>
  );
}

export default UserPostList;
