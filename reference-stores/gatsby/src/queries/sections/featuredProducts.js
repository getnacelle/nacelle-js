const { PRODUCT_QUERY } = require('../products/product')

module.exports = `
... on NacelleContentRemoteSectionFeaturedProducts {
  type
  remoteFields {
    heading
    linkText
    linkUrl
    products {
      remoteFields {
        handle
      }
      remoteProduct {
        ${PRODUCT_QUERY}
      }
    }
  }
}
`;
