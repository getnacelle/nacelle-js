import { inject } from '@vue/composition-api';

export default function useSearchProvider() {
  const search = inject('search');
  const setSearchOptions = inject('setSearchOptions');
  const results = inject('results');

  return {
    search,
    setSearchOptions,
    results
  };
}
