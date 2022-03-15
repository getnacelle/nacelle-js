import { useProduct } from 'hooks/useProduct'
import { formatPrice } from 'utils/formatPrice'
import ProductExpandable from './ProductExpandable'

const ProductForm = ({ content }) => {
  const { 
    product,
    selectedOptions,
    setSelectedOptions,
    selectedVariant
  } = useProduct()

  const options = product?.content?.options?.find((option) => {
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
    else options = [...options, newOption]
    setSelectedOptions({ options })
  }

  const handleAddItem = () => {
    console.log('add me up')
  }

  return product && (
    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        {product.content.title}
      </h1>
      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl text-gray-900">
          {price && (
            <span className={compareAtPrice && 'text-red-600'}>
              {price}
            </span>
          )}
          {compareAtPrice && (
            <span className="ml-2 line-through">
              {compareAtPrice}
            </span>
          )}
        </p>
      </div>
      {product.content?.description && (
        <div className="mt-6">
          <h3 className="sr-only">Description</h3>
        
          <div
            className="text-base text-gray-700 space-y-6"
            dangerouslySetInnerHTML={{__html: product.content.description}}
          ></div>
        </div>
      )}
      <form className="mt-6">
        {options && options.map(option => (
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
            disabled={!selectedVariant.availableForSale}
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
            "
            onClick={handleAddItem}
          >
            {selectedVariant.availableForSale 
              ? <span>Add to bag</span>
              : <span>Out of stock</span>
            }
          </button>
        </div>
      </form>
      <section aria-labelledby="details-heading" className="mt-12">
        <h2 id="details-heading" className="sr-only">Additional details</h2>

        <div className="border-t divide-y divide-gray-200">
          {features && <ProductExpandable features={features} />}
        </div>
      </section>
    </div>
  )
}

export default ProductForm