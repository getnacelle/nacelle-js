import { useState } from 'react';
import { useSearch } from 'hooks/useSearch';
import closeIcon from 'assets/svgs/close';
import chevronIcon from 'assets/svgs/chevron';

const SearchFiltersDrawer = ({ show, setShow }) => {
  const [expandedFilters, setExpandedFilters] = useState([]);

  const { activeFilters, availableFilters, toggleFilter, setFilters } =
    useSearch();

  const handleClick = (index) => {
    const itemIndex = expandedFilters.findIndex((expandedIndex) => {
      return index === expandedIndex;
    });
    if (itemIndex > -1) {
      setExpandedFilters(
        expandedFilters.filter((_, index) => {
          return itemIndex !== index;
        })
      );
    } else {
      setExpandedFilters([...expandedFilters, index]);
    }
  };

  const activeFilter = ({ filter }) => {
    return activeFilters.find(
      ({ type, name, value }) =>
        type === filter.type && name === filter.name && value === filter.value
    );
  };

  return (
    <div className={`relative flex ${show ? 'z-40' : '-z-10'}`}>
      <div
        className={`
          fixed
          inset-0
          bg-gray-500 bg-opacity-75
          transition-opacity
          ease-in-out
          duration-500
          ${show ? 'opacity-1' : 'opacity-0'}`}
        aria-hidden="true"
        onClick={() => setShow(false)}
      ></div>
      <div
        className="
          fixed
          inset-y-0
          right-0
          pl-10
          w-80
          min-w-max
          flex
          transform
          transition
          ease-in-out
          duration-500
        "
        role="dialog"
        aria-modal="true"
      ></div>
      <div
        className={`
          z-40
          fixed
          inset-y-0
          right-0
          pl-10
          w-80
          min-w-max
          flex
          transition-transform
          ease-in-out
          duration-500
          ${show ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="
            ml-auto
            relative
            max-w-xs
            w-full
            h-full
            bg-white
            shadow-xl
            py-4
            pb-6
            flex flex-col
            overflow-y-auto
          "
        >
          <div className="px-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              className="
                -mr-2
                w-10
                h-10
                p-2
                flex
                items-center
                justify-center
                text-gray-400
                hover:text-gray-500
              "
              onClick={() => setShow(false)}
            >
              <span className="sr-only">Close menu</span>
              <span
                className="h-6 w-6"
                dangerouslySetInnerHTML={{ __html: closeIcon }}
              />
            </button>
          </div>
          <form className="mt-4">
            {availableFilters.map((filter, index) => (
              <div
                key={`${filter.type}-${filter.name}`}
                className="border-t border-gray-200 pt-4 pb-4"
              >
                <fieldset>
                  <button
                    type="button"
                    className="
                    w-full
                    p-2
                    flex
                    items-center
                    justify-between
                    text-gray-400
                    hover:text-gray-500
                  "
                    aria-controls={`${filter.type}-${filter.name}`}
                    aria-expanded="false"
                    onClick={() => handleClick(index)}
                  >
                    <span className="text-sm font-medium text-gray-900">
                      {filter.name}
                    </span>
                    <span className="ml-6 h-7 flex items-center">
                      <span
                        className="rotate-0 h-5 w-5 transform"
                        dangerouslySetInnerHTML={{ __html: chevronIcon }}
                      />
                    </span>
                  </button>
                  <div
                    className={
                      !expandedFilters.includes(index) ? 'hidden' : null
                    }
                  >
                    {filter.values.map((value) => (
                      <div key={value} className="pt-2 px-2 space-y-3">
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
                              cursor-pointer
                            "
                            checked={
                              activeFilter({
                                filter: { ...filter, value }
                              }) || false
                            }
                            onChange={() =>
                              toggleFilter({ filter: { ...filter, value } })
                            }
                          />
                          <label
                            htmlFor={`${filter.type}-${filter.name}-${value}`}
                            className="grow pl-3 text-sm text-gray-600 cursor-pointer"
                          >
                            {value}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
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
                      mx-3
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
      </div>
    </div>
  );
};

export default SearchFiltersDrawer;
