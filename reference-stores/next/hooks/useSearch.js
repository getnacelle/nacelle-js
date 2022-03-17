import { useContext } from 'react'
import { SearchContext } from 'context/Search'

export const useSearch = () => {
  const {
    query,
    setQuery,
    results,
    activeFilters,
    availableFilters,
    setFilters
  } = useContext(SearchContext)

  return {
    query,
    setQuery,
    results,
    activeFilters,
    availableFilters,
    setFilters
  }
}