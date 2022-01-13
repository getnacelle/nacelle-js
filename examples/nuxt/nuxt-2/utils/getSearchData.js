export const getSearchData = (results) => {
  return results?.map((result) => {
    const priceRange = {
      min: Number(result.variants[0].price),
      max: Number(result.variants[0].price)
    };
    result.variants.forEach((variant) => {
      const price = Number(variant.price);
      if (price < priceRange.min) priceRange.min = price;
      if (price > priceRange.max) priceRange.max = price;
    });

    return {
      ...result,
      priceRange
    };
  });
};
