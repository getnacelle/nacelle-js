import { get, set } from 'idb-keyval';

export const state = () => ({
  cartClient: null,
  cartId: null,
  cacheKeyCartId: 'cartId',
  cartCheckoutUrl: null,
  checkoutProcessing: false,
  lineItems: [],
  cartErrors: []
});

const linesTransformer = (lines) => {
  return lines.reduce((array, line) => {
    const { merchandise, cost } = line;
    if (line.quantity) {
      array.push({
        availableForSale: merchandise.availableForSale,
        compareAtPrice: merchandise.compareAtPriceV2,
        featuredMedia: {
          altText: merchandise.image.altText,
          src: merchandise.image.url,
          thumbnailSrc: merchandise.image.url
        },
        id: line.id,
        price: cost.amountPerQuantity.amount,
        productHandle: merchandise.product.handle,
        productTitle: merchandise.product.title,
        quantity: line.quantity,
        selectedOptions: merchandise.selectedOptions,
        variantId: merchandise.id,
        variantTitle: merchandise.title
      });
    }
    return array;
  }, []);
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
  setCart(state, payload) {
    state.lineItems = payload.lines;
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
      console.log('RETRIEVE', cart);
      commit('setCart', {
        lines: linesTransformer(cart.lines),
        checkoutUrl: cart.checkoutUrl
      });
    }
    commit('setErrors', { userErrors, errors });
  },
  async addItem({ state, commit, dispatch }, payload) {
    const index = state.lineItems.findIndex((lineItem) => {
      return lineItem.variantId === payload.variantId;
    });
    if (index === -1) {
      payload.id = payload.variantId;
      const items = [...state.lineItems, payload];
      commit('setCart', { lines: items });
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
        console.log('ADD', cart);
        commit('setCart', {
          lines: linesTransformer(cart.lines),
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
      commit('setCart', { lines: items });

      await dispatch('updateItemQuantity', {
        nacelleEntryId: state.lineItems[index].nacelleEntryId,
        quantity: state.lineItems[index].quantity
      });
    }
  },
  async removeItem({ state, commit }, payload) {
    const index = state.lineItems.findIndex((item) => item.id === payload);
    const items = [...state.lineItems];
    if (index > -1) {
      const id = state.lineItems[index].id;
      items.splice(index, 1);
      commit('setCart', { lines: items });
      const { cart, userErrors, errors } =
        await this.$cartClient.cartLinesRemove({
          cartId: state.cartId,
          lineIds: [id]
        });

      if (cart) {
        commit('setCart', {
          lines: linesTransformer(cart.lines),
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
            id: payload.nacelleEntryId,
            quantity: payload.quantity
          }
        ]
      }
    );

    if (cart) {
      console.log('UPDATE', cart);
      commit('setCart', {
        lines: linesTransformer(cart.lines),
        checkoutUrl: cart.checkoutUrl
      });
    }
    commit('setErrors', { userErrors, errors });
  },
  async incrementItem({ state, commit, dispatch }, payload) {
    const index = state.lineItems.findIndex((item) => item.id === payload);
    if (index > -1) {
      const items = [...state.lineItems];
      items.splice(index, 1, {
        ...state.lineItems[index],
        quantity: state.lineItems[index].quantity + 1
      });
      commit('setCart', { lines: items });
      await dispatch('updateItemQuantity', {
        nacelleEntryId: state.lineItems[index].nacelleEntryId,
        quantity: state.lineItems[index].quantity
      });
    }
  },
  async decrementItem({ state, commit, dispatch }, payload) {
    const index = state.lineItems.findIndex((item) => item.id === payload);
    if (index > -1) {
      if (state.lineItems[index].quantity === 1) {
        await dispatch('removeItem', payload);
      } else {
        const items = [...state.lineItems];
        items.splice(index, 1, {
          ...state.lineItems[index],
          quantity: state.lineItems[index].quantity - 1
        });
        commit('setCart', { lines: items });
        await dispatch('updateItemQuantity', {
          nacelleEntryId: state.lineItems[index].nacelleEntryId,
          quantity: state.lineItems[index].quantity
        });
      }
    }
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
