'use client';

import React from 'react';
import { SWRConfig } from 'swr';

interface Props {
  children: React.ReactNode;
}

function SWRConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default SWRConfigContext;
