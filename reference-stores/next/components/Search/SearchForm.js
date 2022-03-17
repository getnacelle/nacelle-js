import { useSearch } from 'hooks/useSearch'
import searchIcon from 'assets/svgs/search';

const SearchForm = () => {
  const { 
    query,
    setQuery,
    results
  } = useSearch()

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div
        className="
          border-b border-gray-200
          pb-10
          flex flex-wrap
          items-center
          gap-4
          md:gap-8
        "
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Search
        </h1>
        <div className="w-full md:w-auto">
          <label htmlFor="search-page" className="sr-only">Search</label>
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
              <span className="h-5 w-5 text-gray-400" 
                dangerouslySetInnerHTML={{__html: searchIcon}}
              />
            </div>
            <input
              name="search-page"
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
              placeholder="Search"
              type="search"
              value={query}
              onInput={(e) => setQuery({ query: e.target.value })}
            />
          </div>
        </div>
      </div>
      {/* <div v-if="query" class="py-6"> */}
        {/* <p class="text-lg leading-6">{{ resultsText }}</p> */}
        {/* <div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4"> */}
          {/* <search-filters
            :active-filters="activeFilters"
            :available-filters="availableFilters"
            @change="handleFilterChange"
          />
          <search-results :results="results" /> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  )
}

export default SearchForm;