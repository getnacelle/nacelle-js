const PRODUCT_QUERY_FRAGMENT = `
nacelleEntryId
sourceEntryId
availableForSale
productType
content{
  handle
  title
  options{
    name
    values
  }
  featuredMedia{
    src
    thumbnailSrc
    altText
  }
}
variants{
  nacelleEntryId
  sourceEntryId
  availableForSale
  price
  compareAtPrice
  content{
    title
    locale
    featuredMedia{
      src
      thumbnailSrc
      altText
    }
    selectedOptions {
      name
      value
    }
  }
}
`;

exports.PRODUCT_QUERY_FRAGMENT = PRODUCT_QUERY_FRAGMENT;
