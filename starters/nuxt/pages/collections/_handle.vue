<template>
  <div v-if="collection" class="collection">
    <h1 class="collection__heading">{{ collection.content.title }}</h1>
    <div v-if="activeProducts.length > 0" class="collection__main">
      <div class="collection__list">
        <product-card
          v-for="product in activeProducts"
          :key="product.nacelleEntryId"
          :product="product"
          class="collection__item"
        />
      </div>
      <button
        v-if="canFetch"
        :disabled="isFetching"
        class="collection__action"
        @click="handleFetch"
      >
        Load More
      </button>
    </div>
    <div v-else class="collection__empty">Empty Collection</div>
  </div>
</template>

<script>
export default {
  name: 'CollectionPage',
  async asyncData({ app, params }) {
    const { allProductCollections } = await app.$nacelle.query({
      query: PAGE_QUERY,
      variables: { handle: params.handle }
    });
    if (allProductCollections.edges.at(0)) {
      const { productConnection, ...rest } =
        allProductCollections.edges.at(0).node;
      const products = productConnection.edges.map((edge) => edge.node);
      return {
        collection: rest,
        products,
        canFetch: products?.length > 12
      };
    }
  },
  data: () => ({
    collection: null,
    products: null,
    canFetch: false,
    isFetching: false
  }),
  computed: {
    activeProducts() {
      return this.canFetch
        ? this.products?.slice(0, this.products.length - 1)
        : this.products;
    }
  },
  methods: {
    async handleFetch() {
      this.isFetching = true;
      const after = this.products[this.products?.length - 1].nacelleEntryId;
      const { allProductCollections } = await this.$nacelle.query({
        query: PRODUCTS_QUERY,
        variables: { handle: this.$route.params.handle, after }
      });
      const products = allProductCollections.edges
        .at(0)
        ?.node.productConnection.edges.map((edge) => edge.node);
      if (products) {
        this.canFetch = products.length === 12;
        this.products = [...this.products, ...products];
      }
      this.isFetching = false;
    }
  }
};
// GraphQL fragment of necessary product data.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment CollectionProductFragment on Product {
    nacelleEntryId
    sourceEntryId
    content {
      handle
      title
      options {
        name
        values
      }
      featuredMedia {
        src
        thumbnailSrc
        altText
      }
    }
    variants {
      nacelleEntryId
      sourceEntryId
      sku
      availableForSale
      price
      compareAtPrice
      content {
        title
        selectedOptions {
          name
          value
        }
        featuredMedia {
          src
          thumbnailSrc
          altText
        }
      }
    }
  }
`;

// GraphQL query for product collection content and initial products.
// Used in `getStaticProps`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PAGE_QUERY = /* GraphQL */ `
  query CollectionPage($handle: String!) {
    allProductCollections(filter: { handles: [$handle] }) {
      edges {
        node {
          nacelleEntryId
          sourceEntryId
          content {
            title
          }
          productConnection(first: 13) {
            edges {
              node {
                ...CollectionProductFragment
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// GraphQL query for paginated products within a collection.
// Used in `handleFetch`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const PRODUCTS_QUERY = /* GraphQL */ `
  query CollectionProducts($handle: String!, $after: String!) {
    allProductCollections(filter: { handles: [$handle] }) {
      edges {
        node {
          productConnection(first: 12, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                ...CollectionProductFragment
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
</script>

<style lang="scss" scoped>
.collection {
  width: 100%;
}
.collection__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  gap: 30px 0;
}
.collection__item {
  padding: 0 20px;
}
.collection__action {
  display: block;
  margin: 30px auto 0;
}
</style>
