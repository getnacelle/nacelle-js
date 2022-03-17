import { CONTENT_QUERY_FRAGMENT } from './content';

export const CONTENT_ROUTES_QUERY = `
{
  pages: content(filter: { type: "pageSections"  }) {
    handle
  }
}
`

export const CONTENT_PAGE_QUERY = `
  query ContentPage($handle: String!){
    pages: content(filter: { type: "pageSections", handles: [$handle] }){
     ${CONTENT_QUERY_FRAGMENT}
    }
  }
`;
