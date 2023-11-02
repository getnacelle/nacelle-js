import { TypedFieldsExampleArticleFields } from '@/gql/graphql';
import React from 'react';

interface ArticleProps {
  content: TypedFieldsExampleArticleFields;
}

const Article: React.FC<ArticleProps> = ({ content }) => {
  const author = content?.author?.typedFields;
  const { haiku, title } = content;

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600 whitespace-pre-line">{haiku}</p>
      <div className="mt-4 flex items-center">
        <div className="ml-3">
          <div className="text-sm font-medium text-gray-900">
            {author?.firstName} {author?.lastName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
