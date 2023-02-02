import { inject } from 'vue';

export default function useCollectionProvider() {
  return {
    collection: inject('collection'),
    isFetching: inject('isFetching'),
    setCollection: inject('setCollection'),
    loadProducts: inject('loadProducts')
  };
}
