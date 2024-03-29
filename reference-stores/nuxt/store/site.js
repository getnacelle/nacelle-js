import { cachedFetch } from '~/utils/cachedFetch';
import { resolveSiteData } from '~/utils/resolvers';
import { SITE_QUERY } from '~/queries/site';

export const state = () => ({
  space: {},
  components: {
    header: null,
    cart: null,
    newsletter: null,
    footer: null
  },
  products: []
});

export const getters = {
  siteSpace(state) {
    return state.space;
  },
  siteComponents(state) {
    return state.components;
  },
  siteProducts(state) {
    return state.products;
  }
};

export const mutations = {
  setSpace(state, payload) {
    state.space = { ...payload };
  },
  setComponents(state, payload) {
    state.components = {
      header: payload.header?.edges[0].node,
      cart: payload.cart,
      newsletter: payload.newsletter?.edges[0].node,
      footer: payload.footer?.edges[0].node
    };
  },
  setProducts(state, payload) {
    state.products = payload?.edges.map((product) => product.node);
  }
};

export const actions = {
  async initSite({ commit }) {
    const { data } = await cachedFetch({
      key: 'site',
      fetcher: () =>
        this.$nacelle
          .query({ query: SITE_QUERY })
          .then((site) => resolveSiteData({ client: this.$nacelle, site }))
    });
    const { space, products, ...rest } = data;
    commit('setSpace', space);
    commit('setComponents', rest);
    commit('setProducts', products);
  }
};
