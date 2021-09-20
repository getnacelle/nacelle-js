import { inject } from '@vue/composition-api';

export default function useCollectionProvider() {
  return {
    collection: inject('collection'),
    isFetching: inject('isFetching'),
    setCollection: inject('setCollection'),
    loadProducts: inject('loadProducts')
  };
}
