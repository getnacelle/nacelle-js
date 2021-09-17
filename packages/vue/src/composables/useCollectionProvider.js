import { inject } from '@vue/composition-api';

export default function useCollectionProvider() {
  const collection = inject('collection');
  const isFetching = inject('isFetching');
  const setCollection = inject('setCollection');
  const loadProducts = inject('loadProducts');

  return {
    collection,
    isFetching,
    setCollection,
    loadProducts
  };
}
