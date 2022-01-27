export const getSelectedVariant = ({ product, options }) => {
  if (product && options) {
    if (options.length === 0) return product.variants[0];
    else {
      return product.variants.find((variant) => {
        return options.every((option) => {
          return variant.content.selectedOptions.some((variantOption) => {
            return (
              option.value === variantOption.value &&
              option.name === variantOption.name
            );
          });
        });
      });
    }
  }
};
