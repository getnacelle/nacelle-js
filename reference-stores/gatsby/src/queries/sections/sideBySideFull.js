module.exports = `
... on NacelleContentRemoteSectionSideBySideFull {
  type
  remoteFields {
    image {
      remoteFields {
        file {
          remoteImage {
            childImageSharp {
              gatsbyImageData(
                width: 800
                quality: 80
                placeholder: TRACED_SVG
              )
            }
          }
        }
      }
    }
    imageAlt
    imageSide
    heading
    subheading
    text
    linkText
    linkUrl
  }
}
`;
