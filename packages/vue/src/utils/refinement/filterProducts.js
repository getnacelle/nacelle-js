/**
 * @typedef {Object} Filter
 * @property {string} field - The name of the filter
 * @property {string} label - The filter's value
 */

/**
 * @typedef {Object} Facet - A search facet
 * @property {string} name - Facet name
 * @property {string} value - Facet value
 */

/**
 * @typedef {Object} Product - A Nacelle product with facets
 * @property {Facet[]} facets - Facets used for search & filtering
 */

/**
 * Filters product data based on active filters
 * @param {{inputData: Product[], activeFilters: Filter[]}} params
 * @returns {Product[]} Filtered products
 */
export default function filterProducts({ inputData, activeFilters }) {
  if (
    !Array.isArray(inputData) ||
    !Array.isArray(activeFilters) ||
    !inputData.length ||
    !activeFilters.length
  ) {
    return inputData;
  }

  return inputData.filter((item) => {
    const filterChecks = activeFilters.map((filter) => {
      if (
        filter.values.some((filterCheck) => {
          return Boolean(
            item.facets.find((facet) => facet.value === filterCheck)
          );
        })
      ) {
        return true;
      }

      return false;
    });

    const itemShouldPass = filterChecks.every(
      (filterCheck) => filterCheck === true
    );

    return itemShouldPass;
  });
}
