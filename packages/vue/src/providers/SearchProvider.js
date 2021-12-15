import { h, ref, provide, onMounted } from '@vue/composition-api';
import SearchWorker from '../workers/search?worker';
import FetchCatalogWorker from '../workers/fetchCatalog?worker';

export default {
  name: 'SearchProvider',
  props: {
    searchData: {
      type: [Array, Function],
      default: () => []
    },
    defaultSearchOptions: {
      type: Object,
      default: () => ({
        relevanceThreshold: 0.5,
        keys: ['content.title']
      })
    }
  },
  setup(props, context) {
    const searchData = ref([]);
    const searchOptions = ref(props.defaultSearchOptions);
    const searchWorker = ref(null);
    const results = ref([]);

    // Initial setup for `searchData`
    // Case 1: use passed prop array
    // Case 2: use passed prop function
    // Case 3: use search.json
    if (Array.isArray(props.searchData) && props.searchData.length) {
      searchData.value = props.searchData;
    } else if (typeof props.searchData === 'function') {
      props
        .searchData()
        .then((res) => {
          searchData.value = res.data ? res.data : res;
        })
        .catch((err) => console.error(err));
    } else {
      onMounted(() => {
        const worker = new FetchCatalogWorker();
        worker.postMessage({ origin: window.location.origin });
        worker.onmessage = (e) => {
          try {
            const data = Object.values(e.data).flat();
            searchData.value = data;
          } catch (error) {
            console.error(error);
          }
          worker.terminate();
        };
      });
    }

    /**
     * Modify default search options
     * @param {Object} options search parameters
     * @returns {void}
     */
    const setSearchOptions = (options) => {
      searchOptions.value = options;
    };

    /**
     * Seaches through searchData array
     * @param {Object} payload
     * @param {string} payload.query query to look for
     * @param {Object} payload.options search parameters
     * @returns {Array|Object} results|message
     */
    const search = ({ query, options }) => {
      if (!searchData.value) {
        console.warn('Search Data is loading');
        return { message: 'Search Data is loading' };
      }
      if (!searchWorker.value) {
        searchWorker.value = new SearchWorker();
      }
      searchWorker.value.postMessage({
        searchData: searchData.value,
        options: options || searchOptions.value,
        value: query
      });
      searchWorker.value.onmessage = (e) => {
        results.value = e.data;
        return results;
      };
    };

    provide('search', search);
    provide('setSearchOptions', setSearchOptions);
    provide('results', results);

    return () => h('div', context.slots.default && context.slots.default());
  }
};
