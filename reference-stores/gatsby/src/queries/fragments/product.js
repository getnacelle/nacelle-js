const PRODUCT_QUERY_FRAGMENT = `
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
          layout: FULL_WIDTH
          transformOptions: {fit: COVER}
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
					gatsbyImageData(width: 800, placeholder: TRACED_SVG)
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

exports.PRODUCT_QUERY_FRAGMENT = PRODUCT_QUERY_FRAGMENT;
