import { cachedFetch } from '~/utils/cachedFetch';
import { SITE_QUERY } from '~/queries/site';

export const state = () => ({
  space: {},
  components: {
    header: null,
    cart: null,
    newsletter: null,
    footer: null
  },
  catalog: []
});

export const getters = {
  siteSpace(state) {
    return state.space;
  },
  siteMetatags(state) {
    return state.space.properties.find(
      (property) => property.namespace === 'metatag'
    )?.items;
  },
  siteComponents(state) {
    return state.components;
  },
  siteCatalog(state) {
    return state.catalog;
  }
};

export const mutations = {
  setSpace(state, payload) {
    state.space = { ...payload };
  },
  setComponents(state, payload) {
    state.components = {
      header: payload.header[0],
      cart: payload.cart[0],
      newsletter: payload.newsletter[0],
      footer: payload.footer[0]
    };
  },
  setCatalog(state, payload) {
    state.catalog = [...payload];
  }
};

export const actions = {
  async initSite({ commit }) {
    const { data } = await cachedFetch({
      key: 'site',
      fetcher: () => this.$nacelle.query({ query: SITE_QUERY })
    });
    const { space, catalog, ...rest } = data;
    commit('setSpace', space);
    commit('setComponents', rest);
    commit('setCatalog', catalog);
  }
};
