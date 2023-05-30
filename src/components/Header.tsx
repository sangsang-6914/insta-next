'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Avatar from './Avatar';
import HomeFillIcon from './icons/HomeFillIcon';
import HomeIcon from './icons/HomeIcon';
import NewFillIcon from './icons/NewFillIcon';
import NewIcon from './icons/NewIcon';
import SearchFillIcon from './icons/SearchFillIcon';
import SearchIcon from './icons/SearchIcon';
import Button from './ui/Button';
import ColorButton from './ui/ColorButton';

const NAV_ITEMS = [
  {
    icon: <HomeIcon />,
    fillIcon: <HomeFillIcon />,
    path: '/',
  },
  {
    icon: <SearchIcon />,
    fillIcon: <SearchFillIcon />,
    path: '/search',
  },
  {
    icon: <NewIcon />,
    fillIcon: <NewFillIcon />,
    path: '/new',
  },
];

function Header() {
  const pathname = usePathname();
  const { data } = useSession();
  const user = data?.user;

  const signin = () => {
    signIn();
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-300">
      <Link href="/" className="text-3xl font-bold">
        Instantgram
      </Link>
      <ul className="flex items-center gap-4">
        {NAV_ITEMS.map((item, index) => (
          <Link href={item.path} key={index}>
            {pathname === item.path ? item.fillIcon : item.icon}
          </Link>
        ))}
        {user && (
          <Link href={`/user/${user.username}`}>
            <Avatar image={user.image || ''} />
          </Link>
        )}
        {user ? (
          <ColorButton text={'Logout'} onClick={signOut} />
        ) : (
          <ColorButton text={'Sign in'} onClick={signIn} />
        )}
      </ul>
    </header>
  );
}

export default Header;
