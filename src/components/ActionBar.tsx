import { SimplePost } from '@/model/post';
import { convertTimeago } from '@/util/time';
import React, { useState } from 'react';
import BookmarkFillIcon from './icons/BookmarkFillIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import HeartFillIcon from './icons/HeartFillIcon';
import HeartIcon from './icons/HeartIcon';
import ToggleButton from './ui/ToggleButton';
import { useSession } from 'next-auth/react';
import usePosts from '@/hooks/usePosts';

interface Props {
  post: SimplePost;
}

function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const { setLike } = usePosts();
  const user = session?.user;
  const like = likes.includes(user.username);
  const [bookmarked, setBookmarked] = useState(false);
  const handleLikedClick = (like: boolean) => {
    setLike(post, user.username, like);
  };
  return (
    <div className="p-4 flex flex-col gap-2 border-b border-gray-300">
      <div className="flex justify-between">
        <ToggleButton
          toggled={like}
          icon={<HeartIcon />}
          fillIcon={<HeartFillIcon />}
          onToggle={handleLikedClick}
        />{' '}
        <ToggleButton
          toggled={bookmarked}
          icon={<BookmarkIcon />}
          fillIcon={<BookmarkFillIcon />}
          onToggle={() => setBookmarked((prev) => !prev)}
        />
      </div>
      <p className="font-bold">
        {likes ? likes.length : 0}{' '}
        {likes && likes.length > 1 ? 'likes' : 'like'}
      </p>
      {text && (
        <div className="flex gap-1 items-center">
          <p className="font-bold">{username}</p>
          <p>{text}</p>
        </div>
      )}
      <p className="text-neutral-500">{convertTimeago(createdAt)}</p>
    </div>
  );
}

export default ActionBar;
