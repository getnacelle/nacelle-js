import Link from 'next/link';
import logoIcon from 'assets/svgs/logo';

const HeaderLogo = () => {
  return (
    <div className="absolute flex lg:relative">
      <Link href="/">
        <a>
          <span className="sr-only">Workflow</span>
          <span
            className="flex h-8 w-8"
            dangerouslySetInnerHTML={{ __html: logoIcon }}
          />
        </a>
      </Link>
    </div>
  );
};

export default HeaderLogo;
