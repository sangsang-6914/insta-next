'use client';

import usePosts from '@/hooks/usePosts';
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
  const { userImage, username, image, text, comments, id } = post;
  const [showModal, setShowModal] = useState(false);
  const { addComment } = usePosts();
  const handleComment = (comment: string) => {
    addComment(post, comment);
  };
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
      <ActionBar post={post}>
        <div className="flex gap-1 items-center">
          <p className="font-bold">{username}</p>
          <p>{text}</p>
        </div>
        <div>
          <p
            onClick={() => setShowModal(true)}
            className="text-sky-500 font-bold my-2 cursor-pointer"
          >{`View all ${comments} comments`}</p>
        </div>
      </ActionBar>
      <CommentForm onCommentForm={handleComment} />
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
