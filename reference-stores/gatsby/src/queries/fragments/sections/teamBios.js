module.exports = `
  heading
  members {
    remoteFields {
      image {
        remoteFields {
          file {
            url
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
`;
