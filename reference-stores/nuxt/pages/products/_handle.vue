<template>
  <div v-if="product" class="productPage">
    <product-buy-box :product="product" :content="content" />
    <site-section
      v-for="section in sections"
      :key="section._key"
      :content="section"
    />
  </div>
</template>

<script>
import { PRODUCT_PAGE_QUERY } from '~/queries/productPage';
import { buildMeta } from '~/utils/buildMeta';

import ProductBuyBox from '~/components/product/ProductBuyBox.vue';
import SiteSection from '~/components/section/Section.vue';

export default {
  name: 'ProductPage',
  components: {
    ProductBuyBox,
    SiteSection
  },
  async asyncData({ app, params }) {
    const { products, pages } = await app.$nacelle.query({
      query: PRODUCT_PAGE_QUERY,
      variables: { handle: params.handle }
    });
    return {
      product: products[0],
      page: pages[0]
    };
  },
  head() {
    return buildMeta({ product: this.product });
  },
  computed: {
    sections() {
      return this.page?.fields.sections;
    },
    content() {
      const fields = this.page?.fields || {};
      const { sections, ...rest } = fields;
      return { fields: rest };
    }
  }
};
</script>

<style lang="scss" scoped></style>
