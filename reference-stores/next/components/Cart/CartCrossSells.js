import Image from 'next/image';
import Link from 'next/link';
import { useCart } from 'hooks/useCart';
import { formatPrice } from 'utils/formatPrice';
import { getCartVariant } from 'utils/getCartVariant';

const CartCrossSells = ({ content }) => {
  const { lineItems, checkoutProcessing, addItem } = useCart();

  const crossSellItems = content?.items
    ?.filter((item) => {
      return (
        item.availableForSale &&
        !lineItems.some((cartItem) => {
          return cartItem.productHandle === item.content.handle;
        })
      );
    })
    .map((item) => ({
      ...item,
      image: item.content.featuredMedia,
      price: formatPrice({ price: item.variants[0].price })
    }))
    .slice(0, 3);

  const hasCrossSells = crossSellItems.length > 0;

  const handleAdd = (item) => {
    addItem({
      ...getCartVariant({
        product: item,
        variant: item.variants[0]
      }),
      quantity: 1
    });
  };

  return (
    content &&
    hasCrossSells && (
      <div className="mt-12">
        {content.heading && (
          <h2 className="text-lg font-medium text-gray-900">
            {content.heading}
          </h2>
        )}
        <ul>
          {crossSellItems.map((crossSell) => (
            <li key={crossSell.nacelleEntryId} className="py-6 flex">
              <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <Image
                  src={crossSell.image.src}
                  alt={crossSell.image.allText}
                  quality={80}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="ml-4 flex-1 flex flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <Link href={`/products/${crossSell.content.handle}`}>
                        {crossSell.content.title}
                      </Link>
                    </h3>
                    <p className="ml-4">
                      <span>{crossSell.price}</span>
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex items-end text-sm">
                  <div className="flex w-full">
                    <button
                      type="button"
                      className="
                        relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200 w-full
                      "
                      disabled={checkoutProcessing}
                      onClick={() => handleAdd(crossSell)}
                    >
                      {content.add}
                      <span className="sr-only">
                        , {crossSell.content.title}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default CartCrossSells;
