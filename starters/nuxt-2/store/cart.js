import { get, set } from 'idb-keyval';
import { v4 as uuid } from 'uuid';

export const state = () => ({
  cacheKey: 'cart',
  lineItems: []
});

export const getters = {
  cartCount(state) {
    return state.lineItems.reduce((acc, item) => acc + item.quantity, 0);
  },
  cartSubtotal(state) {
    return state.lineItems.reduce(
      (acc, item) => acc + item.variant.price * item.quantity,
      0
    );
  }
};

export const mutations = {
  setLineItems(state, payload) {
    state.lineItems = payload;
    set('cart', state.lineItems);
  },
  addItem(state, payload) {
    const index = state.lineItems.findIndex((lineItem) => {
      if (lineItem.variant.id === payload.variant.id) {
        return (
          JSON.stringify(payload.metafields) ===
          JSON.stringify(lineItem.metafields)
        );
      }
      return false;
    });
    if (index === -1) {
      payload.id = `${payload.variant.id}::${uuid()}`;
      state.lineItems.push(payload);
    } else {
      state.lineItems.splice(index, 1, {
        ...state.lineItems[index],
        quantity: state.lineItems[index].quantity + payload.quantity
      });
    }
    set('cart', state.lineItems);
  },
  removeItem(state, payload) {
    const index = state.lineItems.findIndex((item) => item.id === payload);
    if (index > -1) {
      state.lineItems.splice(index, 1);
    }
    set('cart', state.lineItems);
  },
  updateItem(state, payload) {
    const index = state.lineItems.findIndex((item) => item.id === payload.id);
    if (index > -1) {
      state.lineItems.splice(index, 1, {
        ...state.lineItems[index],
        ...payload
      });
    }
    set('cart', state.lineItems);
  },
  incrementItem(state, payload) {
    const index = state.lineItems.findIndex((item) => item.id === payload);
    if (index > -1) {
      state.lineItems.splice(index, 1, {
        ...state.lineItems[index],
        quantity: state.lineItems[index].quantity + 1
      });
    }
    set('cart', state.lineItems);
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
    set('cart', state.lineItems);
  },
  clearCart(state) {
    state.lineItems = [];
    set('cart', state.lineItems);
  }
};

export const actions = {
  async initCart({ state, commit }) {
    const cachedCart = await get(state.cacheKey);
    commit('setLineItems', cachedCart || []);
  }
};
