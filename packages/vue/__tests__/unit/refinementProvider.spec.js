import productsArray from 'mocks/products';

describe('Refinement Provider', () => {
  const filterData = (inputData, activeFilters) => {
    if (inputData && activeFilters) {
      const output = inputData.filter(item => {
        const filterChecks = activeFilters.map(filter => {
          if (
            filter.values.some(filterCheck => {
              const value = item.facets.find(facet => {
                return facet.value === filterCheck;
              });
              if (value) {
                return true;
              }
              return false;
            })
          ) {
            return true;
          }
          return false;
        });

        const itemShouldPass = filterChecks.every(filterCheck => {
          return filterCheck === true;
        });
        return itemShouldPass;
      });
      return output;
    } else {
      return inputData;
    }
  };

  const sortData = (inputData, activePriceRange, sortBy) => {
    const output = inputData.filter(({ minPrice }) => {
      if (activePriceRange) {
        const min = activePriceRange.range[0];
        const max = activePriceRange.range[1];
        if (min === 0) {
          return minPrice < max;
        } else if (max === 0) {
          return minPrice > min;
        } else {
          return minPrice > min && parseFloat(minPrice) < max;
        }
      } else {
        return true;
      }
    });

    switch (sortBy) {
      case 'price-desc':
        postMessage(
          output.sort((a, b) => {
            if (a.priceRange.min < b.priceRange.min) {
              return 1;
            }
            if (a.priceRange.min > b.priceRange.min) {
              return -1;
            }

            return 0;
          })
        );
        break;
      case 'price-asc':
        postMessage(
          output.sort((a, b) => {
            if (a.priceRange.min < b.priceRange.min) {
              return -1;
            }
            if (a.priceRange.min > b.priceRange.min) {
              return 1;
            }

            return 0;
          })
        );
        break;
      default:
        return output;
    }
  };

  const inputData = productsArray;
  const activeFilters = [{ property: 'color', values: ['blue'] }];
  const activePriceRange = { label: '< $50', range: [0, 50] };
  const sortBy = 'Sort By';

  it('Filters with property', () => {
    expect(filterData(inputData, activeFilters)).toStrictEqual([
      productsArray[0],
      productsArray[2]
    ]);
  });
  it('Sorts with property', () => {
    expect(sortData(inputData, activePriceRange, sortBy)).toStrictEqual([
      productsArray[1],
      productsArray[2]
    ]);
  });
});
