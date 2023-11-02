import type { TypedFieldsExamplePageFields } from '@/gql/graphql';
import { PAGE_QUERY_BY_HANDLE } from '@/queries/pages';
import nacelleClient from '@/services/nacelleClient';
import Links from '@/components/Links';

export default async function HomePage(): Promise<JSX.Element> {
  const data = await getData();

  if (!data) return <div>404</div>;

  const sections = data?.sections?.edges?.map((edge, i) => {
    const { nacelleEntryId, typedFields } = edge?.node || {};

    switch (typedFields?.__typename) {
      case 'TypedFieldsExampleLinksFields':
        return <Links key={nacelleEntryId} content={typedFields} />;
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

async function getData(): Promise<TypedFieldsExamplePageFields> {
  const { data } = await nacelleClient.query({
    query: PAGE_QUERY_BY_HANDLE,
    variables: { handle: 'homepage', type: 'page' }
  });

  return data?.allContent?.edges?.[0]?.node
    ?.typedFields as TypedFieldsExamplePageFields;
}
