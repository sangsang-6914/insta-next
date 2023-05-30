export interface AuthUser {
  username: string;
  name: string;
  image?: string | undefined;
  email: string;
  id: string;
}

type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

export interface HomeUser extends AuthUser {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
}
