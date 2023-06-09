import { Comment, SimplePost } from '@/model/post';
import { convertTimeago } from '@/util/time';
import React from 'react';
import BookmarkFillIcon from './icons/BookmarkFillIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import HeartFillIcon from './icons/HeartFillIcon';
import HeartIcon from './icons/HeartIcon';
import ToggleButton from './ui/ToggleButton';
import usePosts from '@/hooks/usePosts';

import useUsers from '@/hooks/useUsers';
import CommentForm from './CommentForm';
import { useCacheKey } from '@/context/CacheKeyProvider';

interface Props {
  post: SimplePost;
  children?: React.ReactNode;
  onAddComment: (comment: Comment) => void;
}

function ActionBar({ post, children, onAddComment }: Props) {
  const { id, likes, createdAt } = post;
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

  const handleComment = (comment: string) => {
    user &&
      onAddComment({ comment, username: user.username, image: user.image });
  };

  return (
    <>
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
      <CommentForm onCommentForm={handleComment} />
    </>
  );
}

export default ActionBar;
