import { h, provide, ref, watch } from '@vue/composition-api';
import useSpaceProvider from '~/composables/useSpaceProvider';
import useSdk from '~/composables/useSdk';

export default {
  name: 'CollectionProvider',
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    collection: {
      type: Object,
      default: () => ({})
    },
    collectionHandle: {
      type: String,
      default: ''
    },
    productsPerFetch: {
      type: Number,
      default: 12
    }
  },
  setup(props, context) {
    const collection = ref(props.collection);
    const collectionHandle = ref(props.collectionHandle);
    const collectionProvided = ref(null);
    const productsPerFetch = ref(props.productsPerFetch);
    let isFetching = ref(false);

    const config = props.config;

    /**
     Use sdk from injection or config prop
     */
    let { nacelleSdk } = useSpaceProvider();
    if (!nacelleSdk || Object.keys(config).length) {
      nacelleSdk = useSdk({ config });
    }

    /**
     * Set collection provider should track
     * @param {Object} config
     * @param {Object} collection Collection object to track
     * @param {String} handle Collection handle to track
     * @returns {void}
     */
    const setCollection = async ({ collection, handle }) => {
      try {
        if (!collection && !handle) {
          console.warn(
            "[nacelle] CollectionProvider's `setCollection` method requires a `collection` or `handle` parameter."
          );
          return;
        }
        let collectionObject = {};
        if (collection && Object.keys(collection).length)
          collectionObject = collection;
        else if (handle) {
          isFetching = true;
          const data = await Promise.all([
            nacelleSdk.data.collection({ handle }),
            nacelleSdk.data.collectionPage({
              handle,
              paginate: true,
              itemsPerPage: productsPerFetch || 12
            })
          ]);
          if (data) {
            collectionObject = { ...data[0], products: data[1] };
          }
          isFetching = false;
        }
        if (collectionObject && Object.keys(collectionObject).length) {
          collectionProvided.value = {
            ...collectionObject
          };
        }
      } catch (err) {
        console.warn(`Error: ${err}`);
        isFetching = false;
      }
    };

    /**
     * Load products provider should track
     * @param {Object} config
     * @param {Number} count Number of collection products to load
     * @param {Number} offset Offset of collection products to load
     * @returns {void}
     */
    const loadProducts = async ({ count, offset }) => {
      try {
        if (collectionProvided.value) {
          const productHandles =
            collectionProvided.value.productLists[0]?.handles;
          const totalProducts = productHandles?.length || 0;
          const indexedProducts =
            collectionProvided.value.products?.length || 0;
          if (totalProducts > indexedProducts) {
            const startIndex = offset || indexedProducts;
            const endIndex = count ? startIndex + count : startIndex + 12;
            if (totalProducts >= startIndex) {
              const handlesToFetch = productHandles.slice(startIndex, endIndex);
              if (handlesToFetch.length) {
                const products = await nacelleSdk.data.products({
                  handles: handlesToFetch
                });
                collectionProvided.value = {
                  ...collectionProvided.value,
                  products: [...collectionProvided.value.products, ...products]
                };
              }
            }
          }
        }
      } catch (err) {
        console.warn(`Error: ${err}`);
        isFetching = false;
      }
    };

    /**
     Initialize provider with collection or collectionHandle props
     */
    if (props.collection && Object.keys(props.collection).length) {
      setCollection({ collection: props.collection });
    } else if (props.collectionHandle) {
      setCollection({ handle: props.collectionHandle });
    }

    /**
     Emit collection to parent for v-model use
     */
    watch(
      collectionProvided,
      (value) => {
        context.emit('input', value);
      },
      { immediate: true }
    );

    /**
     Update provider with collection or collectionHandle props
     */
    watch(collection, (value) => {
      setCollection({ collection: value });
    });
    watch(collectionHandle, (value) => {
      setCollection({ handle: value });
    });

    /**
     Provide values
    */
    provide('collection', collectionProvided);
    provide('isFetching', isFetching);
    provide('setCollection', setCollection);
    provide('loadProducts', loadProducts);

    /**
     Render component
    */
    return () => h('div', context.slots.default && context.slots.default());
  }
};
