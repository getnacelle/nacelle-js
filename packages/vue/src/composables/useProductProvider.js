import { inject } from '@vue/composition-api';

export default function useProductProvider() {
  return {
    product: inject('product'),
    isFetching: inject('isFetching'),
    setProduct: inject('setProduct'),
    setSelectedOptions: inject('setSelectedOptions'),
    setSelectedVariant: inject('setSelectedVariant')
  };
}
