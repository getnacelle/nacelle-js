import Image from 'next/image';
import Link from 'next/link';
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
                content.fields.imageSide === 'Left' ? 'lg:left-0' : 'lg:right-0'
              }
            `}
          >
            <Image
              src={contentfulUtils.imageUrl(content.fields.image)}
              alt={content.fields.imageAlt}
              quality={80}
              layout="fill"
              objectFit="cover"
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
              content.fields.imageSide === 'Left'
                ? 'lg:col-start-2 lg:pl-8'
                : 'lg:col-start-1 lg:pr-8'
            }
          >
            <div
              class={`text-base max-w-prose mx-auto lg:max-w-lg ${
                content.fields.imageSide === 'Left'
                  ? 'lg:ml-auto lg:mr-0'
                  : 'lg:mr-auto lg:ml-0'
              }`}
            >
              {content.fields.subheading && (
                <h2
                  className="
                    leading-6
                    text-indigo-600
                    font-semibold
                    tracking-wide
                    uppercase
                    "
                >
                  {content.fields.subheading}
                </h2>
              )}
              {content.fields.heading && (
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
                  {content.fields.heading}
                </h3>
              )}
              {content.fields.text && (
                <div
                  className="mt-4 text-lg text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: contentfulUtils.richText(content.fields.text)
                  }}
                />
              )}
              {content.fields.linkUrl && (
                <div className="mt-6">
                  <Link href={content.fields.linkUrl}>
                    <a
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
                      {content.fields.linkText}
                    </a>
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
