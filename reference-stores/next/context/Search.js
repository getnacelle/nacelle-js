import { createContext, useState } from 'react'
import { searchProducts } from 'utils/searchProducts';
// import { filterProducts } from '~/utils/filterProducts';

export const SearchContext = createContext({})

export const SearchProvider = ({ children, catalog, query }) => {
  const [products, setProducts] = useState(catalog || [])
  const [searchQuery, setSearchQuery] = useState(query || '')
  const [searchResults, setSearchResults] = useState([])
  const [results, setResults] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [availableFilters, setAvailableFilters] = useState([])

  const handleQuery = ({ query }) => {
    setSearchQuery(query)
    setSearchResults(searchProducts({
      products: catalog,
      query
    }))
    // update filters
  }

  const handleFilter = () => {}


  return (
    <SearchContext.Provider value={{
      query: searchQuery,
      setQuery: handleQuery,
      results,
      activeFilters,
      availableFilters,
      setFilters: handleFilter,
    }}>
      {children}
    </SearchContext.Provider>
  )
}