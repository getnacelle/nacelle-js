import React from 'react';
import { /*Image,*/ Link } from 'gatsby';
import { contentfulUtils } from 'services';

const CtaStrip = ({ content }) => {
  return (
    content && (
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          {content.remoteFields.image && (
            <div className="absolute inset-0 max-w-7xl mx-auto overflow-hidden xl:px-8">
              <img
                src={contentfulUtils.imageUrl(content.remoteFields.image)}
                alt={content.remoteFields.imageAlt}
                // quality={80}
                // layout="fill"
                // objectFit="cover"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-white bg-opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-32 px-4 flex flex-col items-center text-center sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            {content.remoteFields.heading && (
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                {content.remoteFields.heading}
              </h2>
            )}
            {content.remoteFields.text && (
              <div
                className="mt-4 max-w-xl mx-auto text-xl text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: contentfulUtils.richText(content.remoteFields.text)
                }}
              />
            )}
            {content.remoteFields.linkUrl && (
              <Link
                to={content.remoteFields.linkUrl}
                className="mt-6 inline-block w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-gray-800 sm:w-auto"
              >
                {content.remoteFields.linkText}
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  );
};

export default CtaStrip;
