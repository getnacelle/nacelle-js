export const sortCatalog = ({ items, value }) => {
  return items.sort((a, b) => {
    if (value === 'price-asc' || value === 'price-desc') {
      const priceA = a.priceRange.min;
      const priceB = b.priceRange.min;
      if (priceA < priceB) return value === 'price-asc' ? -1 : 1;
      if (priceA > priceB) return value === 'price-asc' ? 1 : -1;
      return 0;
    }
    return 0;
  });
};
