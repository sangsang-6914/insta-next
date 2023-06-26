import React from 'react';
import { BsEmojiSmile } from 'react-icons/bs';

function CommentForm() {
  return (
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
  );
}

export default CommentForm;
