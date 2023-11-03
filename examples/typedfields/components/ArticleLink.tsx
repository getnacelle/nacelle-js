import { TypedFieldsExamplePageFields } from '@/gql/graphql';
import React from 'react';
import Link from 'next/link';

interface ArticleLinkProps {
  content: TypedFieldsExamplePageFields;
}

const ArticleLink: React.FC<ArticleLinkProps> = ({ content }) => {
  const { handle, sections } = content;
  const article = sections?.edges?.[0]?.node?.typedFields || {};

  if (article.__typename !== 'TypedFieldsExampleArticleFields') return null;

  const { title, author } = article;
  const { firstName, lastName } = author?.typedFields || {};

  return (
    <Link href={`/articles/${handle}`}>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
        <h2 className="text-lg font-medium mb-2">{title}</h2>
        <p className="text-gray-500 text-sm">{`${firstName} ${lastName}`}</p>
      </div>
    </Link>
  );
};

export default ArticleLink;
