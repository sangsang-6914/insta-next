import UserPostList from '@/components/UserPostList';
import UserProfile from '@/components/UserProfile';
import { getUserProfile } from '@/sanity/user';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    username: string;
  };
}

async function UserPage({ params: { username } }: Props) {
  const user = await getUserProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPostList />
    </section>
  );
}

export default UserPage;
