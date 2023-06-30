import React from 'react';
import { BsBookmark } from 'react-icons/bs';

function BookmarkIcon({ className }: { className?: string }) {
  return <BsBookmark className={`${className ? className : 'w-6 h-6'}`} />;
}

export default BookmarkIcon;
