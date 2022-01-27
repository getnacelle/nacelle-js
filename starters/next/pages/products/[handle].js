import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@nacelle/react-hooks';
import { nacelleClient } from 'services';
import { getSelectedVariant } from 'utils/getSelectedVariant';
import { getCartVariant } from 'utils/getCartVariant';
import styles from 'styles/Product.module.css';

function Product({ product }) {
  const [, { addToCart }] = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedOptions, setSelectedOptions] = useState(
    selectedVariant.content.selectedOptions
  );
  const [quantity, setQuantity] = useState(1);

  let options = null;
  if (product?.content?.options?.some((option) => option.values.length > 1)) {
    options = product?.content?.options;
  }

  const buttonText = selectedVariant
    ? selectedVariant.availableForSale
      ? 'Add To Cart'
      : 'Sold Out'
    : 'Select Option';

  const handleOptionChange = (event, option) => {
    const newOption = { name: option.name, value: event.target.value };
    const optionIndex = selectedOptions.findIndex((selectedOption) => {
      return selectedOption.name === newOption.name;
    });

    const newSelectedOptions = [...selectedOptions];
    if (optionIndex > -1) {
      newSelectedOptions.splice(optionIndex, 1, newOption);
      setSelectedOptions([...newSelectedOptions]);
    } else {
      setSelectedOptions([...newSelectedOptions, newOption]);
    }
    const variant = getSelectedVariant({
      product,
      options: newSelectedOptions
    });
    setSelectedVariant(variant ? { ...variant } : null);
  };

  const handleQuantityChange = (event) => {
    setQuantity(+event.target.value);
  };

  // Get product data and add it to the cart by using `addToCart`
  // from the `useCart` hook provided by `@nacelle/react-hooks`.
  // (https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks)
  const handleAddItem = () => {
    const variant = getCartVariant({
      product,
      variant: selectedVariant
    });
    addToCart({
      variant,
      quantity
    });
  };

  return (
    product && (
      <div className={styles.product}>
        <div className={styles.media}>
          <Image
            src={product.content.featuredMedia.src}
            alt={product.content.featuredMedia.altText}
            width={530}
            height={350}
            className={styles.image}
          />
        </div>
        <div className={styles.main}>
          {product.content.title && <h1>{product.content.title}</h1>}
          <div className={styles.prices}>
            {selectedVariant.compareAtPrice && (
              <div className={styles.compare}>
                ${selectedVariant.compareAtPrice}
              </div>
            )}
            <div>${selectedVariant.price}</div>
          </div>
          {options &&
            options.map((option, oIndex) => (
              <div key={oIndex}>
                <label htmlFor={`select-${oIndex}-${product.id}`}>
                  {option.name}
                </label>
                <select
                  id={`select-${oIndex}-${product.id}`}
                  onChange={($event) => handleOptionChange($event, option)}
                >
                  {option.values.map((value, vIndex) => (
                    <option key={vIndex} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          {product.content.description && (
            <div
              dangerouslySetInnerHTML={{ __html: product.content.description }}
            />
          )}
          <div>
            <label htmlFor={`quantity-${product.nacelleEntryId}`}>
              Quantity:
            </label>
            <input
              id={`quantity-${product.nacelleEntryId}`}
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <button type="button" onClick={handleAddItem}>
            {buttonText}
          </button>
        </div>
      </div>
    )
  );
}

export default Product;

export async function getStaticPaths() {
  // Performs a GraphQL query to Nacelle to get product handles.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const results = await nacelleClient.query({
    query: HANDLES_QUERY
  });
  const handles = results.products
    .filter((product) => product.content?.handle)
    .map((product) => ({ params: { handle: product.content.handle } }));

  return {
    paths: handles,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // Performs a GraphQL query to Nacelle to get product data,
  // using the handle of the current page.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const { products } = await nacelleClient.query({
    query: PAGE_QUERY,
    variables: { handle: params.handle }
  });

  if (!products.length) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product: products[0]
    }
  };
}

// GraphQL query for the handles of products. Used in `getStaticPaths`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const HANDLES_QUERY = `
  {
    products {
      content {
        handle
      }
    }
  }
`;

// GraphQL query for product content. Used in `getStaticProps`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PAGE_QUERY = `
  query ProductPage($handle: String!){
    products(filter: { handles: [$handle] }){
      nacelleEntryId
      sourceEntryId
      content{
        handle
        title
        description
        options{
          name
          values
        }
        featuredMedia{
          src
          thumbnailSrc
          altText
        }
			}
      variants{
        nacelleEntryId
        sourceEntryId
        sku
        availableForSale
        price
        compareAtPrice
        content{
          title
          selectedOptions{
            name
            value
          }
          featuredMedia{
            src
            thumbnailSrc
            altText
          }
        }
      }
    }
  }
`;
