import React from 'react';
import ArticleLink from './ArticleLink';
import { getFragmentData, graphql, type FragmentType } from '@/gql';
import { isNonNullNode } from '@/utils';

export const LINKS_FRAGMENT = graphql(/* GraphQL */ `
  fragment Links_Content on TypedFieldsExampleLinks {
    nacelleEntryId
    typedFields {
      title
      links {
        edges {
          node {
            ... on Node {
              nacelleEntryId
            }
            ...Link_Content
          }
        }
      }
    }
  }
`);

interface LinksProps {
  content: FragmentType<typeof LINKS_FRAGMENT>;
}

const Links: React.FC<LinksProps> = (props: LinksProps) => {
  const content = getFragmentData(LINKS_FRAGMENT, props.content);

  if (content.__typename !== 'TypedFieldsExampleLinks') return null;

  const title = content.typedFields?.title;
  const linkNodes =
    content.typedFields?.links?.edges
      .map((edge) => edge.node)
      .filter(isNonNullNode) ?? [];

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <div className="flex flex-wrap mt-2 space-x-4">
        {linkNodes.map((link) => (
          <ArticleLink key={link.nacelleEntryId} content={link} />
        ))}
      </div>
    </div>
  );
};

export default Links;
