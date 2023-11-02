import type { TypedFieldsExamplePageFields } from '@/gql/graphql';
import { PAGE_QUERY_BY_HANDLE } from '@/queries/pages';
import nacelleClient from '@/services/nacelleClient';
import Section from '@/components/Section';

export default async function HomePage(): Promise<JSX.Element> {
  const data = await getData();

  if (!data) return <div>404</div>;

  const sections = data?.sections?.edges?.map(
    (edge) => edge?.node?.typedFields
  );

  return (
    <div>
      {sections?.map((content, i) =>
        content ? <Section key={i} content={content} /> : <div key={i} />
      )}
    </div>
  );
}

async function getData(): Promise<TypedFieldsExamplePageFields> {
  const { data } = await nacelleClient.query({
    query: PAGE_QUERY_BY_HANDLE,
    variables: { handle: 'homepage', type: 'page' }
  });

  return data?.allContent?.edges?.[0]?.node
    ?.typedFields as TypedFieldsExamplePageFields;
}
