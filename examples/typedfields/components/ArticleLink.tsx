import React from 'react';
import Link from 'next/link';
import { getFragmentData, graphql, type FragmentType } from '@/gql';
import { isNonNullNode } from '@/utils';

const LINK_ARTICLE_FRAGMENT = graphql(/* GraphQL */ `
  fragment LinkArticle_Content on TypedFieldsExampleArticle {
    __typename
    nacelleEntryId
    title
    typedFields {
      author {
        typedFields {
          firstName
          lastName
        }
      }
    }
  }
`);

export const LINK_FRAGMENT = graphql(/* GraphQL */ `
  fragment Link_Content on TypedFieldsExamplePage {
    __typename
    nacelleEntryId
    handle
    typedFields {
      sections {
        edges {
          node {
            ...LinkArticle_Content
          }
        }
      }
    }
  }
`);

interface ArticleLinkProps {
  content: FragmentType<typeof LINK_FRAGMENT>;
}

const ArticleLink: React.FC<ArticleLinkProps> = (props: ArticleLinkProps) => {
  const content = getFragmentData(LINK_FRAGMENT, props.content);

  if (content.__typename !== 'TypedFieldsExamplePage') return null;

  const section = content.typedFields?.sections?.edges.at(0)?.node;

  if (
    !isNonNullNode(section) ||
    section.__typename !== 'TypedFieldsExampleArticle'
  )
    return null;

  const article = getFragmentData(LINK_ARTICLE_FRAGMENT, section);
  const { author } = article.typedFields ?? {};
  const { firstName, lastName } = author?.typedFields ?? {};

  return (
    <Link href={`/articles/${content.handle}`}>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
        <h2 className="text-lg font-medium mb-2">{article.title}</h2>
        <p className="text-gray-500 text-sm">{`${firstName} ${lastName}`}</p>
      </div>
    </Link>
  );
};

export default ArticleLink;
