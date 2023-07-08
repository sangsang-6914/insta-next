import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

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

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  console.log(source);
  return builder.image(source).width(800).url();
}
// 'https://myProjectId.api.sanity.io/v2021-06-07/assets/images/myDataset'
export const imageUploadUrl = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${process.env.SANITY_DATASET}`;
