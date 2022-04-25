import { useUi } from 'hooks/useUi';
import NavOverlay from './NavOverlay';
import NavDrawer from './NavDrawer';

const Nav = ({ content }) => {
  const { navVisible } = useUi();

  return (
    content && (
      <div className="bg-white">
        <div
          className={`fixed inset-0 flex z-40 lg:hidden ${
            !navVisible && 'hidden'
          }`}
          role="dialog"
          aria-modal="true"
        >
          <NavOverlay />
          <NavDrawer content={content.fields} />
        </div>
      </div>
    )
  );
};

export default Nav;
