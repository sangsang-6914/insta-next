import { FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import React from 'react';
import Avatar from './Avatar';
import useSWR from 'swr';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';

function PostDetail({ post }: { post: SimplePost }) {
  const { photo, userImage, image, id, username, likes, createdAt } = post;
  const { data } = useSWR<FullPost>(`/api/post/${id}`);
  const comments = data?.comments;
  console.log(comments);

  return (
    <section className="flex w-full h-full z-50">
      <div className="basis-3/5 relative">
        <Image src={image} alt="photo" fill sizes="650px" priority />
      </div>
      <div className="basis-2/5 flex flex-col">
        <PostUserAvatar userImage={userImage} username={username} />
        <ul className="p-4 h-full overflow-y-auto mb-1">
          {comments &&
            comments.map(
              ({ comment, username: commentUsername, image }, index) => (
                <li key={index} className="flex items-center mb-1">
                  <div>
                    <Avatar
                      image={image}
                      size="small"
                      highlight={commentUsername === username}
                    />
                  </div>
                  <div className="ml-2">
                    <span className="font-bold mr-1">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} />
        <CommentForm />
      </div>
    </section>
  );
}

export default PostDetail;
