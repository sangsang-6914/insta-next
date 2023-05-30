'use client';

import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import React from 'react';
import ColorButton from './ui/ColorButton';

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  callbackUrl: string;
}

function CustomSignIn({ providers, callbackUrl }: Props) {
  return (
    <section className="flex justify-center mt-[30%]">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <ColorButton
              size="big"
              onClick={() => signIn(provider.id, { callbackUrl })}
              text={`Sign in with ${provider.name}`}
            />
          </div>
        ))}
    </section>
  );
}

export default CustomSignIn;
