import React, { useState } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useProduct } from 'hooks/useProduct';
import { useCart } from 'hooks/useCart';
import { formatPrice } from 'utils/formatPrice';
import { getCartVariant } from 'utils/getCartVariant';

const ProductCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { checkoutProcessing, addItem } = useCart();
  const { product, selectedOptions, setSelectedOptions, selectedVariant } =
    useProduct();

  const options =
    product?.content?.options?.find((option) => {
      return option.values.length > 1;
    }) && product?.content?.options;

  const price = formatPrice({ price: selectedVariant.price });
  const compareAtPrice = formatPrice({ price: selectedVariant.compareAtPrice });

  const handleHover = (val) => setIsHovered(val);

  const handleOptionChange = (e, option) => {
    let options = [...selectedOptions];
    const newOption = { name: option.name, value: e.target.value };
    const optionIndex = options.findIndex((selectedOption) => {
      return selectedOption.name === newOption.name;
    });
    if (optionIndex > -1) options[optionIndex] = newOption;
    else options = [...options, newOption];
    setSelectedOptions({ options });
  };

  const handleAddItem = () => {
    addItem({
      ...getCartVariant({
        product: product,
        variant: selectedVariant
      }),
      quantity: 1
    });
  };

  return (
    product && (
      <div
        className="cursor-pointer"
        tabIndex="0"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onFocus={() => handleHover(true)}
        onBlur={() => handleHover(true)}
      >
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <Link
              to={`/products/${product.content.handle}`}
              className="absolute flex w-full h-full text-base text-gray-500 hover:text-gray-900 hover:opacity-75 focus:opacity-75"
            >
              <span className="sr-only">{product.content.title}</span>
              <GatsbyImage
                image={getImage(product.content.featuredMedia.remoteImage.childImageSharp)}
                alt={product.content.featuredMedia.altText}
                quality={80}
                fit="cover"
              />
            </Link>
          </div>
        </div>
        {isHovered && (
          <div>
            {options?.map((option) => (
              <div key={option.name}>
                <select
                  className="
                  block
                  w-full
                  pl-3
                  pr-10
                  py-2
                  text-base
                  border-gray-300
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                  sm:text-sm
                  rounded-md
                  mt-3
                "
                  onChange={(e) => handleOptionChange(e, option)}
                >
                  {option.values.map((value, vIndex) => (
                    <option key={vIndex} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button
              type="button"
              disabled={!selectedVariant.availableForSale || checkoutProcessing}
              className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200 w-full mt-3"
              onClick={handleAddItem}
            >
              {selectedVariant.availableForSale ? (
                <div>Add to Cart</div>
              ) : (
                <div>Out of Stock</div>
              )}
            </button>
          </div>
        )}
        {!isHovered && (
          <div>
            <h3 className="mt-4 text-sm text-gray-700">
              {product.content.title}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {price && (
                <span className={compareAtPrice && 'text-red-600'}>
                  {price}
                </span>
              )}
              {compareAtPrice && (
                <span className="ml-2 line-through">{compareAtPrice}</span>
              )}
            </p>
          </div>
        )}
      </div>
    )
  );
};

export default ProductCard;
