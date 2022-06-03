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
    }
  }
}
`;
