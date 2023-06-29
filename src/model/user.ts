export interface AuthUser {
  username: string;
  name: string;
  image?: string | undefined;
  email: string;
  id: string;
}

export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

export interface SearchUser extends AuthUser {
  following: number;
  followers: number;
}

export interface ProfileUser extends SearchUser {
  posts: number;
}

export interface HomeUser extends AuthUser {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
}
