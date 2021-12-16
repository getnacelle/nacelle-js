/**
 * @typedef {Object} PriceRange
 * @property {[number, number]} range - The numerical bounds of the price range
 * @property {string} [label] - The label associated with the price range
 */

/**
 * @typedef {Object} Product - A Nacelle product
 */

/**
 * Filters product data based on active filters
 * @param {{inputData: Product[], activePriceRange: PriceRange, sortBy: 'price-desc'|'price-asc'}} params
 * @returns {Product[]} Filtered products
 */
export default function sortProducts({ inputData, activePriceRange, sortBy }) {
  const output = inputData.filter(({ minPrice }) => {
    if (
      !activePriceRange ||
      !activePriceRange.range ||
      !Array.isArray(activePriceRange.range)
    ) {
      return true;
    }

    const min = activePriceRange.range[0];
    const max = activePriceRange.range[1];

    if (min === 0) {
      return minPrice < max;
    } else if (max === 0) {
      return minPrice > min;
    } else {
      return minPrice > min && parseFloat(minPrice) < max;
    }
  });

  switch (sortBy) {
    case 'price-desc':
      return output.sort((a, b) => {
        if (a.priceRange.min < b.priceRange.min) {
          return 1;
        }
        if (a.priceRange.min > b.priceRange.min) {
          return -1;
        }

        return 0;
      });

    case 'price-asc':
      return output.sort((a, b) => {
        if (a.priceRange.min < b.priceRange.min) {
          return -1;
        }
        if (a.priceRange.min > b.priceRange.min) {
          return 1;
        }

        return 0;
      });

    default:
      return output;
  }
}
