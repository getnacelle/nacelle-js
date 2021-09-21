/**
 * Util for getting selected variant from options
 * @param {Object} product Product to find variant from
 * @param {Array} options Options used to find selected variant
 * @returns {Object}
 */

export default ({ product, options }) => {
  if (product && options) {
    if (options.length === 0) {
      return product.variants[0];
    } else {
      return product.variants.find(variant => {
        return options.every(option => {
          return variant.selectedOptions.some(
            variantOption =>
              JSON.stringify(variantOption) === JSON.stringify(option)
          );
        });
      });
    }
  }
};
