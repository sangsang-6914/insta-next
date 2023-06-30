import { SimplePost } from '@/model/post';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import PostDetail from './PostDetail';
import ModalPortal from './ui/ModalPortal';
import PostModal from './ui/PostModal';

interface Props {
  post: SimplePost;
}

function PostGridCard({ post }: Props) {
  const { image, username } = post;
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const handlePostClick = () => {
    if (!user) {
      return signIn();
    }

    setShowModal(true);
  };
  return (
    <div className="relative w-full aspect-square cursor-pointer">
      <Image
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        className="object-cover"
        onClick={handlePostClick}
      />
      {showModal && (
        <ModalPortal>
          <PostModal onClose={() => setShowModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}

export default PostGridCard;
