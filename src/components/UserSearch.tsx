'use client';
import useDebounce from '@/hooks/useDebounce';
import { SearchUser } from '@/model/user';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import UserCard from './UserCard';

function UserSearch() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 1000);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedText}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  // nar, timo, debouncedValue Timing is now...
  // vscode return

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form onSubmit={onSubmit} className="w-full mb-4">
        <input
          type="text"
          autoFocus
          placeholder="Search username or name..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full text-xl p-3 outline-none border border-gray-400"
        />
      </form>
      {isLoading && <GridLoader color="red" className="mt-5" />}
      {!isLoading && !error && users?.length === 0 && (
        <p className="mt-5">Not Found User...</p>
      )}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default UserSearch;
