import React from 'react';
import { Link } from 'gatsby';

const FooterPrimary = ({ content }) => {
  return content && (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-16">
      {content?.navigation?.map((menu, index) => (
        <div key={index} className="mt-10">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
              {menu.remoteFields.text}
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {menu.remoteFields?.links?.map((link, index1) => (
                <li key={index1}>
                  <Link 
                    className="text-base text-gray-500 hover:text-gray-900"
                    to={link.remoteFields.url}
                  >
                    {link.remoteFields.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterPrimary;
