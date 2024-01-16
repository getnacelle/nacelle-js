import Image from 'next/image';
import Link from 'next/link';
import { contentfulUtils } from 'services';

const Hero = ({ content }) => {
  return (
    content && (
      <section
        className="bg-white"
        data-nacelle-entry-id={content.nacelleEntryId}
      >
        <div className="relative bg-gray-900">
          {content.fields.image && (
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden"
            >
              <Image
                src={contentfulUtils.imageUrl(content.fields.image)}
                alt={content.fields.imageAlt}
                layout="fill"
                objectFit="cover"
                quality={80}
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
            {content.fields.heading && (
              <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
                {content.fields.heading}
              </h1>
            )}
            {content.fields.text && (
              <div
                className="mt-4 text-xl text-white"
                dangerouslySetInnerHTML={{
                  __html: contentfulUtils.richText(content.fields.text)
                }}
              />
            )}
            {content.fields.linkUrl && (
              <Link href={content.fields.linkUrl}>
                <a
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
                  {content.fields.linkText}
                </a>
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  );
};

export default Hero;
