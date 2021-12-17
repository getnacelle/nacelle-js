import {
  h,
  ref,
  watch,
  computed,
  provide,
  onUnmounted
} from '@vue/composition-api';
import SortWorker from '../workers/sortProducts?worker';
import FilterWorker from '../workers/filterProducts?worker';

export default {
  name: 'FilterProvider',
  props: {
    inputData: {
      type: Array,
      required: true
    },
    /**
     * { field: string, label: string }[]
     */
    propertyFilters: {
      type: Array,
      required: true
    }
  },
  setup(props, context) {
    const filters = ref([]);
    const filterWorker = ref(null);
    const sortWorker = ref(null);
    const filteredData = ref(props.inputData);
    const activeFilters = ref([]);
    const activePriceRange = ref(null);
    const sortBy = ref(null);

    /**
     Computed properties
     */
    const inputData = computed(() =>
      props.inputData.map((item) => transformProductData(item))
    );

    /**
     * Transform Product Data
     */
    const transformProductData = (product) => {
      const { tags, variants, productType, ...rest } = product;

      // Get product filter facets from variant data
      const variantOptions = variants.map(
        (variant) => variant.content.selectedOptions
      );

      const variantFacets = variantOptions
        .reduce((acc, item) => {
          return acc.concat(item);
        }, [])
        .map((option) => JSON.stringify(option));

      const facets = Array.from(new Set(variantFacets))
        .map((option) => JSON.parse(option))
        .map((option) => ({
          name: option.name.toLowerCase(),
          value: option.value
        }));

      // Get product filter facets from tags. Tags should be formatted "filter_property-name_value"
      const rootFacets = tags.filter((tag) => tag.includes('filter'));

      rootFacets.forEach((facet) => {
        const facetFragments = facet.split('_');
        const facetName = facetFragments[1];
        const facetValue = facetFragments[2] || true;

        rest[facetName] = facetValue;
        facets.push({ name: facetName, value: facetValue });
      });

      if (productType) {
        facets.push({ name: 'productType', value: productType });
      }

      // cast priceRange values as numbers
      rest.priceRange.min = Number(rest.priceRange.min);
      rest.priceRange.max = Number(rest.priceRange.max);
      rest.minPrice = rest.priceRange.min;

      return { ...rest, productType, tags, variants, facets };
    };

    /**
     Uses `sortBy` & `activePriceRange` to sort data
     */
    const sortInputData = () => {
      if (!sortWorker.value) {
        sortWorker.value = new SortWorker();
      }
      sortWorker.value.postMessage({
        filteredData: filteredData.value,
        activePriceRange: activePriceRange.value,
        sortBy: sortBy.value
      });
      sortWorker.value.onmessage = function (e) {
        filteredData.value = e.data;
      };
    };

    /**
     Uses `activeFilters` to filter data
     */
    const filterData = () => {
      if (!filterWorker.value) {
        filterWorker.value = new FilterWorker();
      }
      filterWorker.value.postMessage({
        activeFilters: activeFilters.value,
        inputData: inputData.value
      });
      filterWorker.value.onmessage = function (e) {
        filteredData.value = e.data;
        sortInputData();
      };
    };

    /**
     Uses input data to find filters
     */
    const setupFilters = () => {
      if (inputData.value && props.propertyFilters) {
        filters.value = inputData.value
          .reduce((output, item) => {
            if (!item.facets) {
              console.warn(
                `No facets have been generated for this item: ${
                  item.handle || item
                }`
              );
            } else {
              item.facets
                .filter((facet) => facet.name.toLowerCase() !== 'title')
                .forEach((facet) => {
                  const index = output.findIndex(
                    (arrayItem) => facet.name === arrayItem.property
                  );

                  if (index === -1) {
                    output.push({
                      property: facet.name,
                      values: [facet.value]
                    });
                  } else {
                    output[index].values.push(facet.value);
                  }
                });
            }

            return output;
          }, [])
          .map((facet) => ({
            property: facet.property,
            values: Array.from(new Set(facet.values))
          }))
          .filter((facet) =>
            props.propertyFilters.find(
              (filter) => filter.field === facet.property
            )
          )
          .map((facet) => {
            const index = props.propertyFilters.findIndex(
              (filter) => filter.field === facet.property
            );

            return {
              property: {
                field: facet.property,
                label: props.propertyFilters[index].label
              },
              values: facet.values
            };
          });
      }
    };

    /**
     Clears filters
     */
    const clearFilters = () => {
      activeFilters.value = [];
      activePriceRange.value = null;
      sortBy.value = null;
      filterData();
    };

    /**
     * Set active filters
     * @param {Object} {property: string, value: string }
     * @returns {null}
     */
    const toggleActiveFilter = ({ property, value }) => {
      const hasProperty = activeFilters.value.some(
        (activeFilter) => activeFilter.property === property
      );
      if (hasProperty) {
        activeFilters.value = activeFilters.value
          .map((activeFilter) => {
            if (activeFilter.property === property) {
              const index = activeFilter.values.findIndex(
                (index) => index === value
              );

              if (index >= 0) {
                activeFilter.values.splice(index, 1);
              } else {
                activeFilter.values = [...activeFilter.values, value];
              }
            }

            return activeFilter;
          })
          .filter((activeFilter) => activeFilter.values.length);
      } else {
        activeFilters.value = [
          ...activeFilters.value,
          { property, values: [value] }
        ];
      }
      filterData();
    };

    /**
     * Set active price range
     * @param {Object} {range: [number, number], label: string }
     * @returns {null}
     */
    const setActivePriceRange = (payload) => {
      if (payload && payload.range) {
        activePriceRange.value = payload;
      } else {
        activePriceRange.value = null;
      }
      filterData();
    };

    /**
     * Set Sorting
     * @param {'price-asc'|'price-desc'} newSortBy
     * @returns {null}
     */
    const setSortBy = (newSortBy) => {
      const supportedSortBys = ['price-asc', 'price-desc'];
      if (supportedSortBys.includes(newSortBy)) {
        sortBy.value = newSortBy;
      } else {
        sortBy.value = null;
      }
      filterData();
    };

    onUnmounted(() => {
      if (filterWorker && filterWorker.value) {
        filterWorker.value.terminate();
      }
      if (sortWorker && sortWorker.value) {
        sortWorker.value.terminate();
      }
    });

    watch(
      inputData,
      (value) => {
        if (typeof window !== 'undefined') {
          setupFilters();
          if (activeFilters.value && activeFilters.value.length) {
            filterData();
          }
          if (activePriceRange.value || sortBy.value) {
            sortInputData();
          }
        }
        filteredData.value = value;
      },
      { immediate: true }
    );

    /**
     Provide values
    */
    provide('filters', filters);
    provide('setupFilters', setupFilters);
    provide('activeFilters', activeFilters);
    provide('toggleActiveFilter', toggleActiveFilter);
    provide('setActivePriceRange', setActivePriceRange);
    provide('setSortBy', setSortBy);
    provide('filteredData', filteredData);
    provide('clearFilters', clearFilters);

    /**
     Render component
    */
    return () => h('div', context.slots.default && context.slots.default());
  }
};
