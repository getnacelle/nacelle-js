import React from 'react';
import { /*Image,*/ Link } from 'gatsby';
import { contentfulUtils } from 'services';

const SideBySideFull = ({ content }) => {
  return (
    content && (
      <section className="relative bg-white">
        <div className="lg:absolute lg:inset-0">
          <div
            className={`
              relative h-56 lg:absolute lg:h-auto lg:inset-y-0 lg:w-1/2
              ${
                content.remoteFields.imageSide === 'Left'
                  ? 'lg:left-0'
                  : 'lg:right-0'
              }
            `}
          >
            <img
              src={contentfulUtils.imageUrl(content.remoteFields.image)}
              alt={content.remoteFields.imageAlt}
              // quality={80}
              // layout="fill"
              // objectFit="cover"
            />
          </div>
        </div>
        <div
          className="
            relative
            pt-12
            pb-16
            px-4
            sm:pt-16 sm:px-6
            lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2
          "
        >
          <div
            className={
              content.remoteFields.imageSide === 'Left'
                ? 'lg:col-start-2 lg:pl-8'
                : 'lg:col-start-1 lg:pr-8'
            }
          >
            <div
              className={`text-base max-w-prose mx-auto lg:max-w-lg ${
                content.remoteFields.imageSide === 'Left'
                  ? 'lg:ml-auto lg:mr-0'
                  : 'lg:mr-auto lg:ml-0'
              }`}
            >
              {content.remoteFields.subheading && (
                <h2
                  className="
                    leading-6
                    text-indigo-600
                    font-semibold
                    tracking-wide
                    uppercase
                    "
                >
                  {content.remoteFields.subheading}
                </h2>
              )}
              {content.remoteFields.heading && (
                <h3
                  className="
                    mt-2
                    text-3xl
                    leading-8
                    font-extrabold
                    tracking-tight
                    text-gray-900
                    sm:text-4xl
                    "
                >
                  {content.remoteFields.heading}
                </h3>
              )}
              {content.remoteFields.text && (
                <div
                  className="mt-4 text-lg text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: contentfulUtils.richText(content.remoteFields.text)
                  }}
                />
              )}
              {content.remoteFields.linkUrl && (
                <div className="mt-6">
                  <Link
                    to={content.remoteFields.linkUrl}
                    className="
                      inline-flex
                      px-4
                      py-2
                      border border-transparent
                      text-base
                      font-medium
                      rounded-md
                      shadow-sm
                      text-white
                      bg-indigo-600
                      hover:bg-indigo-700
                    "
                  >
                    {content.remoteFields.linkText}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default SideBySideFull;
