import { useState, useEffect } from 'react';
import { useProduct } from 'hooks/useProduct';
import { useCart } from 'hooks/useCart';
import { formatPrice } from 'utils/formatPrice';
import { getCartVariant } from 'utils/getCartVariant';
import ProductExpandable from './ProductExpandable';
import { nacelleClient } from 'services';

const ProductForm = ({ content }) => {
  const { product, selectedOptions, setSelectedOptions, selectedVariant } =
    useProduct();
  const [variantAvailabilities, setVariantAvailabilities] = useState(
    product.variants.map((v) => ({
      nacelleEntryId: v.nacelleEntryId,
      availableForSale: v.availableForSale
    }))
  );
  const [variantAvailable, setVariantAvailable] = useState(
    selectedVariant?.availableForSale
  );
  const { checkoutProcessing, addItem } = useCart();

  const options =
    product?.content?.options?.find((option) => {
      return option.values.length > 1;
    }) && product?.content?.options;

  const price = formatPrice({ price: selectedVariant.price });
  const compareAtPrice = formatPrice({ price: selectedVariant.compareAtPrice });

  const features = content?.fields?.features;

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
  useEffect(() => {
    const observable = {
      onNext: (result) => {
        setVariantAvailabilities((prevState) =>
          prevState.map((v) => {
            if (
              v.nacelleEntryId ===
              result.data.variantInventoryUpdated[0].nacelleEntryId
            ) {
              return {
                ...v,
                availableForSale:
                  result.data.variantInventoryUpdated[0].availableForSale
              };
            }
            return v;
          })
        );
      },
      onError: (err) => {
        console.log('errors will be appear here', err);
      },
      complete: () => {
        console.log('complete hit');
      }
    };
    const unsubscribe = nacelleClient.productVariantSubscription(
      observable,
      product.variants.map((v) => v.nacelleEntryId)
    );
    return () => {
      unsubscribe();
    };
  }, [product]);
  useEffect(() => {
    setVariantAvailable(
      variantAvailabilities.find(
        (v) => v.nacelleEntryId === selectedVariant.nacelleEntryId
      ).availableForSale
    );
  }, [selectedVariant, variantAvailabilities]);
  return (
    product && (
      <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          {product.content.title}
        </h1>
        <div className="mt-3">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl text-gray-900">
            {price && (
              <span className={compareAtPrice && 'text-red-600'}>{price}</span>
            )}
            {compareAtPrice && (
              <span className="ml-2 line-through">{compareAtPrice}</span>
            )}
          </p>
        </div>
        {product.content?.description && (
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>

            <div
              className="text-base text-gray-700 space-y-6"
              dangerouslySetInnerHTML={{ __html: product.content.description }}
            ></div>
          </div>
        )}
        <form className="mt-6">
          {options &&
            options.map((option) => (
              <div key={option.name} className="max-w-xs">
                <h3 className="font-medium text-sm text-gray-700">
                  {option.name}
                </h3>
                <fieldset className="mt-2">
                  <legend className="sr-only">Choose a {option.name}</legend>
                  <select
                    className="
                  mt-1
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
                "
                    onChange={(e) => handleOptionChange(e, option)}
                  >
                    {option.values.map((value, vIndex) => (
                      <option key={vIndex}>{value}</option>
                    ))}
                  </select>
                </fieldset>
              </div>
            ))}
          <div className="mt-10 flex">
            <button
              type="button"
              disabled={!variantAvailable || checkoutProcessing}
              className="
              max-w-xs
              flex-1
              bg-indigo-600
              border border-transparent
              rounded-md
              py-3
              px-8
              flex
              items-center
              justify-center
              text-base
              font-medium
              text-white
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-gray-50
              focus:ring-indigo-500
              sm:w-full
              disabled:bg-indigo-600
              disabled:opacity-70
            "
              onClick={handleAddItem}
            >
              {variantAvailable ? (
                <span>Add to bag</span>
              ) : (
                <span>Out of stock</span>
              )}
            </button>
          </div>
        </form>
        <section aria-labelledby="details-heading" className="mt-12">
          <h2 id="details-heading" className="sr-only">
            Additional details
          </h2>

          <div className="border-t divide-y divide-gray-200">
            {features && <ProductExpandable features={features} />}
          </div>
        </section>
      </div>
    )
  );
};

export default ProductForm;
