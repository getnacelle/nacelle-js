import {
  h,
  ref,
  watch,
  computed,
  provide,
  onUnmounted
} from '@vue/composition-api';

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
     Worker blobs
     */
    function filterWorkerBlob() {
      onmessage = function (e) {
        const inputData = e.data.inputData;
        const activeFilters = e.data.activeFilters;
        if (inputData && activeFilters) {
          const output = inputData.filter((item) => {
            const filterChecks = activeFilters.map((filter) => {
              if (
                filter.values.some((filterCheck) => {
                  const value = item.facets.find((facet) => {
                    return facet.value === filterCheck;
                  });
                  if (value) {
                    return true;
                  }
                  return false;
                })
              ) {
                return true;
              }
              return false;
            });

            const itemShouldPass = filterChecks.every((filterCheck) => {
              return filterCheck === true;
            });
            return itemShouldPass;
          });
          postMessage(output);
        } else {
          postMessage(inputData);
        }
      };
    }

    function sortWorkerBlob() {
      onmessage = function (e) {
        const { filteredData, activePriceRange, sortBy } = e.data;
        const output = filteredData.filter(({ minPrice }) => {
          if (activePriceRange) {
            const min = activePriceRange.range[0];
            const max = activePriceRange.range[1];
            if (min === 0) {
              return minPrice < max;
            } else if (max === 0) {
              return minPrice > min;
            } else {
              return minPrice > min && parseFloat(minPrice) < max;
            }
          } else {
            return true;
          }
        });
        switch (sortBy) {
          case 'price-desc':
            postMessage(
              output.sort((a, b) => {
                if (a.priceRange.min < b.priceRange.min) {
                  return 1;
                }
                if (a.priceRange.min > b.priceRange.min) {
                  return -1;
                }

                return 0;
              })
            );
            break;
          case 'price-asc':
            postMessage(
              output.sort((a, b) => {
                if (a.priceRange.min < b.priceRange.min) {
                  return -1;
                }
                if (a.priceRange.min > b.priceRange.min) {
                  return 1;
                }

                return 0;
              })
            );
            break;
          default:
            postMessage(output);
        }
      };
    }

    function fnToBlobUrl(fn) {
      const blobDataObj = `(${fn})();`;
      const blob = new Blob([blobDataObj.replace('"use strict";', '')]);
      return URL.createObjectURL(blob, {
        type: 'application/javascript; charset=utf-8'
      });
    }

    /**
     * Transform Product Data
     */
    const transformProductData = (product) => {
      const { tags, variants, productType, ...rest } = product;

      // Get product filter facets from variant data
      const variantOptions = variants.map((variant) => {
        return variant.selectedOptions;
      });

      const variantFacets = variantOptions
        .reduce((acc, item) => {
          return acc.concat(item);
        }, [])
        .map((option) => JSON.stringify(option));

      const facets = Array.from(new Set(variantFacets))
        .map((option) => JSON.parse(option))
        .map((option) => {
          return { name: option.name.toLowerCase(), value: option.value };
        });

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
      const blobURL = fnToBlobUrl(sortWorkerBlob);
      sortWorker.value = sortWorker.value || new Worker(blobURL);
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
    const sortFilteredData = () => {
      const blobURL = fnToBlobUrl(filterWorkerBlob);
      filterWorker.value = filterWorker.value || new Worker(blobURL);
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
                `No facets have been generated for this item: ${item.handle ||
                  item}`
              );
            } else {
              item.facets
                .filter((facet) => facet.name.toLowerCase() !== 'title')
                .forEach((facet) => {
                  const index = output.findIndex((arrayItem) => {
                    return facet.name === arrayItem.property;
                  });
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
          .map((facet) => {
            const values = Array.from(new Set(facet.values));
            return { property: facet.property, values };
          })
          .filter((facet) => {
            return props.propertyFilters.find((filter) => {
              return filter.field === facet.property;
            });
          })
          .map((facet) => {
            const index = props.propertyFilters.findIndex((filter) => {
              return filter.field === facet.property;
            });
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
      sortFilteredData();
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
                activeFilter.values.splice(index);
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
      sortFilteredData();
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
      sortFilteredData();
    };

    /**
     * Set Sorting
     * @param {string} 'price-asc', 'price-desc'
     * @returns {null}
     */
    const setSortBy = (payload) => {
      if (['price-asc', 'price-desc'].includes(payload)) {
        sortBy.value = payload;
      } else {
        sortBy.value = null;
      }
      sortFilteredData();
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
        if (process.browser) {
          setupFilters();
          if (activeFilters.value && activeFilters.value.length) {
            sortFilteredData();
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
