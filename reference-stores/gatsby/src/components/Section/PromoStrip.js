import React from 'react';
// import { Image } from 'gatsby';
import { contentfulUtils } from 'services';

const PromoStrip = ({ content }) => {
  return (
    content && (
      <section className="relative bg-gray-800 py-28 px-6 sm:py-32 sm:px-12 lg:px-16">
        {content.remoteFields.image && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={contentfulUtils.imageUrl(content.remoteFields.image)}
              alt={content.remoteFields.imageAlt}
              // quality={80}
              // layout="fill"
              // objectFit="cover"
            />
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 bg-opacity-50"
        ></div>
        <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
          {content.remoteFields.heading && (
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {content.remoteFields.heading}
            </h2>
          )}
          {content.remoteFields.text && (
            <div
              className="mt-3 text-xl text-white"
              dangerouslySetInnerHTML={{
                __html: contentfulUtils.richText(content.remoteFields.text)
              }}
            />
          )}
        </div>
      </section>
    )
  );
};

export default PromoStrip;
