export const getSearchData = ({ catalog }) => {
  return catalog?.map((item) => {
    const priceRange = {
      min: Number(item.variants[0].price),
      max: Number(item.variants[0].price)
    };
    item.variants.forEach((variant) => {
      const price = Number(variant.price);
      if (price < priceRange.min) priceRange.min = price;
      if (price > priceRange.max) priceRange.max = price;
    });

    return {
      ...item,
      priceRange
    };
  });
};
