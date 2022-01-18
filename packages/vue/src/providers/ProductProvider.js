import { h, provide, ref, watch } from 'vue-demi';
import { getSelectedVariant } from '~/utils/products';

export default {
  name: 'ProductProvider',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const product = ref(props.product);
    const productProvided = ref(null);

    /**
     * Set product provider should track
     * @param {Object} product Product object to track
     * @returns {void}
     */
    const setProduct = async ({ product }) => {
      if (!product) {
        console.warn(
          "[nacelle] ProductProvider's `setProduct` method requires a `product` parameter."
        );
        return;
      } else {
        productProvided.value = {
          selectedOptions: null,
          selectedVariant: null,
          ...product
        };
      }
    };

    /**
     * Set selected options of product
     * @param {Array} options Product options selected
     * @returns {Array}
     */
    const setSelectedOptions = ({ options }) => {
      productProvided.value = {
        ...productProvided.value,
        selectedOptions: options || null,
        selectedVariant: options
          ? getSelectedVariant({
              product: productProvided.value,
              options
            })
          : null
      };
    };

    /**
     * Set selected variant of product
     * @param {Object} variant Variant object selected
     * @param {String} id Variant id selected
     */
    const setSelectedVariant = ({ variant, sourceEntryId }) => {
      let selectedVariant = null;
      if (variant) selectedVariant = variant;
      else if (sourceEntryId) {
        selectedVariant = productProvided.value.variants?.find((variant) => {
          return variant.sourceEntryId === sourceEntryId;
        });
      }
      productProvided.value = {
        ...productProvided.value,
        selectedOptions: selectedVariant
          ? selectedVariant.selectedOptions
          : null,
        selectedVariant
      };
    };

    /**
     Initialize/update provider with product prop
     */
    watch(
      product,
      (value) => {
        setProduct({ product: value });
      },
      { immediate: true }
    );

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
     Provide values
    */
    provide('product', productProvided);
    provide('setProduct', setProduct);
    provide('setSelectedOptions', setSelectedOptions);
    provide('setSelectedVariant', setSelectedVariant);

    /**
     Render component
    */
    return () => h('div', context.slots.default && context.slots.default());
  }
};
