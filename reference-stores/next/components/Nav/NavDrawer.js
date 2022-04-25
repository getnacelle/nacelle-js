import { CSSTransition } from 'react-transition-group';
import { useUi } from 'hooks/useUi';
import closeIcon from 'assets/svgs/close';
import NavMenu from './NavMenu';

const NavDrawer = ({ content }) => {
  const { navVisible, setNavVisible } = useUi();

  const primaryContent = {
    navigation: content?.navigation
  };

  const searchContent = {
    placeholder: content?.searchPlaceholder,
    heading: content?.searchHeading,
    all: content?.searchAll
  };

  return (
    content && (
      <CSSTransition in={navVisible} timeout={0} classNames="slide">
        <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto transition ease-in-out duration-300 transform">
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
          <NavMenu content={primaryContent} />
          <style jsx>{`
            .slide-enter-active,
            .slide-exit-active {
              transform: translateX(0%);
            }
            .slide-enter,
            .slide-exit {
              transform: translateX(-100%);
            }
          `}</style>
        </div>
      </CSSTransition>
    )
  );
};

export default NavDrawer;
