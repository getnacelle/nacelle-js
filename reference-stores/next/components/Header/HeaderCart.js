import { useCart } from 'hooks/useCart';
import cartIcon from 'assets/svgs/cart';

const HeaderCart = () => {
  const { cartVisible, setCartVisible, cartCount } = useCart();

  return (
    <button
      type="button"
      className="
        ml-0
        md:ml-2
        lg:ml-4
        bg-white
        p-2
        rounded-md
        text-gray-400
        p-2
        flex
        items-center
      "
      onClick={() => setCartVisible(!cartVisible)}
    >
      <span
        className="flex-shrink-0 h-6 w-6 text-gray-400"
        dangerouslySetInnerHTML={{ __html: cartIcon }}
      />
      <span className="ml-2 text-sm font-medium text-gray-700">
        {cartCount}
      </span>
      <span className="sr-only">items in cart, view bag</span>
    </button>
  );
};

export default HeaderCart;
