import { useRouter } from 'next/router'
import { useSearch } from 'hooks/useSearch'
import SearchAutocompleteItem from './SearchAutocompleteItem'

const SearchAutocomplete = ({ show }) => {
  const router = useRouter()
  const {
    query,
    results
  } = useSearch()

  const handleSearchAll = () => {
    router.push(`/search?q=${query}`)
  }

  return (
    <div
      className={`
        absolute md:right-0 md:w-96 md:top-10 bg-white overflow-hidden shadow rounded-lg
        ${show 
          ? 'z-50'
          : '-z-10'
        }
      `}
    >
      <div className="px-4 py-5 sm:p-6">
        <h2
          className="text-center text-2xl font-extrabold tracking-tight text-gray-900"
        >
          Search Results
        </h2>
        {results.length > 0 && (
          <div>
            {results.slice(0, 3).map((item => (
              <div key={item.nacelleEntryId}>
                <SearchAutocompleteItem item={item} />
              </div>
            )))}
            <button
              type="button"
              className="w-full text-center inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => handleSearchAll}
            >
              Search All
            </button>
          </div>
        )}
        {results.length < 1 && (
          <div className="text-center p-5">
            <p>No results...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchAutocomplete