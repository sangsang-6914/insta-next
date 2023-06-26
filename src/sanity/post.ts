import { SimplePost } from '@/model/post';
import post from '../../sanity-studio/schemas/post';
import { client, urlFor } from './sanity';

const simpleGetData = `{
  ...,
  "id": _id,
  "createdAt": _createdAt,
  "userImage": author->image,
  "username": author->username,
  "comments": count(comments[]),
  "text": comments[0].comment,
  "likes": likes[]->username,
}`;

export async function getFollowingPost(username: string) {
  const query = `
  *[_type=='post' && author->username == "${username}"
  || author._ref in *[_type=='user' && username == "${username}"].following[]._ref]
    ${simpleGetData}
  `;
  return client.fetch(query).then((posts) =>
    posts.map((post: SimplePost) => ({
      ...post,
      image: urlFor(post.photo),
    }))
  );
}

export async function getPost(id: string) {
  console.log('getPost Param : ', id);
  const query = `
    *[_type=='post' && _id == "${id}"][0]{
      ...,
      comments[]{comment, "username": author->username, "image": author->image},
      "userImage": author->image,
      "username": author->username,
      "likes": likes[]->username,
      "id": _id,
      "createdAt": _createdAt,
      "image": photo
    }
  `;

  return client
    .fetch(query)
    .then((post) => ({ ...post, image: urlFor(post.photo) }));
}
