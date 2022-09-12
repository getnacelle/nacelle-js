import { get, set } from 'idb-keyval';
import { v4 as uuid } from 'uuid';

export const state = () => ({
  cartClient: null,
  cartId: null,
  cacheKeyCartId: 'cartId',
  cacheKeyLineItems: 'cart',
  lineItems: []
});

const handleResponseErrors = (response) => {
  if (response.userErrors) {
    console.error('User error', response.userErrors);
  }
  if (response.errors) {
    console.error(response.errors);
  }
};

const linesTransformer = (lines) => {
  return lines.map((line) => {
    const { merchandise, cost } = line;
    return {
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
    };
  });
};

export const getters = {
  cartItems(state) {
    return state.lineItems;
  },
  cartCount(state) {
    console.log('CHECK 2', state.lineItems);
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
  setCart(state, payload) {
    state.cartId = payload;
    set(state.cacheKeyCartId, payload);
  },
  setLineItems(state, payload) {
    state.lineItems = payload;
    set(state.cacheKeyLineItems, payload);
  },
  incrementItem(state, payload) {
    const index = state.lineItems.findIndex((item) => item.id === payload);
    if (index > -1) {
      state.lineItems.splice(index, 1, {
        ...state.lineItems[index],
        quantity: state.lineItems[index].quantity + 1
      });
    }
    set(state.cacheKeyLineItems, state.lineItems);
  },
  decrementItem(state, payload) {
    const index = state.lineItems.findIndex((item) => item.id === payload);
    if (index > -1) {
      if (state.lineItems[index].quantity === 1) {
        state.lineItems.splice(index, 1);
      } else {
        state.lineItems.splice(index, 1, {
          ...state.lineItems[index],
          quantity: state.lineItems[index].quantity - 1
        });
      }
    }
    set(state.cacheKeyLineItems, state.lineItems);
  },
  clearCart(state) {
    state.lineItems = [];
    set(state.cacheKeyLineItems, state.lineItems);
  }
};

export const actions = {
  async initCart({ state, dispatch }) {
    const cachedCart = await get(state.cacheKeyLineItems);
    const cachedCartId = await get(state.cacheKeyCartId);

    if (cachedCartId) {
      await dispatch('retrieveCart', cachedCartId);
    } else {
      await dispatch('createCart');
    }
    // commit('setLineItems', cachedCart || []);

    console.log('CHECK', cachedCart, cachedCartId);
  },
  async createCart({ commit }) {
    const { cart, userErrors, errors } = await this.$cartClient.cartCreate();
    console.log('SET CREATE CART RESPONSE', { cart, userErrors, errors });
    if (cart) {
      commit('setCart', cart.id);
    }
    handleResponseErrors({ userErrors, errors });
  },
  async retrieveCart({ commit }, payload) {
    commit('setCart', payload);
    const { cart, userErrors, errors } = await this.$cartClient.cart({
      cartId: payload
    });
    console.log('SET RETRIEVE CART RESPONSE', { cart, userErrors, errors });
    if (cart) {
      commit('setLineItems', linesTransformer(cart.lines));
    }
    handleResponseErrors({ userErrors, errors });
  },
  async addItem({ state, commit, dispatch }, payload) {
    const index = state.lineItems.findIndex((lineItem) => {
      return lineItem.variantId === payload.variantId;
    });
    if (index === -1) {
      payload.id = `${payload.variantId}::${uuid()}`;
      const items = [...state.lineItems];
      items.unshift(payload);
      commit('setLineItems', items);
      const { cart, userErrors, errors } = await this.$cartClient.cartLinesAdd({
        cartId: state.cartId,
        lines: [
          {
            merchandiseId: `${payload.variantId}::${uuid()}`,
            quantity: 1
          }
        ]
      });
      console.log('ADD TO CART ADD', { cart, userErrors, errors });
      if (cart) {
        commit('setLineItems', linesTransformer(cart.lines));
      }
      handleResponseErrors({ userErrors, errors });
    } else {
      const items = [...state.lineItems];

      items.splice(index, 1, {
        ...state.lineItems[index],
        quantity: state.lineItems[index].quantity + payload.quantity
      });
      commit('setLineItems', items);
      console.log('ID CHECK', state.lineItems[index].id);

      await dispatch('updateItemQuantity', {
        id: state.lineItems[index].id,
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
      commit('setLineItems', items);
      const { cart, userErrors, errors } =
        await this.$cartClient.cartLinesRemove({
          cartId: state.cartId,
          lineIds: [id]
        });
      console.log('CART REMOVE', { userErrors, errors });
      if (cart) {
        commit('setLineItems', linesTransformer(cart.lines));
      }
      handleResponseErrors({ userErrors, errors });
    }
  },
  async updateItemQuantity({ state, commit }, payload) {
    const { cart, userErrors, errors } = await this.$cartClient.cartLinesUpdate(
      {
        cartId: state.cartId,
        lines: [
          {
            id: payload.id,
            quantity: payload.quantity
          }
        ]
      }
    );
    console.log('ADD TO CART UPDATE', { userErrors, errors });
    if (cart) {
      commit('setLineItems', linesTransformer(cart.lines));
    }
    handleResponseErrors({ userErrors, errors });
  },
  async incrementItem({ state, commit, dispatch }, payload) {
    const index = state.lineItems.findIndex((item) => item.id === payload);
    if (index > -1) {
      const items = [...state.lineItems];
      items.splice(index, 1, {
        ...state.lineItems[index],
        quantity: state.lineItems[index].quantity + 1
      });
      commit('setLineItems', items);
      await dispatch('updateItemQuantity', {
        id: state.lineItems[index].id,
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
        commit('setLineItems', items);
        await dispatch('updateItemQuantity', {
          id: state.lineItems[index].id,
          quantity: state.lineItems[index].quantity
        });
      }
    }
  }
};
