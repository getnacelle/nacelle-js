import { useContext } from 'react';
import { SearchContext } from 'context/Search';

export const useSearch = () => {
  const {
    query,
    setQuery,
    results,
    activeFilters,
    availableFilters,
    toggleFilter,
    setFilters
  } = useContext(SearchContext);

  return {
    query,
    setQuery,
    results,
    activeFilters,
    availableFilters,
    toggleFilter,
    setFilters
  };
};
