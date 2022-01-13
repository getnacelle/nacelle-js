export const getCartVariant = (variant) => {
  if (variant) {
    const {
      availableForSale,
      compareAtPrice,
      nacelleEntryId,
      price,
      sku,
      productHandle
    } = variant;
    const { featuredMedia, selectedOptions, title } = variant.content;
    return {
      availableForSale,
      compareAtPrice,
      nacelleEntryId,
      price,
      sku,
      productHandle,
      featuredMedia,
      selectedOptions,
      title
    };
  }
};
