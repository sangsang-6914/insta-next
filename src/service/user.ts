import { client } from '@/sanity/sanity';

export async function getUserByUsername(username: string) {
  const query = `
    *[_type=='user' && username == "${username}"][0]{..., "id": _id, username, name, email, following[]->{username,image}, "bookmarks": bookmarks[]->_id}
  `;

  return client.fetch(query).then((user) => ({
    ...user,
    bookmarks: user.bookmarks ?? [],
  }));
}
