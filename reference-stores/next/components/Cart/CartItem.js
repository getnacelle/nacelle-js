import Image from 'next/image';
import Link from 'next/link';
import { useCart } from 'hooks/useCart';
import { formatPrice } from 'utils/formatPrice';

const CartItem = ({ item, content }) => {
  const { checkoutProcessing, removeItem } = useCart();

  const price = formatPrice({ price: item.price });

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    item &&
    content && (
      <li className="py-6 flex">
        <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
          <Image
            src={item.featuredMedia.src}
            alt={item.featuredMedia.altText}
            quality={80}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="ml-4 flex-1 flex flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link href={`/products/${item.productHandle}`}>
                  {item.productTitle}
                </Link>
              </h3>
              <p className="ml-4">{price && <span>{price}</span>}</p>
            </div>
            {item.variantTitle &&
              item.variantTitle.toLowerCase() !== 'default title' && (
                <p className="mt-1 text-sm text-gray-500">
                  {item.variantTitle}
                </p>
              )}
          </div>
          <div className="flex-1 flex items-end justify-between text-sm">
            <p className="text-gray-500">
              {content.itemQuantity} {item.quantity}
            </p>
            <div className="flex">
              <button
                type="button"
                disabled={checkoutProcessing}
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={handleRemove}
              >
                {content.itemRemove}
              </button>
            </div>
          </div>
        </div>
      </li>
    )
  );
};

export default CartItem;
