import React from 'react';
import { Link } from 'gatsby';
import { contentfulUtils } from 'services';

const HeroBanner = ({ content }) => {
  return (
    content && (
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div
          className="
            max-w-md
            mx-auto
            pl-4
            pr-8
            text-center
            sm:max-w-lg sm:px-6
            lg:max-w-7xl lg:px-8
          "
        >
          {content.remoteFields.heading && (
            <h1
              className="
                text-3xl
                leading-10
                font-extrabold
                tracking-tight
                text-gray-900 text-center
                sm:text-4xl sm:leading-none
                lg:text-5xl
              "
            >
              {content.remoteFields.heading}
            </h1>
          )}
          {content.remoteFields.text && (
            <div
              className="
                mt-6
                max-w-3xl
                mx-auto
                text-l
                leading-normal
                text-gray-500 text-center
                lg:text-xl
              "
              dangerouslySetInnerHTML={{
                __html: contentfulUtils.richText(content.remoteFields.text)
              }}
            />
          )}
          {content.remoteFields.linkUrl && (
            <Link
              to={content.remoteFields.linkUrl}
              className="
                mt-8
                inline-block
                bg-white
                border border-transparent
                rounded-md
                py-3
                px-8
                text-base
                font-medium
                text-white
                bg-indigo-600
                hover:bg-indigo-700
              "
            >
              {content.remoteFields.linkText}
            </Link>
          )}
        </div>
      </section>
    )
  );
};

export default HeroBanner;
