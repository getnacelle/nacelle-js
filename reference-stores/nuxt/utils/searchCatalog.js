import Fuse from 'fuse.js';

export const searchCatalog = ({ catalog, query }) => {
  const options = {
    relevanceThreshold: 0.5,
    keys: ['content.title']
  };
  return new Fuse(catalog, options)
    .search(String(query))
    .filter((result) => typeof result.item !== 'undefined')
    .map((result) => result.item);
};
