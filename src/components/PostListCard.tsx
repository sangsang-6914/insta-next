'use client';

import { SimplePost } from '@/model/post';
import { convertTimeago } from '@/util/time';
import Image from 'next/image';
import React, { useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import Avatar from './Avatar';
import BookmarkFillIcon from './icons/BookmarkFillIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import HeartFillIcon from './icons/HeartFillIcon';
import HeartIcon from './icons/HeartIcon';
import ToggleButton from './ui/ToggleButton';

interface Props {
  post: SimplePost;
}

function PostListCard({ post }: Props) {
  const { userImage, username, image } = post;
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <section className="border border-gray-200 rounded-lg shadow-sm shadow-neutral-300">
      <div className="flex items-center gap-2 p-3 border-b border-gray-200">
        <Avatar image={userImage} highlight size="medium" />
        <p className="font-bold text-sm">{username}</p>
      </div>
      <div>
        <Image
          src={image}
          alt=""
          width={500}
          height={500}
          className="w-full object-cover aspect-square cursor-pointer"
        />
      </div>
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
          {post.likes ? post.likes.length : 0}{' '}
          {post.likes && post.likes.length > 1 ? 'likes' : 'like'}
        </p>
        <div className="flex gap-1 items-center">
          <p className="font-bold">{post.username}</p>
          <p>{post.text}</p>
        </div>
        <p className="text-neutral-500">{convertTimeago(post.createdAt)}</p>
      </div>
      <form className="flex justify-between">
        <div className="p-3">
          <BsEmojiSmile className="w-6 h-6" />
        </div>
        <input
          type="text"
          placeholder="Add a comment..."
          className="outline-none flex-1 p-2"
        />
        <button className="text-sky-500 font-bold p-2">Post</button>
      </form>
    </section>
  );
}

export default PostListCard;
