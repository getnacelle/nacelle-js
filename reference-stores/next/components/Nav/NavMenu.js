import Link from 'next/link';

const NavMenu = ({ content }) => {
  const links = content?.navigation?.filter((navigationItem) => {
    return navigationItem.type === 'partNavigationLink';
  });

  return (
    links && (
      <div className="border-t border-gray-200 py-6 px-4 space-y-6">
        {links.map((link, index) => (
          <div className="flow-root" key={index}>
            <Link href={link.fields.url}>
              <a className="-m-2 p-2 block font-medium text-gray-900">
                {link.fields.text}
              </a>
            </Link>
          </div>
        ))}
      </div>
    )
  );
};

export default NavMenu;
