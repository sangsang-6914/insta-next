import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import Sidebar from '@/components/Sidebar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className="flex mt-5 w-full">
      <div className="flex flex-col basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <Sidebar user={user} />
      </div>
    </section>
  );
}
