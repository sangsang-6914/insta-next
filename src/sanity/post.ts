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
  return client.fetch(query).then(mapPosts);
}

export async function getPost(id: string) {
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

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `
    *[_type=='post' && author->username == '${username}'] | order(_createdAt desc)
      ${simpleGetData}
    
  `
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  const qr = `
    *[_type=='post' && "${username}" in likes[]->username] | order(_createdAt desc)[]
    ${simpleGetData}
  `;

  return client.fetch(qr).then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  const qr = `
  *[_type=='post' && _id in *[_type=='user' && username=="${username}"].bookmarks[]._ref] | order(_createdAt desc)[]${simpleGetData}`;
  return client.fetch(qr).then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post) => ({
    ...post,
    image: urlFor(post.photo),
  }));
}
