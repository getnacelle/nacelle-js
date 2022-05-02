import { useState } from 'react';
import { useSearch } from 'hooks/useSearch';
import plusIcon from 'assets/svgs/plus';
import SearchFiltersDrawer from './SearchFiltersDrawer';

const SearchFilters = () => {
  const [showFilterDrawer, setShowFilterDrawer] = useState();

  const { activeFilters, availableFilters, toggleFilter, setFilters } =
    useSearch();

  const activeFilter = ({ filter }) => {
    return activeFilters.find(
      ({ type, name, value }) =>
        type === filter.type && name === filter.name && value === filter.value
    );
  };

  return (
    <div>
      <h2 className="sr-only">Filters</h2>
      <SearchFiltersDrawer
        show={showFilterDrawer}
        setShow={setShowFilterDrawer}
      />
      <button
        type="button"
        className="inline-flex items-center lg:hidden"
        onClick={() => setShowFilterDrawer(true)}
      >
        <span className="text-sm font-medium text-gray-700">Filters</span>
        <span
          className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
          dangerouslySetInnerHTML={{ __html: plusIcon }}
        />
      </button>
      <form className="hidden lg:block divide-y divide-gray-200 space-y-10">
        {availableFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${filter.name}`}
            className={index > 0 ? 'pt-10' : undefined}
          >
            <fieldset>
              <legend className="block text-sm font-medium text-gray-900">
                {filter.name}
              </legend>
              {filter.values.map((value) => (
                <div key={value} className="pt-6 space-y-3">
                  <div className="flex items-center">
                    <input
                      id={`${filter.type}-${filter.name}-${value}`}
                      value={value}
                      type="checkbox"
                      className="
                        h-4
                        w-4
                        border-gray-300
                        rounded
                        text-indigo-600
                        focus:ring-indigo-500
                      "
                      checked={activeFilter({ filter: { ...filter, value } })}
                      onClick={() =>
                        toggleFilter({ filter: { ...filter, value } })
                      }
                    />
                    <label
                      htmlFor={`${filter.type}-${filter.name}-${value}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {value}
                    </label>
                  </div>
                </div>
              ))}
            </fieldset>
          </div>
        ))}
        {activeFilters.length > 0 && (
          <button
            className="
              inline-flex
              items-center
              px-3
              py-2
              border border-gray-300
              shadow-sm
              text-sm
              leading-4
              font-medium
              rounded-md
              text-gray-700
              bg-white
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
              mt-10
            "
            onClick={() => setFilters({ filters: [] })}
          >
            Clear Filters
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchFilters;
