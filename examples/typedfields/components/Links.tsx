import React from 'react';
import Link from 'next/link';
import { TypedFieldsExampleLinksFields } from '@/gql/graphql';

interface LinksProps {
  content: TypedFieldsExampleLinksFields;
}

const Links: React.FC<LinksProps> = ({ content }) => {
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
