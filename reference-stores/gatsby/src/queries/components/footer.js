import { useStaticQuery, graphql } from 'gatsby';

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

export default FooterQuery;
