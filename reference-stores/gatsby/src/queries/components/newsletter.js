import { useStaticQuery, graphql } from 'gatsby';

const HeaderQuery = () => 
  useStaticQuery(graphql`
    {
      content: nacelleContentRemoteComponentNewsletter(
        handle: { eq: "component-newsletter" }
      ) {
        remoteFields {
          buttonText
          emailPlaceholder
          handle
          heading
          successText
          text {
            content {
              content {
                nodeType
                value
              }
              nodeType
            }
            nodeType
          }
        }
      }
    }
  `);

export default HeaderQuery;
