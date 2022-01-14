import Fuse from 'fuse.js';

export const searchCatalog = ({ items, options, value }) => {
  return new Fuse(items, options)
    .search(value)
    .filter((result) => typeof result.item !== 'undefined')
    .map((result) => result.item);
};
