import {
  h,
  reactive,
  provide,
  readonly,
  onMounted
} from '@vue/composition-api';
import { get, set } from 'idb-keyval';
import { v4 as uuid } from 'uuid';

export default {
  name: 'CartProvider',
  props: {
    cacheKey: {
      type: String,
      default: 'cart'
    },
    persistence: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const cart = reactive({
      lineItems: []
    });

    /**
     * Builds cart from cache, if available.
     * @returns {void}
     */
    const initCart = async () => {
      if (props.persistence) {
        const cachedCart = await get(props.cacheKey);
        cart.lineItems = cachedCart || [];
      } else {
        cart.lineItems = [];
      }
    };

    /**
     * Writes cart to cache.
     * @returns {void}
     */
    const cacheCart = () => {
      if (!props.persistence) return;
      set(props.cacheKey, cart.lineItems);
    };

    /**
     * Adds item to cart.
     * @param {Object} payload Product data
     * @returns {void}
     */
    const addItem = (payload) => {
      if (!payload.variant || !payload.variant.id) {
        console.warn(
          "[nacelle] CartProvider's `addItem` method requires the parameter to have a `variant` object with an `id` property."
        );
        return;
      }
      payload.quantity = payload.quantity || 1;

      const index = cart.lineItems.findIndex((item) => {
        if (item.variant.id === payload.variant.id) {
          return (
            JSON.stringify(payload.metafields) ===
            JSON.stringify(item.metafields)
          ); // match only if metafields are the same.
        }
        return false;
      });

      if (index === -1) {
        payload.id = `${payload.variant.id}::${uuid()}`;
        cart.lineItems.push(payload);
      } else {
        cart.lineItems[index].quantity += payload.quantity;
      }

      cacheCart();
    };

    /**
     * Removes item from cart.
     * @param {String} payload Unique item ID
     * @returns {void}
     */
    const removeItem = (payload) => {
      const index = cart.lineItems.findIndex((item) => item.id === payload);
      if (index === -1) {
        console.warn("[nacelle] Couldn't remove item. Item not found.");
        return;
      }
      cart.lineItems.splice(index, 1);
      cacheCart();
    };

    /**
     * Updates item in cart.
     * @param {String} payload
     * @returns {void}
     */
    const updateItem = (payload) => {
      // find matching item in cart
      const index = cart.lineItems.findIndex((item) => item.id === payload.id);
      if (index === -1) {
        console.warn("[nacelle] Couldn't update item. Item not found.");
        return;
      }
      // loop through keys in the payload to update
      Object.keys(cart.lineItems[index]).forEach((key) => {
        const value = payload[key];
        if (key !== 'id' && cart.lineItems[index][key] !== value) {
          cart.lineItems[index][key] = value;
        }
      });
      cacheCart();
    };

    /**
     * Increases item quantity in cart.
     * @param {String} payload Unique item ID
     * @returns {void}
     */
    const incrementItem = (payload) => {
      const index = cart.lineItems.findIndex((item) => item.id === payload);
      if (index === -1) {
        console.warn("[nacelle] Couldn't increment item. Item not found.");
        return;
      }
      cart.lineItems[index].quantity++;
      cacheCart();
    };

    /**
     * Decreases item quantity in cart. Removes item from cart if item quantity is 0.
     * @param {String} payload Unique item ID
     * @returns {void}
     */
    const decrementItem = (payload) => {
      const index = cart.lineItems.findIndex((item) => item.id === payload);
      if (index === -1) {
        console.warn("[nacelle] Couldn't decrement item. Item not found.");
        return;
      }
      if (cart.lineItems[index].quantity >= 1) {
        cart.lineItems[index].quantity--;
        if (cart.lineItems[index].quantity === 0) {
          cart.lineItems.splice(index, 1);
        }
      }
      cacheCart();
    };

    /**
     * Clears items from cart.
     * @returns {void}
     */
    const clearCart = () => {
      cart.lineItems = [];
      cacheCart();
    };

    onMounted(() => {
      initCart();
    });

    provide('cart', readonly(cart));
    provide('addItem', addItem);
    provide('removeItem', removeItem);
    provide('updateItem', updateItem);
    provide('incrementItem', incrementItem);
    provide('decrementItem', decrementItem);
    provide('clearCart', clearCart);

    return () => h('div', context.slots.default && context.slots.default());
  }
};
