import { SearchUser } from '@/model/user';
import { client } from './sanity';

export async function getSearchUser(keyword?: string) {
  const condition = keyword
    ? `&& username match "${keyword}" || name match "${keyword}"`
    : '';
  const qr = `
    *[_type == 'user' ${condition}][]{
      ...,
      "id": _id,
      "followers": count(followers),
      "following": count(following),
    }
  `;
  return client.fetch(qr).then((users) =>
    users.map((user: SearchUser) => ({
      ...user,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
    }))
  );
}
