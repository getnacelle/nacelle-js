module.exports = `
... on NacelleContentRemoteSectionHero {
  type
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
  linkText
  linkUrl
}
`;
