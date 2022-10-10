import React from 'react';
import { Helmet } from 'react-helmet';
import { buildMeta } from 'utils/buildMeta';

const Head = () => {
  const { title, meta } = buildMeta({});
  return (
    <Helmet>
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>{title}</title>
      {meta?.map((metatag, index) => (
        <meta key={index} {...metatag} />
      ))}
    </Helmet>
  );
};

export default Head;
