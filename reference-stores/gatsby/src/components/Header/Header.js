import React from 'react';
import HeaderQuery from 'queries/components/header';
import HeaderPromo from './HeaderPromo';
import HeaderMenu from './HeaderMenu';
import HeaderLogo from './HeaderLogo';
import HeaderPrimary from './HeaderPrimary';
import SearchInput from 'components/Search/SearchInput';
import HeaderCart from './HeaderCart';

const Header = () => {
  const { content } = HeaderQuery();

  const promoContent = {
    text: content?.remoteFields?.promoText
  };

  const primaryContent = {
    navigation: content?.remoteFields?.navigation
  };

  const searchContent = {
    placeholder: content?.remoteFields?.searchPlaceholder,
    heading: content?.remoteFields?.searchHeading,
    all: content?.remoteFields?.searchAll,
    empty: content?.remoteFields?.searchEmpty
  };

  return (
    content && (
      <header className="relative bg-white border-b border-gray-200">
        <HeaderPromo content={promoContent} />
        <nav
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="h-16 flex items-center justify-around">
            <HeaderMenu />
            <HeaderLogo />
            <HeaderPrimary content={primaryContent} />
            <div className="ml-auto flex items-center">
              <div className="ml-auto flex items-center">
                <div className="hidden lg:block">
                  <SearchInput content={searchContent} />
                </div>
                <HeaderCart />
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  );
};

export default Header;
