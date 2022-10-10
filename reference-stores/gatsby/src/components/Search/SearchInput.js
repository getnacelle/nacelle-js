import React, { useState, useEffect } from 'react';
import { useSearch } from 'hooks/useSearch';
import SearchAutocomplete from './SearchAutocomplete';
import searchIcon from 'assets/svgs/search';

const SearchInput = ({ content }) => {
  const [isFocussed, setIsFocussed] = useState(false);

  const { query, setQuery } = useSearch();

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      window.location.href = `/search?q=${e.target.value}`
      // navigate();
      e.target.blur();
    }
  };

  const handleOnChange = (e) => {
    setQuery({ query: e.target.value });
  };

  const handleFocus = (value) => {
    setIsFocussed(value);
  };

  const handleClick = () => {
    setIsFocussed(false);
  };

  return (
    content && (
      <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
        <div className="max-w-lg w-full lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div
              className="
              absolute
              inset-y-0
              left-0
              pl-3
              flex
              items-center
              pointer-events-none
            "
            >
              <span
                className="h-5 w-5 text-gray-400"
                dangerouslySetInnerHTML={{ __html: searchIcon }}
              />
            </div>
            <input
              value={query}
              name="search-header"
              className="
              block
              w-full
              pl-10
              pr-3
              py-2
              border border-gray-300
              rounded-md
              leading-5
              bg-white
              placeholder-gray-500
              focus:outline-none
              focus:placeholder-gray-400
              focus:ring-1
              focus:ring-indigo-500
              focus:border-indigo-500
              sm:text-sm
            "
              placeholder={content.placeholder}
              type="search"
              onChange={handleOnChange}
              onKeyUp={handleKeyUp}
              onFocus={() => handleFocus(true)}
              onClick={(e) => e.stopPropagation()}
            />
            <SearchAutocomplete
              show={isFocussed && query.trim() !== ''}
              content={content}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default SearchInput;
