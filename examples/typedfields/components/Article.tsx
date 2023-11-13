import React from 'react';
import { FragmentType, getFragmentData, graphql } from '@/gql';

export const ARTICLE_FRAGMENT = graphql(/* GraphQL */ `
  fragment Article_Content on TypedFieldsExampleArticle {
    nacelleEntryId
    typedFields {
      haiku
      title
      author {
        typedFields {
          firstName
          lastName
        }
      }
    }
  }
`);

export interface ArticleProps {
  content: FragmentType<typeof ARTICLE_FRAGMENT>;
}

const Article: React.FC<ArticleProps> = (props: ArticleProps) => {
  const content = getFragmentData(ARTICLE_FRAGMENT, props.content).typedFields;

  if (!content) return null;

  const { author, title, haiku } = content;

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600 whitespace-pre-line">{haiku}</p>
      {author && (
        <div className="mt-4 flex items-center">
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">
              {author.typedFields?.firstName} {author.typedFields?.lastName}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
