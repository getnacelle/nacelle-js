import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import { useSearch } from 'hooks/useSearch';
import SearchAutocompleteItem from './SearchAutocompleteItem';
import styles from './SearchAutocomplete.module.css';

const SearchAutocomplete = ({ content, show }) => {
  const router = useRouter();
  const { query, results } = useSearch();

  const handleSearchAll = () => {
    router.push(`/search?q=${query}`);
  };

  return (
    content && (
      <CSSTransition
        in={show}
        timeout={0}
        classNames={{
          enterActive: styles.enterActive,
          exitActive: styles.exitActive,
          enter: styles.enter,
          exit: styles.exit,
          enterDone: styles.enterDone
        }}
      >
        <div
          className={`
          w-full absolute md:right-0 md:w-96 md:top-10 bg-white overflow-hidden shadow rounded-lg
          ${show ? 'z-50' : '-z-10 hidden'}
        `}
        >
          <div className="px-4 py-5 sm:p-6">
            {content.heading && (
              <h2 className="text-center text-2xl font-extrabold tracking-tight text-gray-900">
                {content.heading}
              </h2>
            )}
            {results.length > 0 && (
              <div>
                {results.slice(0, 3).map((item) => (
                  <div key={item.nacelleEntryId}>
                    <SearchAutocompleteItem item={item} />
                  </div>
                ))}
                {content.all && (
                  <button
                    type="button"
                    className="w-full text-center inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSearchAll}
                  >
                    {content.all}
                  </button>
                )}
              </div>
            )}
            {results.length < 1 && (
              <div className="text-center p-5">
                {content.empty && <p>{content.empty}</p>}
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
    )
  );
};

export default SearchAutocomplete;
