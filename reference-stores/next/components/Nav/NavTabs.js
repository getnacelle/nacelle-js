import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contentfulUtils } from 'services';

const NavTabs = ({ content }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = content?.navigation
    ?.filter((navigationItem) => {
      return navigationItem.type === 'partNavigationMega';
    })
    .map((navigationItem) => {
      const callouts = [];
      const fields = navigationItem?.fields;
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
      return {
        ...navigationItem,
        callouts,
        menus
      };
    });

  const handleClick = (value) => {
    setActiveIndex(value);
  };

  return (
    tabs && (
      <div className="mt-2">
        <div
          className="-mb-px flex px-4 space-x-8"
          aria-orientation="horizontal"
          role="tablist"
        >
          {tabs.map((tab, index) => (
            <button
              key={`tab-${index}`}
              className={`
                flex-1
                whitespace-nowrap
                py-4
                px-1
                border-b-2
                text-base
                font-medium
                ${
                  activeIndex === index
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-gray-900 border-transparent'
                }
              `}
              aria-controls={`tabs-${index}-panel`}
              role="tab"
              type="button"
              onClick={() => handleClick(index)}
            >
              {tab.fields.text}
            </button>
          ))}
        </div>
        {tabs.map((tab, index) => (
          <div
            key={`callout-${index}`}
            className={`
              pt-10 pb-8 px-4 space-y-10
              ${activeIndex !== index && ' hidden'}
            `}
            aria-labelledby={`tab-menu-${index}`}
            tabindex={index}
          >
            <div className="grid grid-cols-2 gap-x-4">
              {tab.callouts.map((callout, index1) => (
                <Link key={index1} href={callout.fields.linkUrl}>
                  <a className="group relative text-sm">
                    {callout.fields.image && (
                      <div
                        className="
                          aspect-w-1 aspect-h-1
                          rounded-lg
                          bg-gray-100
                          overflow-hidden
                          group-hover:opacity-75
                        "
                      >
                        <Image
                          src={contentfulUtils.imageUrl(callout.fields.image)}
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
          </div>
        ))}
        {tabs.map((tab, index) => (
          <div
            key={`menu-${index}`}
            className={`
              pt-10 pb-8 px-4 space-y-10
              ${activeIndex !== index && ' hidden'}
            `}
            aria-labelledby={`menu-${index}`}
            role="tabpanel"
            tabIndex={index}
          >
            {tab.menus.map((menu, index1) => (
              <div key={index1}>
                {menu.fields.text && (
                  <p className="font-medium text-gray-900">
                    {menu.fields.text}
                  </p>
                )}
                <ul
                  role="list"
                  aria-labelledby={`menu-${index}-heading-mobile`}
                  className="mt-6 flex flex-col space-y-6"
                >
                  {menu.fields.links.map((link, index2) => (
                    <li key={index2} className="flow-root">
                      <Link href={link.fields.url}>
                        <a className="-m-2 p-2 block text-gray-500">
                          {link.fields.text}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  );
};

export default NavTabs;
