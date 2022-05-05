import { useContext } from 'react';
import { ProductContext } from 'context/Product';

export const useProduct = () => {
  const {
    product,
    selectedOptions,
    setSelectedOptions,
    selectedVariant,
    setSelectedVariant
  } = useContext(ProductContext);

  return {
    product,
    selectedOptions,
    setSelectedOptions,
    selectedVariant,
    setSelectedVariant
  };
};
