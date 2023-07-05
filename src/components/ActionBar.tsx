import { SimplePost } from '@/model/post';
import { convertTimeago } from '@/util/time';
import React from 'react';
import BookmarkFillIcon from './icons/BookmarkFillIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import HeartFillIcon from './icons/HeartFillIcon';
import HeartIcon from './icons/HeartIcon';
import ToggleButton from './ui/ToggleButton';
import usePosts from '@/hooks/usePosts';

import useUsers from '@/hooks/useUsers';

interface Props {
  post: SimplePost;
  children?: React.ReactNode;
}

function ActionBar({ post, children }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { setLike } = usePosts();
  const { user, setBookmark } = useUsers();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLikedClick = (like: boolean) => {
    user && setLike(post, user.username, like);
  };
  const handleBookmarkedClick = (bookmark: boolean) => {
    setBookmark(post, bookmark);
  };
  return (
    <div className="p-4 flex flex-col gap-2 border-b border-gray-300">
      <div className="flex justify-between">
        <ToggleButton
          toggled={liked}
          icon={<HeartIcon />}
          fillIcon={<HeartFillIcon />}
          onToggle={handleLikedClick}
        />{' '}
        <ToggleButton
          toggled={bookmarked}
          icon={<BookmarkIcon />}
          fillIcon={<BookmarkFillIcon />}
          onToggle={handleBookmarkedClick}
        />
      </div>
      <p className="font-bold">
        {likes ? likes.length : 0}{' '}
        {likes && likes.length > 1 ? 'likes' : 'like'}
      </p>
      {children}
      <p className="text-neutral-500">{convertTimeago(createdAt)}</p>
    </div>
  );
}

export default ActionBar;
