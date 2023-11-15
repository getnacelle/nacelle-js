import nacelleClient from '@/services/nacelleClient';
import ArticleLinks from '@/components/ArticleLinks';
import { FragmentType, getFragmentData, graphql } from '@/gql';

export const PAGE_FIELDS_FRAGMENT = graphql(/* GraphQL */ `
  fragment PageFields_PageFields on TypedFieldsExamplePageFields {
    __typename
    handle
    title
    sections {
      edges {
        node {
          __typename
          ... on Node {
            nacelleEntryId
          }
          ...Article_Content
          ...Links_Content
        }
      }
    }
  }
`);

export const PAGE_QUERY_BY_HANDLE = graphql(/* GraphQL */ `
  query PageByHandle($handle: String!) {
    allContent(filter: { type: "page", handles: [$handle] }) {
      edges {
        node {
          handle
          nacelleEntryId
          typedFields {
            __typename
            ...PageFields_PageFields
          }
        }
      }
    }
  }
`);

export default async function HomePage(): Promise<JSX.Element> {
  const data = await getData().then((pageData) =>
    getFragmentData(PAGE_FIELDS_FRAGMENT, pageData)
  );

  if (!data) return <div>404</div>;

  const sections = data.sections?.edges
    .map((edge) => edge.node)
    .map((link) => {
      if (link?.__typename !== 'TypedFieldsExampleLinks') return null;

      return <ArticleLinks key={link.nacelleEntryId} content={link} />;
    });

  return <div>{sections}</div>;
}

async function getData(): Promise<FragmentType<typeof PAGE_FIELDS_FRAGMENT>> {
  const { data } = await nacelleClient.query({
    query: PAGE_QUERY_BY_HANDLE,
    variables: { handle: 'homepage', type: 'page' }
  });

  const pageFields = data?.allContent?.edges?.at(0)?.node?.typedFields;

  if (pageFields?.__typename !== 'TypedFieldsExamplePageFields') {
    throw new Error(`Page not found: ${pageFields?.__typename}`);
  }

  return pageFields;
}
