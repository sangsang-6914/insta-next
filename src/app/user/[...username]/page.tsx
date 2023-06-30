import UserPostList from '@/components/UserPostList';
import UserProfile from '@/components/UserProfile';
import { getUserProfile } from '@/sanity/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

interface Props {
  params: {
    username: string;
  };
}

const getUser = cache(async (username: string) => getUserProfile(username));

async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPostList user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) , Instantgram Photos`,
    description: `${user.name}'s all Instantgram posts`,
  };
}

export default UserPage;
