import { sortProducts } from '../utils/refinement';

export default onmessage = function (e) {
  self.postMessage(
    sortProducts({
      filteredData: e.data.filteredData,
      activePriceRange: e.data.activePriceRange,
      sortBy: e.data.sortBy
    })
  );
};
