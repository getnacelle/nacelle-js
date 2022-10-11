const { useStaticQuery, graphql } = require('gatsby');

const FooterQuery = () =>
  useStaticQuery(graphql`
    {
      content: nacelleContentRemoteComponentFooter(
        handle: { eq: "component-footer" }
      ) {
        remoteFields {
          navigationGroups {
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
          copyright
          facebookUrl
          twitterUrl
          githubUrl
        }
      }
    }
  `);

module.exports = FooterQuery;
