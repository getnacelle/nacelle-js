import type { TypedFieldsExamplePageFields } from '@/gql/graphql';
import { CONTENT_ROUTES_QUERY, PAGE_QUERY_BY_HANDLE } from '@/queries/pages';
import nacelleClient from '@/services/nacelleClient';
import Article from '@/components/Article';
import ArticleLinks from '@/components/ArticleLinks';

export default async function Page({
  params: { handle }
}: {
  params: { handle: string };
}): Promise<JSX.Element> {
  const data = await getData(handle);

  if (!data) return <div>404</div>;

  const sections = data?.sections?.edges?.map((edge) => {
    const { nacelleEntryId, typedFields } = edge?.node || {};

    switch (typedFields?.__typename) {
      case 'TypedFieldsExampleArticleFields':
        return <Article key={nacelleEntryId} content={typedFields} />;
      case 'TypedFieldsExampleLinksFields':
        return <ArticleLinks key={nacelleEntryId} content={typedFields} />;
      default:
        return (
          <div key={nacelleEntryId}>
            Component not found for type {typedFields?.__typename}
          </div>
        );
    }
  });

  return <div>{sections}</div>;
}

export async function generateStaticParams(): Promise<
  { params: { handle: string } }[]
> {
  const { data } = await nacelleClient.query({
    query: CONTENT_ROUTES_QUERY
  });

  const handles = (data?.pages?.edges ?? [])
    .filter((page) => page.node.handle)
    .map((page) => ({
      params: { handle: page.node?.handle || '' }
    }));

  return handles;
}

async function getData(handle: string): Promise<TypedFieldsExamplePageFields> {
  const { data } = await nacelleClient.query({
    query: PAGE_QUERY_BY_HANDLE,
    variables: { handle, type: 'page' }
  });

  return data?.allContent?.edges?.[0]?.node
    ?.typedFields as TypedFieldsExamplePageFields;
}
