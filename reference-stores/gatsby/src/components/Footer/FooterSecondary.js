import React from 'react';
import facebookIcon from 'assets/svgs/facebook';
import twitterIcon from 'assets/svgs/twitter';
import githubIcon from 'assets/svgs/github';

const FooterSecondary = ({ content }) => {
  const icons = {
    facebook: facebookIcon,
    twitter: twitterIcon,
    github: githubIcon
  };

  const social =
    content &&
    ['facebook', 'twitter', 'github']
      .filter((account) => content[`${account}Url`])
      .map((account) => ({
        name: account,
        url: content[`${account}Url`],
        icon: icons[account]
      }));

  return (
    <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
      {social && (
        <div className="flex space-x-6 md:order-2">
          {social.map((account, index) => (
            <a
              key={index}
              href={account.url}
              className="text-gray-500 hover:text-gray-900"
            >
              <span className="sr-only">{account.name}</span>
              <span
                className="h-6 w-6"
                dangerouslySetInnerHTML={{ __html: account.icon }}
              />
            </a>
          ))}
        </div>
      )}
      {content?.copyright && (
        <p className="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
          &copy; {new Date().getFullYear()} {content.copyright}
        </p>
      )}
    </div>
  );
};

export default FooterSecondary;
