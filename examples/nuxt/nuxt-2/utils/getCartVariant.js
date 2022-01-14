export const getCartVariant = ({ product, variant }) => {
  if (product && variant) {
    const productTitle = product.content.title;
    const {
      availableForSale,
      compareAtPrice,
      sourceEntryId,
      price,
      sku,
      productHandle
    } = variant;
    const { featuredMedia, selectedOptions, title } = variant.content;
    return {
      availableForSale,
      compareAtPrice,
      id: sourceEntryId,
      price,
      sku,
      productHandle,
      featuredMedia,
      selectedOptions,
      title,
      productTitle
    };
  }
};
