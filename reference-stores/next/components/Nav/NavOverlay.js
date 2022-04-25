import { CSSTransition } from 'react-transition-group';
import { useUi } from 'hooks/useUi';

const NavOverlay = () => {
  const { navVisible, setNavVisible } = useUi();

  return (
    <CSSTransition in={navVisible} timeout={0} classNames="fade">
      <div
        className="fixed inset-0 bg-black bg-opacity-25 CSSTransition-opacity ease-linear duration-300"
        aria-hidden="true"
        onClick={() => setNavVisible(false)}
      >
        <style jsx>{`
          .fade-enter-active,
          .fade-exit-active {
            opacity: 1;
          }
          .fade-enter,
          .fade-exit {
            opacity: 0;
          }
        `}</style>
      </div>
    </CSSTransition>
  );
};

export default NavOverlay;
