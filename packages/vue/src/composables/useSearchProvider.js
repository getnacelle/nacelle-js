import { inject } from '@vue/composition-api';

export default function useSearchProvider() {
  return {
    search: inject('search'),
    setSearchOptions: inject('setSearchOptions'),
    results: inject('results')
  };
}
