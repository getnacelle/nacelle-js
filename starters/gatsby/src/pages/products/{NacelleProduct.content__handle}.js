import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useCart } from '../../hooks/useCart';
import { getSelectedVariant } from '../../utils/getSelectedVariant';
import { getCartVariant } from '../../utils/getCartVariant';
import * as styles from '../../styles/Product.module.css';

export default function Product({ data }) {
  const product = data.nacelleProduct;
  const { addItem } = useCart();
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

  const handleAddItem = () => {
    const variant = getCartVariant({
      product,
      variant: selectedVariant
    });
    if (variant) {
      addItem({
        variant,
        quantity
      });
    }
  };

  return (
    product && (
      <div className={styles.product}>
        <div className={styles.media}>
          <GatsbyImage
            image={getImage(product.content.featuredMedia.remoteImage)}
            alt={product.content.featuredMedia.altText}
            width={530}
            height={350}
            objectFit="contain"
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
            <p>{stripHtml(product.content.description)}</p>
          )}
          <div>
            <label htmlFor={`quantity-${product.nacelleEntryId}`}>
              Quantity:
            </label>
            <input
              id={`quantity-${product.nacelleEntryId}`}
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <button
            type="button"
            disabled={!selectedVariant.availableForSale}
            onClick={handleAddItem}
          >
            {buttonText}
          </button>
          <Link to="/cart">
            <a>View Cart</a>
          </Link>
        </div>
      </div>
    )
  );
}

function stripHtml(str) {
  return str && str.replace(/(<([^>]+)>)/gi, '');
}

export const query = graphql`
  query ProductQuery($id: String!) {
    nacelleProduct(id: { eq: $id }) {
      nacelleEntryId
      content {
        handle
        title
        locale
        featuredMedia {
          remoteImage {
            childImageSharp {
              gatsbyImageData(width: 800, placeholder: TRACED_SVG)
            }
          }
          src
          altText
        }
        options {
          name
          values
        }
      }
      metafields {
        key
        namespace
        value
      }
      variants {
        nacelleEntryId
        sourceEntryId
        availableForSale
        compareAtPrice
        price
        priceCurrency
        metafields {
          key
          namespace
          value
        }
        sku
        content {
          swatchSrc
          title
          sourceEntryId
          featuredMedia {
            src
            thumbnailSrc
            altText
            remoteImage {
              childImageSharp {
                gatsbyImageData(width: 800, placeholder: TRACED_SVG)
              }
            }
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;
