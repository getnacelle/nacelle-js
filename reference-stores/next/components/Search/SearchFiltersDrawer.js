import { useSearch } from 'hooks/useSearch'

const SearchFiltersDrawer = ({ show, setShow }) => {

  const { 
    activeFilters,
    availableFilters,
    toggleFilter,
    setFilters
  } = useSearch()
  
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
          ${show ? 'opacity-1' : 'opacity-0'}`
        }
        aria-hidden="true"
        onClick={() => setShow(false)}
      >
      </div>
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
              {/* <span class="h-6 w-6" v-html="closeIcon" /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFiltersDrawer