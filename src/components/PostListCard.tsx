'use client';

import { SimplePost } from '@/model/post';
import { convertTimeago } from '@/util/time';
import Image from 'next/image';
import React, { useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import ActionBar from './ActionBar';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import BookmarkFillIcon from './icons/BookmarkFillIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import HeartFillIcon from './icons/HeartFillIcon';
import HeartIcon from './icons/HeartIcon';
import PostDetail from './PostDetail';
import PostUserAvatar from './PostUserAvatar';
import ModalPortal from './ui/ModalPortal';
import PostModal from './ui/PostModal';
import ToggleButton from './ui/ToggleButton';

interface Props {
  post: SimplePost;
}

function PostListCard({ post }: Props) {
  const { userImage, username, image, likes, createdAt, text } = post;
  const [showModal, setShowModal] = useState(false);
  return (
    <section className="border border-gray-200 rounded-lg shadow-sm shadow-neutral-300">
      <PostUserAvatar userImage={userImage} username={username} />
      <div>
        <Image
          src={image}
          alt=""
          width={500}
          height={500}
          className="w-full object-cover aspect-square cursor-pointer"
          onClick={() => setShowModal((prev) => !prev)}
        />
      </div>
      <ActionBar
        likes={likes}
        createdAt={createdAt}
        text={text}
        username={username}
      />
      <CommentForm />
      {showModal && (
        <ModalPortal>
          <PostModal onClose={() => setShowModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </section>
  );
}

export default PostListCard;
