export const filterCatalog = ({ catalog, types, options }) => {
  let results = [...catalog];
  if (types) {
    results = catalog.filter((item) => item);
  }
  if (options) {
    results = catalog.filter((item) => item);
  }
  return results;
};
