const { useStaticQuery, graphql } = require('gatsby');

const HeaderQuery = () =>
  useStaticQuery(graphql`
    {
      content: nacelleContentRemoteComponentHeader(
        handle: { eq: "component-header" }
      ) {
        remoteFields {
          promoText
          navigation {
            ... on NacelleContentRemotePartNavigationLink {
              type
              remoteFields {
                text
                title
                url
              }
            }
            ... on NacelleContentRemotePartNavigationMega {
              type
              remoteFields {
                text
                navigationGroup1 {
                  remoteFields {
                    text
                    links {
                      remoteFields {
                        text
                        url
                      }
                    }
                  }
                }
                navigationGroup2 {
                  remoteFields {
                    text
                    links {
                      remoteFields {
                        text
                        url
                      }
                    }
                  }
                }
                navigationCallout1 {
                  remoteFields {
                    heading
                    image {
                      remoteFields {
                        file {
                          url
                        }
                      }
                    }
                    imageAlt
                    linkText
                    linkUrl
                  }
                }
                navigationCallout2 {
                  remoteFields {
                    heading
                    image {
                      remoteFields {
                        file {
                          url
                        }
                      }
                    }
                    imageAlt
                    linkText
                    linkUrl
                  }
                }
              }
            }
          }
          searchPlaceholder
          searchHeading
          searchAll
          searchEmpty
        }
      }
    }
  `);

module.exports = HeaderQuery;
