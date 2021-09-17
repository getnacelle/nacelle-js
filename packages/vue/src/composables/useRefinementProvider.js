import { inject } from '@vue/composition-api';

export default function useRefinementProvider() {
  return {
    filters: inject('filters'),
    setupFilters: inject('setupFilters'),
    activeFilters: inject('activeFilters'),
    filteredData: inject('filteredData'),
    clearFilters: inject('clearFilters')
  };
}
