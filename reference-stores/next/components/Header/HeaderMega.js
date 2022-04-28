import { CSSTransition } from 'react-transition-group';
import Link from 'next/link';
import Image from 'next/Image';
import { contentfulUtils } from 'services';

const HeaderMega = ({ content, active }) => {
  const fields = content?.fields;

  const callouts = [];
  if (fields?.navigationCallout1) {
    callouts.push(fields?.navigationCallout1);
  }
  if (fields?.navigationCallout2) {
    callouts.push(fields?.navigationCallout2);
  }

  const menus = [];
  if (fields?.navigationGroup1) {
    menus.push(fields?.navigationGroup1);
  }
  if (fields?.navigationGroup2) {
    menus.push(fields?.navigationGroup2);
  }

  return (
    content && (
      <CSSTransition in={active} timeout={0} classNames="fade">
        <div
          className={`
          absolute top-full inset-x-0 border-t border-gray-200 text-sm text-gray-500 z-10 transition ease-out duration-200
          ${!active && ' hidden'}
        `}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />
          <div className="relative bg-white">
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                  {callouts.map((callout, index) => (
                    <Link href={callout.fields.linkUrl} key={index}>
                      <a className="group relative text-base sm:text-sm">
                        {callout.fields.image && (
                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                            <Image
                              src={contentfulUtils.imageUrl(
                                callout.fields.image
                              )}
                              alt={callout.fields.imageAlt}
                              quality={80}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        )}
                        {callout.fields.heading && (
                          <div className="mt-6 block font-medium text-gray-900">
                            <span
                              className="absolute z-10 inset-0"
                              aria-hidden="true"
                            ></span>
                            {callout.fields.heading}
                          </div>
                        )}
                        {callout.fields.linkText && (
                          <p aria-hidden="true" className="mt-1">
                            {callout.fields.linkText}
                          </p>
                        )}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                  {menus.map((menu, index) => (
                    <div key={index}>
                      {menu.fields.text && (
                        <p className="font-medium text-gray-900">
                          {menu.fields.text}
                        </p>
                      )}
                      <ul
                        role="list"
                        aria-labelledby={`${menu.fields.text}-heading`}
                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                      >
                        {menu.fields.links.map((link, index1) => (
                          <li key={index1} className="flex">
                            <Link href={link.fields.url}>
                              <a className="hover:text-gray-800">
                                {link.fields.text}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            .fade-enter-active,
            .fade-exit-active,
            .fade-enter-done {
              opacity: 1;
            }
            .fade-enter,
            .fade-exit {
              opacity: 0;
            }
          `}</style>
        </div>
      </CSSTransition>
    )
  );
};

export default HeaderMega;
