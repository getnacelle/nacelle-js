export const getCartVariant = ({ product, variant }) => {
  if (product && variant) {
    const {
      handle: productHandle,
      title: productTitle,
      featuredMedia: productFeaturedMedia
    } = product.content;
    const { availableForSale, compareAtPrice, sourceEntryId, price, sku } =
      variant;
    const { featuredMedia, selectedOptions, title } = variant.content;
    return {
      availableForSale,
      compareAtPrice,
      id: sourceEntryId,
      price,
      sku,
      featuredMedia: featuredMedia || productFeaturedMedia,
      selectedOptions,
      title,
      productHandle,
      productTitle
    };
  }
};
