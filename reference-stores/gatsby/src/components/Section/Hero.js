import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { contentfulUtils } from 'services';

const Hero = ({ content }) => {
  return (
    content && (
      <section className="bg-white">
        <div className="relative bg-gray-900">
          {content.remoteFields.image && (
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden"
            >
              <GatsbyImage
                image={getImage(content.remoteFields.image.remoteFields.file.remoteImage.childImageSharp)}
                alt={content.remoteFields.imageAlt}
                fit="cover"
                className="w-full h-full"
              />
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 opacity-50"
          ></div>
          <div
            className="
              relative
              max-w-3xl
              mx-auto
              py-32
              px-6
              flex flex-col
              items-center
              text-center
              sm:py-48
              lg:px-0
            "
          >
            {content.remoteFields.heading && (
              <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
                {content.remoteFields.heading}
              </h1>
            )}
            {content.remoteFields.text && (
              <div
                className="mt-4 text-xl text-white"
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
                  text-gray-900
                  hover:bg-gray-100
                "
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

export default Hero;
