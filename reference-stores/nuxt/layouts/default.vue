<template>
  <div class="layout-default">
    <site-header :content="siteComponents.header" />
    <site-nav :content="siteComponents.header" />
    <site-cart :content="siteComponents.cart" />
    <nuxt class="layout-default__nuxt" />
    <site-newsletter :content="siteComponents.newsletter" />
    <site-footer :content="siteComponents.footer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { buildMeta } from '~/utils/buildMeta';

import SiteHeader from '~/components/header/Header.vue';
import SiteNav from '~/components/nav/Nav.vue';
import SiteCart from '~/components/cart/Cart.vue';
import SiteNewsletter from '~/components/newsletter/Newsletter.vue';
import SiteFooter from '~/components/footer/Footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    SiteHeader,
    SiteNav,
    SiteCart,
    SiteNewsletter,
    SiteFooter
  },
  head() {
    return buildMeta({});
  },
  computed: {
    ...mapGetters('site', ['siteComponents'])
  }
};
</script>
