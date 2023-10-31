import type { TypedFieldsexampleprojectPageFields } from '@/gql/graphql';
import { CONTENT_ROUTES_QUERY, PAGE_QUERY_BY_HANDLE } from '@/queries/pages';
import nacelleClient from '@/services/nacelleClient';
import Section from '@/components/Section';

export default async function Page({
  params: { handle }
}: {
  params: { handle: string };
}): Promise<JSX.Element> {
  const data = await getData(handle);

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

async function getData(
  handle: string
): Promise<TypedFieldsexampleprojectPageFields> {
  const { data } = await nacelleClient.query({
    query: PAGE_QUERY_BY_HANDLE,
    variables: { handle, type: 'page' }
  });

  return data?.allContent?.edges?.[0]?.node
    ?.typedFields as TypedFieldsexampleprojectPageFields;
}
