export const getCartVariant = ({ product, variant }) => {
  if (product && variant) {
    const {
      handle: productHandle,
      title: productTitle,
      featuredMedia: productFeaturedMedia
    } = product.content || {};
    const {
      availableForSale,
      compareAtPrice,
      nacelleEntryId,
      sourceEntryId,
      price,
      sku
    } = variant;
    const {
      featuredMedia,
      selectedOptions,
      title: variantTitle
    } = variant.content || {};
    return {
      availableForSale,
      compareAtPrice,
      variantId: sourceEntryId,
      variantTitle,
      variantNacelleEntryId: nacelleEntryId,
      price,
      sku,
      featuredMedia: featuredMedia || productFeaturedMedia,
      selectedOptions,
      productHandle,
      productTitle
    };
  }
};
