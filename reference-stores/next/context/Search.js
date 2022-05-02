import { createContext, useState } from 'react';
import { searchProducts } from 'utils/searchProducts';
import { getProductFilters } from 'utils/getProductFilters';
import { filterProducts } from 'utils/filterProducts';

export const SearchContext = createContext({});

export const SearchProvider = ({ children, catalog, query }) => {
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [searchResults, setSearchResults] = useState([]);
  const [results, setResults] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([]);

  const handleQuery = ({ query }) => {
    setSearchQuery(query);
    const searchResults = searchProducts({
      products: catalog,
      query
    });
    setSearchResults(searchResults);
    const availableFiltersFromSearch = getProductFilters({
      products: searchResults
    });
    const activeFiltersFromSearch = getActiveFilters({
      active: activeFilters,
      available: availableFiltersFromSearch
    });
    setAvailableFilters(availableFiltersFromSearch);
    setActiveFilters(activeFiltersFromSearch);
    const filterResults = filterProducts({
      products: searchResults,
      filters: activeFiltersFromSearch
    });
    setResults(filterResults);
  };

  const handleToggleFilter = ({ filter }) => {
    const filters = [...activeFilters];
    const { values, ...rest } = filter;
    const activeIndex = filters.findIndex(
      ({ type, name, value }) =>
        type === rest.type && name === rest.name && rest.value === value
    );
    if (activeIndex < 0) filters.push(rest);
    else filters.splice(activeIndex, 1);
    setActiveFilters(filters);
    const filterResults = filterProducts({
      products: searchResults,
      filters
    });
    setResults(filterResults);
  };

  const handleSetFilters = ({ filters }) => {
    setActiveFilters(filters);
    const filterResults = filterProducts({
      products: searchResults,
      filters
    });
    setResults(filterResults);
  };

  const getActiveFilters = ({ active, available }) => {
    return active.filter((activeFilter) => {
      return available.find(
        (availableFilter) =>
          activeFilter.type === availableFilter.type &&
          activeFilter.name === availableFilter.name &&
          availableFilter.values.includes(activeFilter.value)
      );
    });
  };

  return (
    <SearchContext.Provider
      value={{
        query: searchQuery,
        setQuery: handleQuery,
        results,
        activeFilters,
        availableFilters,
        toggleFilter: handleToggleFilter,
        setFilters: handleSetFilters
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
