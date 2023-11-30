import { CONTENT_QUERY_FRAGMENT } from './content';

export const CONTENT_ROUTES_QUERY = /* GraphQL */ `
  {
    pages: allContent(filter: { type: "pageSections" }) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

export const CONTENT_PAGE_QUERY = /* GraphQL */ `
  query ContentPage($handle: String!) {
    pages: allContent(filter: { type: "pageSections", handles: [$handle] }) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }
  }
  ${CONTENT_QUERY_FRAGMENT}
`;
