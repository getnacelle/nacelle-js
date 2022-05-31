import React from 'react';
import { SearchProvider } from 'context/Search';
import SearchForm from 'components/Search/SearchForm';

const Search = ({ pageContext }) => {
  const { products } = pageContext;

  return (
    products && (
      <div className="bg-white">
        <SearchProvider productList={products}>
          <SearchForm />
        </SearchProvider>
      </div>
    )
  );
};

export default Search;
