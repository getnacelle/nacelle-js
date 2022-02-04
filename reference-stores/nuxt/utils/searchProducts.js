import Fuse from 'fuse.js';

export const searchProducts = ({ products, query }) => {
  const options = {
    relevanceThreshold: 0.5,
    keys: ['content.title']
  };
  return new Fuse(products, options)
    .search(String(query))
    .filter((result) => typeof result.item !== 'undefined')
    .map((result) => result.item);
};
