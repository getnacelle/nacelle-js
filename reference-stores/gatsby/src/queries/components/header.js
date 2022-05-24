import { useStaticQuery, graphql } from 'gatsby';

const HeaderQuery = () => 
  useStaticQuery(graphql`
    {
      content: nacelleContentRemoteComponentHeader(
        handle: { eq: "component-header" }
      ) {
        remoteFields {
          promoText
          navigation {
            type
            remoteFields {
              text
              url
            }
          }
        }
      }
    }
  `);

export default HeaderQuery;
