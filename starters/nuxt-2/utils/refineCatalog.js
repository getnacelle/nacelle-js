export const refineCatalog = ({ items, prices, filters }) => {
  const priceRange = prices && prices.split(',');
  const min = priceRange && Number(priceRange[0]);
  const max = priceRange && Number(priceRange[1]);
  return items.filter((item) => {
    let pricesMatch = true;
    let filtersMatch = true;
    if (priceRange) {
      let aboveMin = true;
      let belowMax = true;
      if (min) aboveMin = item.priceRange.min > min;
      if (max) belowMax = item.priceRange.max < max;
      pricesMatch = aboveMin && belowMax;
    }
    if (filters) {
      filtersMatch = true;
    }
    return pricesMatch && filtersMatch;
  });
};
