export const filterCatalog = ({ catalog, filters }) => {
  let results = [...catalog];
  const types = filters?.find((filter) => filter.type === 'productType');
  const options = filters?.find((filter) => filter.type === 'productOption');
  if (types) {
    results = catalog.filter((item) => item);
  }
  if (options) {
    results = catalog.filter((item) => item);
  }
  return results;
};
