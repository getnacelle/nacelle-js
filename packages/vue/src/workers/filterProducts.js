import { filterProducts } from '../utils/refinement';

export default onmessage = function (e) {
  self.postMessage(
    filterProducts({
      inputData: e.data.inputData,
      activeFilters: e.data.activeFilters
    })
  );
};
