module.exports = `
... on NacelleContentRemoteSectionTeamBios {
  type
  remoteFields {
    heading
    members {
      remoteFields {
        image {
          remoteFields {
            file {
              remoteImage {
                childImageSharp {
                  gatsbyImageData(
                    width: 600
                    quality: 80
                    placeholder: TRACED_SVG
                  )
                }
              }
            }
          }
        }
        imageAlt
        name
        role
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
  }
}
`;
