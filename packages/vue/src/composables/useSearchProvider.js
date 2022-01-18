import { inject } from 'vue-demi';

export default function useSearchProvider() {
  return {
    search: inject('search'),
    setSearchOptions: inject('setSearchOptions'),
    results: inject('results')
  };
}
