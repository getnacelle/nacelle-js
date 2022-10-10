import React from 'react';
import CollectionGrid from 'components/Collection/CollectionGrid';
import Section from 'components/Section/Section';

const Collections = ({ pageContext }) => {
  const { collection, page } = pageContext;
  const fields = page?.remoteFields || {};
  const { sections } = fields;

  return (
    collection && (
      <div className="bg-white">
        <CollectionGrid collection={collection} />
        {sections?.map((section, index) => (
          <Section key={index} content={section} />
        ))}
      </div>
    )
  );
};

export default Collections;
