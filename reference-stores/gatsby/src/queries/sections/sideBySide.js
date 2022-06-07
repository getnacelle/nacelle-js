module.exports = `
... on NacelleContentRemoteSectionSideBySide {
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
    heading
    text {
      nodeType
      content {
        nodeType
        content {
          nodeType
          value
        }
      }
    }
  }
}
`;
