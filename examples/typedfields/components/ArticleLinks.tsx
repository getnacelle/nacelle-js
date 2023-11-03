import React from 'react';
import { TypedFieldsExampleLinksFields } from '@/gql/graphql';
import ArticleLink from './ArticleLink';

interface LinksProps {
  content: TypedFieldsExampleLinksFields;
}

const Links: React.FC<LinksProps> = ({ content }) => {
  const links = content?.links?.edges?.map((edge) => edge?.node?.typedFields);
  const title = content?.title;
  if (!links) return null;

  return (
    <div className="mt-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <div className="flex flex-wrap mt-2 space-x-4">
        {links.map(
          (content) =>
            content && <ArticleLink key={content?.handle} content={content} />
        )}
      </div>
    </div>
  );
};

export default Links;
