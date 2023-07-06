import { ProfileUser, SearchUser } from '@/model/user';
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
      "bookmarks": bookmarks[]->_id
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

export async function getUserProfile(username: string) {
  const qr = `
    *[_type == 'user' && username == "${username}"][0]{
      ...,
      "id": _id,
      "createdAt": _createdAt,
      "followers": count(followers),
      "following": count(following),
      "posts": count(*[_type=='post' && author->username == "${username}"])
    }
  `;

  return client.fetch(qr).then((user: ProfileUser) => ({
    ...user,
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    posts: user.posts ?? 0,
  }));
}

export async function addBookmark(postId: string, userId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(postId: string, userId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) =>
      user.setIfMissing({ following: [] }).append('following', [
        {
          _ref: targetId,
          _type: 'reference',
        },
      ])
    )
    .patch(targetId, (user) =>
      user.setIfMissing({ followers: [] }).append('followers', [
        {
          _ref: myId,
          _type: 'reference',
        },
      ])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit();
}
