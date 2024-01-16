import Image from 'next/image';
import { contentfulUtils } from 'services';

const SideBySide = ({ content }) => {
  return (
    content && (
      <div className="bg-white" data-nacelle-entry-id={content.nacelleEntryId}>
        <div className="max-w-7xl mx-auto py-24 sm:px-2 sm:py-32 lg:px-4">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
            <div className="grid grid-cols-1 items-center gap-y-10 gap-x-16 lg:grid-cols-2">
              <div>
                {content.fields.heading && (
                  <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                    {content.fields.heading}
                  </h2>
                )}
                {content.fields.text && (
                  <div
                    className="mt-4 text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: contentfulUtils.richText(content.fields.text)
                    }}
                  />
                )}
              </div>
              {content.fields.image && (
                <div className="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={contentfulUtils.imageUrl(content.fields.image)}
                    alt={content.fields.imageAlt}
                    quality={80}
                    layout="fill"
                    objectFit="cover"
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
