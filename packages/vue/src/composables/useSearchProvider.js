import { inject } from 'vue';

export default function useSearchProvider() {
  return {
    search: inject('search'),
    setSearchOptions: inject('setSearchOptions'),
    results: inject('results')
  };
}
