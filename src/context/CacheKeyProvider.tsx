import { createContext, useContext } from 'react';

interface CacheKeyValue {
  postsKey: string;
}

export const CacheKeyContext = createContext<CacheKeyValue>({
  postsKey: '/api/posts',
});

export function useCacheKey() {
  return useContext(CacheKeyContext);
}
