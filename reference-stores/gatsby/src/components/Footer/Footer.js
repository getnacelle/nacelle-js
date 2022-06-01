import React from 'react';
import FooterQuery from 'queries/components/footer';
import FooterPrimary from './FooterPrimary';
import FooterSecondary from './FooterSecondary';

const Footer = () => {
  const { content } = FooterQuery();
  const { navigationGroups, ...rest } = content?.remoteFields;
  const primaryContent = { navigation: navigationGroups };
  const secondaryContent = rest;

  return (
    content && (
      <footer
        className="bg-white border-t border-gray-200"
        aria-labelledby="footer-heading"
      >
        <h2 className="sr-only">Footer</h2>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:py-6 lg:px-8">
          <FooterPrimary content={primaryContent} />
          <FooterSecondary content={secondaryContent} />
        </div>
      </footer>
    )
  );
};

export default Footer;
