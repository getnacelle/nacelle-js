import { useStaticQuery, graphql } from 'gatsby';

const NewsletterQuery = () =>
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
  `);

export default NewsletterQuery;
