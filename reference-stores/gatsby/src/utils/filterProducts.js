export const filterProducts = ({ products, filters }) => {
  let results = [...products];
  const types = filters?.filter((filter) => filter.type === 'productType');
  const options = filters?.filter((filter) => filter.type === 'productOption');
  if (types.length) {
    results = products.filter(({ productType }) =>
      types.some(({ value }) => {
        return value === productType;
      })
    );
  }
  if (options.length) {
    results = products.filter((product) =>
      product.variants.some((variant) =>
        variant.content.selectedOptions.some((selectedOption) =>
          options.some(
            ({ name, value }) =>
              selectedOption.name === name && selectedOption.value === value
          )
        )
      )
    );
  }
  return results;
};
