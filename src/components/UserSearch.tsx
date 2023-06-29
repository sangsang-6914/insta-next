'use client';
import { SearchUser } from '@/model/user';
import Link from 'next/link';
import React, { useState } from 'react';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import UserCard from './UserCard';

function UserSearch() {
  // 전체 사용자 리스트 가져옴
  // text 변경 시 리스트 변경
  const [text, setText] = useState('');
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/user/${text}`);

  return (
    <section className="flex flex-col p-4 w-full items-center">
      <input
        type="text"
        placeholder="Search username or name..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-4/5 p-3 text-xl border border-gray-300 outline-none"
      />
      {isLoading && <GridLoader color="red" className="mt-5" />}
      <ul className="flex flex-col gap-3 w-full items-center mt-5">
        {users &&
          users.map((user) => (
            <Link
              key={user.id}
              href={`/user/${user.username}`}
              className="w-3/5"
            >
              <li>
                <UserCard user={user} />
              </li>
            </Link>
          ))}
      </ul>
    </section>
  );
}

export default UserSearch;
