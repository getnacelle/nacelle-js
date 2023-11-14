import nacelleClient from '@/services/nacelleClient';
import Article from '@/components/Article';
import ArticleLinks from '@/components/ArticleLinks';
import { PAGE_FIELDS_FRAGMENT, PAGE_QUERY_BY_HANDLE } from '@/app/page';
import { getFragmentData, type FragmentType, graphql } from '@/gql';

export const CONTENT_ROUTES_QUERY = graphql(/* GraphQL */ `
  query ContentRoutes {
    pages: allContent(filter: { type: "page" }) {
      edges {
        node {
          handle
        }
      }
    }
  }
`);

interface PageProps {
  params: {
    handle: string;
  };
}

export default async function Page({
  params: { handle }
}: Readonly<PageProps>): Promise<JSX.Element> {
  const data = await getData(handle).then((d) =>
    getFragmentData(PAGE_FIELDS_FRAGMENT, d)
  );

  if (!data) return <div>404</div>;

  const sections = data.sections?.edges.map((edge) => {
    if (edge.node?.__typename === undefined) return null;

    switch (edge.node.__typename) {
      case 'TypedFieldsExampleArticle': {
        return <Article key={edge.node.nacelleEntryId} content={edge.node} />;
      }

      case 'TypedFieldsExampleLinks': {
        return (
          <ArticleLinks key={edge.node.nacelleEntryId} content={edge.node} />
        );
      }

      default:
        return <div>Component not found</div>;
    }
  });

  return <div>{sections}</div>;
}

interface StaticParams {
  params: {
    handle: string;
  };
}

export async function generateStaticParams(): Promise<Array<StaticParams>> {
  const { data } = await nacelleClient.query({
    query: CONTENT_ROUTES_QUERY
  });

  const handles = (data?.pages?.edges ?? []).reduce<Array<StaticParams>>(
    (acc, el) => {
      if (el?.node?.handle) {
        acc.push({ params: { handle: el.node.handle } });
      }

      return acc;
    },
    []
  );

  return handles;
}

async function getData(
  handle: string
): Promise<NonNullable<FragmentType<typeof PAGE_FIELDS_FRAGMENT>>> {
  const { data } = await nacelleClient.query({
    query: PAGE_QUERY_BY_HANDLE,
    variables: { handle, type: 'page' }
  });

  const pageFields = data?.allContent?.edges?.at(0)?.node?.typedFields;

  if (pageFields?.__typename !== 'TypedFieldsExamplePageFields') {
    throw new Error('Page not found');
  }

  return pageFields;
}
