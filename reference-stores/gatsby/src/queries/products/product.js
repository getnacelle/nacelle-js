const PRODUCT_QUERY = `
nacelleEntryId
sourceEntryId
availableForSale
productType
content{
  handle
  title
  description
  options{
    name
    values
  }
  featuredMedia{
    remoteImage {
      childImageSharp {
        gatsbyImageData(
          width: 800
          quality: 80
          placeholder: TRACED_SVG
        )
      }
    }
    thumbnailSrc
    altText
  }
  media{
    type
    remoteImage {
      childImageSharp {
        gatsbyImageData(
          width: 800 
          quality: 80
          placeholder: TRACED_SVG
        )
      }
    }
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
      remoteImage {
        childImageSharp {
          gatsbyImageData(
            width: 800 
            quality: 80
            placeholder: TRACED_SVG
          )
        }
      }
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

exports.PRODUCT_QUERY = PRODUCT_QUERY;
