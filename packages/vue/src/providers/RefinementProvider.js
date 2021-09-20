import {
  h,
  ref,
  watch,
  computed,
  provide,
  onMounted,
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
    },
    /**
     * { property: string, values: [string] }[]
     */
    activeFilters: {
      type: Array,
      default: () => []
    },
    /**
     * { label: string, range: [number, number] }
     */
    activePriceRange: {
      type: Object,
      default: () => ({})
    },
    sortBy: {
      type: String,
      default: 'Sort By'
    }
  },
  setup(props, context) {
    const filters = ref([]);
    const filterWorker = ref(null);
    const sortWorker = ref(null);
    const filteredData = ref(props.inputData);

    /**
     Computed properties
     */
    const activeFilters = computed(() => props.activeFilters);
    const activePriceRange = computed(() => props.activePriceRange);
    const sortBy = computed(() => props.sortBy);

    /**
     Worker blobs
     */
    function filterWorkerBlob() {
      onmessage = function(e) {
        const inputData = e.data.inputData;
        const activeFilters = e.data.activeFilters;

        if (inputData && activeFilters) {
          const output = inputData.filter(item => {
            const filterChecks = activeFilters.map(filter => {
              if (
                filter.values.some(filterCheck => {
                  const value = item.facets.find(facet => {
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

            const itemShouldPass = filterChecks.every(filterCheck => {
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
      onmessage = function(e) {
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
     Uses `sortBy` & `activePriceRange` to sort data
     */
    const sortInputData = () => {
      const blobURL = fnToBlobUrl(sortWorkerBlob);
      sortWorker.value = sortWorker.value || new Worker(blobURL);
      sortWorker.value.postMessage({
        filteredData: filteredData.value,
        activePriceRange: props.activePriceRange,
        sortBy: sortBy.value
      });
      sortWorker.value.onmessage = function(e) {
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
        activeFilters: props.activeFilters,
        inputData: props.inputData
      });
      filterWorker.value.onmessage = function(e) {
        filteredData.value = e.data;
        sortInputData();
      };
    };

    /**
     Uses input data to find filters
     */
    const setupFilters = () => {
      if (props.inputData && props.propertyFilters) {
        filters.value = props.inputData
          .reduce((output, item) => {
            if (!item.facets) {
              console.warn(
                `No facets have been generated for this item: ${item.handle ||
                  item}`
              );
            } else {
              item.facets
                .filter(facet => facet.name.toLowerCase() !== 'title')
                .forEach(facet => {
                  const index = output.findIndex(arrayItem => {
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
          .map(facet => {
            const values = Array.from(new Set(facet.values));
            return { property: facet.property, values };
          })
          .filter(facet => {
            return props.propertyFilters.find(filter => {
              return filter.field === facet.property;
            });
          })
          .map(facet => {
            const index = props.propertyFilters.findIndex(filter => {
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
      sortBy.value = 'Sort By';
    };

    /**
     lifecycle hooks
     */
    onMounted(() => {
      setupFilters();
      if (activeFilters.value && activeFilters.value.length) {
        sortFilteredData();
      }
      if (
        activePriceRange.value ||
        (sortBy.value && sortBy.value !== 'Sort By')
      ) {
        sortInputData();
      }
    });
    onUnmounted(() => {
      if (filterWorker && filterWorker.value) {
        filterWorker.value.terminate();
      }
      if (sortWorker && sortWorker.value) {
        sortWorker.value.terminate();
      }
    });

    /**
     Emit product to parent for v-model use
     */
    watch(
      filteredData,
      value => {
        context.emit('input', value);
      },
      { immediate: true }
    );

    /**
     Update filtered data 
    */
    watch(activeFilters, () => {
      sortFilteredData();
    });

    watch(activePriceRange, value => {
      if (value) {
        sortInputData();
      } else {
        sortFilteredData();
      }
    });

    watch(sortBy, value => {
      if (value) {
        sortInputData();
      } else {
        sortFilteredData();
      }
    });

    /**
     Provide values
    */
    provide('filters', filters);
    provide('setupFilters', setupFilters);
    provide('activeFilters', activeFilters);
    provide('filteredData', filteredData);
    provide('clearFilters', clearFilters);

    /**
     Render component
    */
    return () => h('div', context.slots.default && context.slots.default());
  }
};
