import usePosts from '@/hooks/usePosts';
import { SimplePost } from '@/model/post';
import React, { FormEvent, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';

interface Props {
  onCommentForm: (comment: string) => void;
}

function CommentForm({ onCommentForm }: Props) {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length < 1;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCommentForm(comment);
    setComment('');
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-between">
      <div className="p-3">
        <BsEmojiSmile className="w-6 h-6" />
      </div>
      <input
        type="text"
        placeholder="Add a comment..."
        className="outline-none flex-1 p-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className="text-sky-500 font-bold p-2 disabled:text-sky-200"
      >
        Post
      </button>
    </form>
  );
}

export default CommentForm;
