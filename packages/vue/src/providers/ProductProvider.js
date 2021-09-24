import { h, provide, ref, watch } from '@vue/composition-api';
import useSpaceProvider from '~/composables/useSpaceProvider';
import useSdk from '~/composables/useSdk';
import getProductOptions from '~/utils/products/getProductOptions';
import getSelectedVariant from '~/utils/products/getSelectedVariant';

export default {
  name: 'ProductProvider',
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    product: {
      type: Object,
      default: () => ({})
    },
    productHandle: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const product = ref(props.product);
    const productHandle = ref(props.productHandle);
    const productProvided = ref(null);
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
     * Set product provider should track
     * @param {Object} config
     * @param {Object} product Product object to track
     * @param {String} handle Product handle to track
     * @returns {void}
     */
    const setProduct = async ({ product, handle }) => {
      try {
        if (!product && !handle) {
          console.warn(
            "[nacelle] ProductProvider's `setProduct` method requires a `product` or `handle` parameter."
          );
          return;
        }
        isFetching = true;
        let productObject = {};
        if (product && Object.keys(product).length) productObject = product;
        else if (handle) {
          productObject = await nacelleSdk.data.product({ handle });
        }
        if (productObject && Object.keys(productObject).length) {
          productProvided.value = {
            selectedOptions: null,
            selectedVariant: null,
            options: getProductOptions({ product: productObject }),
            ...productObject
          };
        }
        isFetching = false;
      } catch (err) {
        console.warn(`Error: ${err}`);
        isFetching = false;
      }
    };

    /**
     * Set selected options of product
     * @param {Array} options Product options selected
     * @returns {Array}
     */
    const setSelectedOptions = ({ options }) => {
      if (Array.isArray(options) && !options.length) {
        console.warn(
          "[nacelle] ProductProvider's `setSelectedOptions` method requires a `options` parameter."
        );
        return;
      }
      productProvided.value = {
        ...productProvided.value,
        selectedOptions: options,
        selectedVariant: getSelectedVariant({
          product: productProvided.value,
          options
        })
      };
    };

    /**
     * Set selected variant of product
     * @param {Object} variant Variant object selected
     * @param {String} id Variant id selected
     */
    const setSelectedVariant = ({ variant, id }) => {
      if (!variant && !id) {
        console.warn(
          "[nacelle] ProductProvider's `setSelectedVariant` method requires a `variant` or `id` parameter."
        );
        return;
      }
      let selectedVariant = null;
      if (variant) selectedVariant = variant;
      else if (id) {
        selectedVariant = productProvided.value.variants?.find((variant) => {
          return variant.id === id;
        });
      }
      if (selectedVariant) {
        productProvided.value = {
          ...productProvided.value,
          selectedOptions: selectedVariant.selectedOptions,
          selectedVariant
        };
      }
    };

    /**
     Initialize provider with product or productHandle props
     */
    if (props.product && Object.keys(props.product).length) {
      setProduct({ product: props.product });
    } else if (props.productHandle) {
      setProduct({ handle: props.productHandle });
    }

    /**
     Emit product to parent for v-model use
     */
    watch(
      productProvided,
      (value) => {
        context.emit('input', value);
      },
      { immediate: true }
    );

    /**
     Update provider with product or productHandle props
     */
    watch(product, (value) => {
      setProduct({ product: value });
    });
    watch(productHandle, (value) => {
      setProduct({ handle: value });
    });

    /**
     Provide values
    */
    provide('product', productProvided);
    provide('isFetching', isFetching);
    provide('setProduct', setProduct);
    provide('setSelectedOptions', setSelectedOptions);
    provide('setSelectedVariant', setSelectedVariant);

    /**
     Render component
    */
    return () => h('div', context.slots.default && context.slots.default());
  }
};
