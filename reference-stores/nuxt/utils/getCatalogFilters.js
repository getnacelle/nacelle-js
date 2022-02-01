export const getCatalogFilters = ({ catalog }) => {
  return catalog.reduce((acc, item) => {
    const filterValue = item.productType;
    let filterIndex = acc.findIndex((filterItem) => {
      return filterItem.type === 'productType';
    });
    if (filterValue) {
      if (filterIndex < 0) {
        acc.push({
          type: 'productType',
          name: 'Product Type',
          values: [filterValue]
        });
      } else if (!acc[filterIndex].values.includes(filterValue)) {
        acc[filterIndex].values.push(filterValue);
      }
    }
    item.content.options.forEach((option) => {
      if (option.name !== 'Title') {
        filterIndex = acc.findIndex(
          (filterItem) =>
            filterItem.type === 'productOption' &&
            filterItem.name === option.name
        );
        if (filterIndex < 0) {
          acc.push({
            type: 'productOption',
            name: option.name,
            values: option.values
          });
        }
      }
    });
    return acc;
  }, []);
};
