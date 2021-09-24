import { inject } from '@vue/composition-api';

export default function useRefinementProvider() {
  return {
    filters: inject('filters'),
    setupFilters: inject('setupFilters'),
    activeFilters: inject('activeFilters'),
    toggleActiveFilter: inject('toggleActiveFilter'),
    setActivePriceRange: inject('setActivePriceRange'),
    setSortBy: inject('setSortBy'),
    filteredData: inject('filteredData'),
    clearFilters: inject('clearFilters')
  };
}
