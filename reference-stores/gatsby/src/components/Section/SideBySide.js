import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { contentfulUtils } from 'services';

const SideBySide = ({ content }) => {
  return (
    content && (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-24 sm:px-2 sm:py-32 lg:px-4">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
            <div className="grid grid-cols-1 items-center gap-y-10 gap-x-16 lg:grid-cols-2">
              <div>
                {content.remoteFields.heading && (
                  <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                    {content.remoteFields.heading}
                  </h2>
                )}
                {content.remoteFields.text && (
                  <div
                    className="mt-4 text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: contentfulUtils.richText(
                        content.remoteFields.text
                      )
                    }}
                  />
                )}
              </div>
              {content.remoteFields.image && (
                <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
                  <GatsbyImage
                    image={getImage(content.remoteFields.image.remoteFields.file.remoteImage.childImageSharp)}
                    alt={content.remoteFields.imageAlt}
                    fit="cover"
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SideBySide;
