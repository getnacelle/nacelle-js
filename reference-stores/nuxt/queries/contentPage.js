import { CONTENT_QUERY_FRAGMENT } from './content';

export const CONTENT_PAGE_QUERY = `
  query ContentPage($handle: String!){
    pages: allContent(filter: { type: "pageSections", handles: [$handle] }){
      ${CONTENT_QUERY_FRAGMENT}
    }
  }
`;
