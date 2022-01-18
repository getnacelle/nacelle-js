export const refineCatalog = ({ items, prices, types, options, tags }) => {
  const priceRange = prices && prices.split(',');
  const min = priceRange && Number(priceRange[0]);
  const max = priceRange && Number(priceRange[1]);
  return items.filter((item) => {
    let pricesMatch = true;
    let typesMatch = true;
    let optionsMatch = true;
    let tagsMatch = true;
    if (priceRange) {
      let aboveMin = true;
      let belowMax = true;
      if (min) aboveMin = item.priceRange.min > min;
      if (max) belowMax = item.priceRange.max < max;
      pricesMatch = aboveMin && belowMax;
    }
    if (types) {
      typesMatch = true;
    }
    if (options) {
      optionsMatch = true;
    }
    if (tags) {
      if (tags.length && item.tags?.length) {
        tagsMatch = item.tags.some((tag) => {
          return tags.includes(tag);
        });
      }
    }
    return pricesMatch && typesMatch && optionsMatch && tagsMatch;
  });
};
