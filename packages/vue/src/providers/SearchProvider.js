import { h, ref, provide, onMounted } from '@vue/composition-api';

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

    // Worker blobs
    function workerFetchCatalog(origin) {
      onmessage = async function () {
        const response = await fetch(`${origin}/data/search.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        postMessage(data);
      };
    }

    function workerSearch() {
      /* eslint-disable no-undef */
      self.importScripts(
        'https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js'
      );
      onmessage = function receiver(e) {
        const { searchData, options, value } = e.data;
        const results = new Fuse(searchData, options)
          .search(String(value))
          .filter((result) => typeof result.item !== 'undefined')
          .map((result) => result.item);

        postMessage(results);
      };
    }

    function fnToBlobUrl(fn) {
      const blobDataObj = `(${fn})();`;
      const blob = new Blob([blobDataObj.replace('"use strict";', '')]);
      return URL.createObjectURL(blob, {
        type: 'application/javascript; charset=utf-8'
      });
    }

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
        const blobURL = fnToBlobUrl(workerFetchCatalog(window.location.origin));
        const worker = new Worker(blobURL);
        worker.postMessage(null);
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
        const blobURL = fnToBlobUrl(workerSearch);
        searchWorker.value = new Worker(blobURL);
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
