import HeaderMenu from './HeaderMenu'
import HeaderLogo from './HeaderLogo'
import SearchInput from 'components/Search/SearchInput'
import HeaderCart from './HeaderCart'

const Header = ({ content }) => {
  return !content && (
    <header className="relative bg-white border-b border-gray-200">
      <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-around">
          <HeaderMenu />
          <HeaderLogo />
          <div className="ml-auto flex items-center">
            <div className="ml-auto flex items-center">
              <div className="hidden lg:block">
                <SearchInput />
               </div>
              <HeaderCart />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header