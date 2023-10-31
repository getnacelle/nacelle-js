import React from 'react';
import Link from 'next/link';
import { ContentTypedFields } from '@/gql/graphql';

interface LinksProps {
  content: ContentTypedFields;
  section: string;
}

const Links: React.FC<LinksProps> = ({ content }) => {
  if (content?.__typename !== 'TypedFieldsexampleprojectLinksFields')
    return null;

  const links = content?.links?.edges?.map((edge) => edge?.node?.typedFields);

  if (!links) return null;

  return (
    <div className="m-12">
      <ul className="list-disc list-inside">
        {links.map((h, i) => (
          <li key={i} className="text-blue-900 hover:underline">
            <Link href={`/articles/${h?.handle}`}>{h?.handle}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Links;
