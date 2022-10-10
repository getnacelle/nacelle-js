import { CSSTransition } from 'react-transition-group';
import { useUi } from 'hooks/useUi';
import closeIcon from 'assets/svgs/close';
import SearchInput from 'components/Search/SearchInput';
import NavTabs from './NavTabs';
import NavMenu from './NavMenu';
import styles from './NavDrawer.module.css';

const NavDrawer = ({ content }) => {
  const { navVisible, setNavVisible } = useUi();

  const primaryContent = {
    navigation: content?.navigation
  };

  const searchContent = {
    placeholder: content?.searchPlaceholder,
    heading: content?.searchHeading,
    all: content?.searchAll,
    empty: content?.searchEmpty
  };

  return (
    content && (
      <CSSTransition
        in={navVisible}
        timeout={0}
        classNames={{
          enterActive: styles.enterActive,
          exitActive: styles.exitActive,
          enter: styles.enter,
          exit: styles.exit
        }}
      >
        <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto transition-transform ease-in-out duration-300">
          <div className="px-4 pt-5 pb-2 flex">
            <button
              type="button"
              className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
              onClick={() => setNavVisible(false)}
            >
              <span className="sr-only">Close menu</span>
              <span
                className="flex h-6 w-6 text-gray-400"
                dangerouslySetInnerHTML={{ __html: closeIcon }}
              />
            </button>
          </div>
          <SearchInput content={searchContent} />
          <NavTabs content={primaryContent} />
          <NavMenu content={primaryContent} />
        </div>
      </CSSTransition>
    )
  );
};

export default NavDrawer;
