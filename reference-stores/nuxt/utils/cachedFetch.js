import LRU from 'lru-cache';
import { delay } from '~/utils/delay';

const cache = new LRU({ max: 50, max_age: 3000000 });
let fetchCount = 0;

export const cachedFetch = async ({ key, fetcher }) => {
  fetchCount += 1;
  let data = null;
  if (!data && fetchCount > 1) {
    await delay({ duration: 5000 });
    data = await cache.get(key);
  }
  if (!data) data = await fetcher();
  if (data) await cache.set(key, data);
  return {
    data
  };
};
