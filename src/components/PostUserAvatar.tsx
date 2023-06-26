import React from 'react';
import Avatar from './Avatar';

interface Props {
  userImage: string;
  username: string;
}

function PostUserAvatar({ userImage, username }: Props) {
  return (
    <div className="flex items-center gap-2 p-3 border-b border-gray-200">
      <Avatar image={userImage} highlight size="medium" />
      <p className="font-bold text-sm">{username}</p>
    </div>
  );
}

export default PostUserAvatar;
