import { Comment, FullPost, SimplePost } from '@/model/post';
import { HomeUser } from '@/model/user';
import useSWR, { useSWRConfig } from 'swr';

function commentAdd(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({
      id,
      comment,
    }),
  }).then((res) => res.json());
}

function useFullPost(id: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/post/${id}`);

  const addComment = (comment: Comment) => {
    if (!post) return;
    const newPost = {
      ...post,
      comments: [...post.comments, comment],
    };

    mutate(commentAdd(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { post, isLoading, error, addComment };
}

export default useFullPost;
