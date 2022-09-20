import { get, set } from 'idb-keyval';
import { v4 as uuid } from 'uuid';

export const state = () => ({
  cartClient: null,
  cartId: null,
  cacheKeyCartId: 'cartId',
  cartCheckoutUrl: null,
  checkoutProcessing: false,
  lineItems: [],
  cartErrors: []
});

const lineTransformer = (line) => {
  const { merchandise, cost } = line;
  return {
    availableForSale: merchandise.availableForSale,
    compareAtPrice: merchandise.compareAtPriceV2,
    featuredMedia: {
      altText: merchandise.image.altText,
      src: merchandise.image.url,
      thumbnailSrc: merchandise.image.url
    },
    cartLineId: line.id,
    nacelleEntryId: merchandise.nacelleEntryId,
    price: cost.amountPerQuantity.amount,
    productHandle: merchandise.product.handle,
    productTitle: merchandise.product.title,
    quantity: line.quantity,
    selectedOptions: merchandise.selectedOptions,
    variantId: merchandise.sourceEntryId,
    variantTitle: merchandise.title,
    metafields: line.attributes
  };
};

export const getters = {
  cartItems(state) {
    return state.lineItems;
  },
  cartCount(state) {
    return state.lineItems.reduce((acc, item) => acc + item.quantity, 0);
  },
  cartSubtotal(state) {
    return state.lineItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
};

export const mutations = {
  setCartId(state, payload) {
    state.cartId = payload;
    set(state.cacheKeyCartId, payload);
  },
  setOptimisticCart(state, payload) {
    state.lineItems = payload.lines;
    if (payload.checkoutUrl) {
      state.cartCheckoutUrl = payload.checkoutUrl;
    }
  },
  setCart(state, payload) {
    const lineItemsFromCart = [...payload.lines];
    let array = [];
    state.lineItems.forEach((lineItem) => {
      const index = lineItemsFromCart.findIndex((cartItem) => {
        if (
          lineItem.cartLineId &&
          !lineItem.cartLineId.includes('placeholder')
        ) {
          return lineItem.cartLineId === cartItem.id;
        } else {
          return lineItem.variantId === cartItem.merchandise.sourceEntryId;
        }
      });
      if (index > -1) {
        array.push(lineTransformer(lineItemsFromCart.splice(index, 1)[0]));
      }
    });
    array = [
      ...array,
      ...lineItemsFromCart.map((line) => lineTransformer(line))
    ];
    state.lineItems = array;
    if (payload.checkoutUrl) {
      state.cartCheckoutUrl = payload.checkoutUrl;
    }
  },

  checkoutProcessing(state) {
    state.checkoutProcessing = true;
  },
  setErrors(state, payload) {
    state.cartErrors = [];
    if (payload.errors) {
      payload.errors.forEach((error) => state.cartErrors.push(error.message));
    }
    if (payload.userErrors) {
      payload.userErrors.forEach((error) =>
        state.cartErrors.push(error.message)
      );
    }
  }
};

export const actions = {
  async initCart({ state, dispatch }) {
    const cachedCartId = await get(state.cacheKeyCartId);
    if (cachedCartId) {
      await dispatch('retrieveCart', cachedCartId);
    } else {
      await dispatch('createCart');
    }
  },
  async createCart({ commit }) {
    const { cart, userErrors, errors } = await this.$cartClient.cartCreate();
    if (cart) {
      commit('setCartId', cart.id);
    }
    commit('setErrors', { userErrors, errors });
  },
  async retrieveCart({ commit }, payload) {
    commit('setCartId', payload);
    const { cart, userErrors, errors } = await this.$cartClient.cart({
      cartId: payload
    });
    if (cart) {
      commit('setOptimisticCart', {
        lines: cart.lines.map((line) => lineTransformer(line)),
        checkoutUrl: cart.checkoutUrl
      });
    }
    commit('setErrors', { userErrors, errors });
  },
  async addItem({ state, commit, dispatch }, payload) {
    const index = state.lineItems.findIndex((lineItem) => {
      if (payload.cartLineId) {
        return payload.cartLineId === lineItem.cartLineId;
      } else {
        return lineItem.variantId === payload.variantId;
      }
    });
    if (index === -1) {
      const cartLineId = `placeholder-${uuid()}`;
      const items = [...state.lineItems, { ...payload, cartLineId }];
      commit('setOptimisticCart', { lines: items });
      const { cart, userErrors, errors } = await this.$cartClient.cartLinesAdd({
        cartId: state.cartId,
        lines: [
          {
            nacelleEntryId: payload.nacelleEntryId,
            quantity: 1
          }
        ]
      });
      if (cart) {
        commit('setCart', {
          lines: cart.lines,
          checkoutUrl: cart.checkoutUrl
        });
      }
      commit('setErrors', { userErrors, errors });
    } else {
      const items = [...state.lineItems];

      items.splice(index, 1, {
        ...state.lineItems[index],
        quantity: state.lineItems[index].quantity + payload.quantity
      });
      commit('setOptimisticCart', { lines: items });

      await dispatch('updateItemQuantity', {
        cartLineId: state.lineItems[index].cartLineId,
        nacelleEntryId: state.lineItems[index].nacelleEntryId,
        quantity: state.lineItems[index].quantity
      });
    }
  },
  async removeItem({ state, commit }, payload) {
    const index = state.lineItems.findIndex(
      (item) => item.cartLineId === payload
    );
    const items = [...state.lineItems];
    if (index > -1) {
      const cartLineId = state.lineItems[index].cartLineId;
      items.splice(index, 1);
      commit('setOptimisticCart', { lines: items });
      const { cart, userErrors, errors } =
        await this.$cartClient.cartLinesRemove({
          cartId: state.cartId,
          lineIds: [cartLineId]
        });

      if (cart) {
        commit('setCart', {
          lines: cart.lines,
          checkoutUrl: cart.checkoutUrl
        });
      }

      commit('setErrors', { userErrors, errors });
    }
  },
  async updateItemQuantity({ state, commit }, payload) {
    const { cart, userErrors, errors } = await this.$cartClient.cartLinesUpdate(
      {
        cartId: state.cartId,
        lines: [
          {
            id: payload.cartLineId,
            nacelleEntryId: payload.nacelleEntryId,
            quantity: payload.quantity
          }
        ]
      }
    );

    if (cart) {
      commit('setCart', {
        lines: cart.lines,
        checkoutUrl: cart.checkoutUrl
      });
    }
    commit('setErrors', { userErrors, errors });
  },
  async incrementItem({ state, commit, dispatch }, payload) {
    const index = state.lineItems.findIndex(
      (item) => item.cartLineId === payload
    );
    if (index > -1) {
      const items = [...state.lineItems];
      items.splice(index, 1, {
        ...state.lineItems[index],
        quantity: state.lineItems[index].quantity + 1
      });
      commit('setOptimisticCart', { lines: items });
      await dispatch('updateItemQuantity', {
        cartLineId: state.lineItems[index].cartLineId,
        nacelleEntryId: state.lineItems[index].nacelleEntryId,
        quantity: state.lineItems[index].quantity
      });
    }
  },
  async decrementItem({ state, commit, dispatch }, payload) {
    const index = state.lineItems.findIndex(
      (item) => item.cartLineId === payload
    );
    if (index > -1) {
      if (state.lineItems[index].quantity === 1) {
        await dispatch('removeItem', payload);
      } else {
        const items = [...state.lineItems];
        items.splice(index, 1, {
          ...state.lineItems[index],
          quantity: state.lineItems[index].quantity - 1
        });
        commit('setOptimisticCart', { lines: items });
        await dispatch('updateItemQuantity', {
          cartLineId: state.lineItems[index].cartLineId,
          nacelleEntryId: state.lineItems[index].nacelleEntryId,
          quantity: state.lineItems[index].quantity
        });
      }
    }
  },
  async clearCart({ state, commit }) {
    const items = [...state.lineItems];
    commit('setOptimisticCart', { lines: [] });
    const { cart, userErrors, errors } = await this.$cartClient.cartLinesRemove(
      {
        cartId: state.cartId,
        lineIds: items.map((item) => item.cartLineId)
      }
    );

    if (cart) {
      commit('setCart', {
        lines: [],
        checkoutUrl: cart.checkoutUrl
      });
    }

    commit('setErrors', { userErrors, errors });
  },
  checkout({ state, commit }) {
    if (state.cartCheckoutUrl) {
      commit('checkoutProcessing');
      window.location.href = state.cartCheckoutUrl;
    } else {
      alert('There was an issue with your checkout.');
    }
  }
};
