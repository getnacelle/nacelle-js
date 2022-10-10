module.exports = `
... on NacelleContentRemoteSectionCtaStrip {
  type
  remoteFields {
    image {
      remoteFields {
        file {
          remoteImage {
            childImageSharp {
              gatsbyImageData(
                width: 1200
                quality: 80
                placeholder: TRACED_SVG
              )
            }
          }
        }
      }
    }
    imageAlt
    heading
    text
    linkText
    linkUrl
  }
}
`;
