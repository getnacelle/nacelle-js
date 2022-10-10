import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import * as styles from './HeaderMega.module.css';

const HeaderMega = ({ content, active }) => {
  const callouts = [];
  if (content?.navigationCallout1) {
    callouts.push(content?.navigationCallout1);
  }
  if (content?.navigationCallout2) {
    callouts.push(content?.navigationCallout2);
  }

  const menus = [];
  if (content?.navigationGroup1) {
    menus.push(content?.navigationGroup1);
  }
  if (content?.navigationGroup2) {
    menus.push(content?.navigationGroup2);
  }

  return (
    content && (
      <CSSTransition
        in={active}
        timeout={0}
        classNames={{
          enterActive: styles.enterActive,
          exitActive: styles.exitActive,
          enter: styles.enter,
          exit: styles.exit
        }}
      >
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
                    <Link
                      className="group relative text-base sm:text-sm"
                      to={callout.remoteFields.linkUrl}
                      key={index}
                    >
                      {callout.remoteFields.image && (
                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                          <GatsbyImage
                            image={getImage(callout.remoteFields.image.remoteFields.file.remoteImage.childImageSharp)}
                            alt={callout.remoteFields.imageAlt}
                            fit="cover"
                            className="w-full h-full"
                          />
                        </div>
                      )}
                      {callout.remoteFields.heading && (
                        <div className="mt-6 block font-medium text-gray-900">
                          <span
                            className="absolute z-10 inset-0"
                            aria-hidden="true"
                          ></span>
                          {callout.remoteFields.heading}
                        </div>
                      )}
                      {callout.remoteFields.linkText && (
                        <p aria-hidden="true" className="mt-1">
                          {callout.remoteFields.linkText}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
                <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                  {menus.map((menu, index) => (
                    <div key={index}>
                      {menu.remoteFields.text && (
                        <p className="font-medium text-gray-900">
                          {menu.remoteFields.text}
                        </p>
                      )}
                      <ul
                        role="list"
                        aria-labelledby={`${menu.remoteFields.text}-heading`}
                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                      >
                        {menu.remoteFields.links.map((link, index1) => (
                          <li key={index1} className="flex">
                            <Link
                              className="hover:text-gray-800"
                              to={link.remoteFields.url}
                            >
                              {link.remoteFields.text}
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
        </div>
      </CSSTransition>
    )
  );
};

export default HeaderMega;
