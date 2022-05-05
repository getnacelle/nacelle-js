import { createContext, useState } from 'react';
import { getSelectedVariant } from 'utils/getSelectedVariant';

export const ProductContext = createContext({});

export const ProductProvider = ({ children, product }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    product.variants[0].content.selectedOptions
  );
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const handleSetSelectedOptions = ({ options }) => {
    setSelectedOptions(options);
    setSelectedVariant(getSelectedVariant({ product, options }));
  };

  const handleSetSelectedVariant = ({ variant }) => {
    setSelectedVariant(variant);
    setSelectedOptions(variant.content.selectedOptions);
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        selectedOptions,
        setSelectedOptions: handleSetSelectedOptions,
        selectedVariant,
        setSelectedVariant: handleSetSelectedVariant
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
