import { inject } from 'vue-demi';

export default function useProductProvider() {
  return {
    product: inject('product'),
    setProduct: inject('setProduct'),
    setSelectedOptions: inject('setSelectedOptions'),
    setSelectedVariant: inject('setSelectedVariant')
  };
}
