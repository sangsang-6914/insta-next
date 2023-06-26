import { SimplePost } from '@/model/post';
import { convertTimeago } from '@/util/time';
import React, { useState } from 'react';
import BookmarkFillIcon from './icons/BookmarkFillIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import HeartFillIcon from './icons/HeartFillIcon';
import HeartIcon from './icons/HeartIcon';
import ToggleButton from './ui/ToggleButton';

interface Props {
  likes: string[];
  username: string;
  text?: string;
  createdAt: string;
}

function ActionBar({ likes, username, text, createdAt }: Props) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <div className="p-4 flex flex-col gap-2 border-b border-gray-300">
      <div className="flex justify-between">
        <ToggleButton
          toggled={liked}
          icon={<HeartIcon />}
          fillIcon={<HeartFillIcon />}
          onToggle={() => setLiked((prev) => !prev)}
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
