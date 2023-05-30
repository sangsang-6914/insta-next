'use client';

import { AuthUser } from '@/model/user';
import React from 'react';
import Avatar from './Avatar';

interface Props {
  user: AuthUser;
}

function Sidebar({ user }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center">
        <Avatar size="medium" image={user.image || ''} />
        <div className="flex flex-col ml-5">
          <p className="font-bold">{user.username}</p>
          <p>{user.name}</p>
        </div>
      </div>
      <div>
        <p className="text-neutral-500">
          About ∙ Help ∙ Press ∙ API ∙ Jobs ∙ <br />
          Privacy ∙ Terms ∙ Location ∙ <br />
          Language
        </p>
      </div>
      <div>
        <p className="text-neutral-500 font-bold">
          @Copyright INSTANTGRAM <br /> from METAL
        </p>
      </div>
    </section>
  );
}

export default Sidebar;
