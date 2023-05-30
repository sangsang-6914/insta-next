import { createClient } from '@sanity/client';

interface User {
  username: string;
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'ab82urt0',
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-05-30',
  useCdn: false,
  token: process.env.SANITY_SECRET_TOKEN,
});

export async function createUser(user: User) {
  const data = client.createIfNotExists({
    ...user,
    _id: user.id,
    _type: 'user',
    following: [],
    followers: [],
    bookmarks: [],
  });
  return data;
}
