import Fuse from 'fuse.js';

export const searchCatalog = ({ items, settings, value }) => {
  return new Fuse(items, settings)
    .search(value)
    .filter((result) => typeof result.item !== 'undefined')
    .map((result) => result.item);
};
