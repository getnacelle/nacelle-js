import React from 'react';
import Section from 'components/Section/Section';

const Content = ({ pageContext }) => {
  const { page } = pageContext;
  const fields = page?.remoteFields || {};
  const { sections } = fields;

  return (
    page && (
      <div className="bg-white">
        {sections?.map((section, index) => (
          <Section key={index} content={section} />
        ))}
      </div>
    )
  );
};

export default Content;
