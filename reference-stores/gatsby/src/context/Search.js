import React, { createContext, useState, useEffect, useMemo } from 'react';
import ProductsQuery from 'queries/site/products';
import { searchProducts } from 'utils/searchProducts';
import { getProductFilters } from 'utils/getProductFilters';
import { filterProducts } from 'utils/filterProducts';

export const SearchContext = createContext({});

export const SearchProvider = ({ children, query }) => {
  const { products } = ProductsQuery();
  const catalog = useMemo(() => {
    return products?.edges?.map((edge) => edge.node);
  }, [products]);

  const [searchQuery, setSearchQuery] = useState(query || '');
  const [searchResults, setSearchResults] = useState([]);
  const [results, setResults] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([]);

  useEffect(() => {
    const searchResults = searchProducts({
      products: catalog,
      query: searchQuery
    });
    const availableFiltersFromSearch = getProductFilters({
      products: searchResults
    });
    const activeFiltersFromSearch = getActiveFilters({
      active: activeFilters,
      available: availableFiltersFromSearch
    });
    setSearchResults(searchResults);
    setAvailableFilters(availableFiltersFromSearch);
    const activefiltersChanged =
      JSON.stringify(activeFilters) !== JSON.stringify(activeFiltersFromSearch);
    if (activefiltersChanged) {
      setActiveFilters(availableFiltersFromSearch);
    }
    setResults(searchResults);
  }, [catalog, searchQuery, activeFilters]);

  useEffect(() => {
    const filterResults = filterProducts({
      products: searchResults,
      filters: activeFilters
    });
    setResults(filterResults);
  }, [activeFilters, searchResults]);

  const handleQuery = ({ query }) => {
    setSearchQuery(query);
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
  };

  const handleSetFilters = ({ filters }) => {
    setActiveFilters(filters);
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
