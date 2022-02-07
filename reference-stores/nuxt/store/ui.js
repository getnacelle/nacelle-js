export const state = () => ({
  navVisible: false,
  cartVisible: false
});

export const getters = {
  navVisible(state) {
    return state.navVisible;
  },
  cartVisible(state) {
    return state.cartVisible;
  }
};

export const mutations = {
  setNavVisibility(state, payload) {
    state.navVisible = payload;
  },
  setCartVisibility(state, payload) {
    state.cartVisible = payload;
  }
};
