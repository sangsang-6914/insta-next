import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

function HeartIcon({ className }: { className?: string }) {
  return <AiOutlineHeart className={`${className ? className : 'w-6 h-6'}`} />;
}

export default HeartIcon;
