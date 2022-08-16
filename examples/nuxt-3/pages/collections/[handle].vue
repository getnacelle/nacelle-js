<template>
  <div v-if="collection" class="collection">
    <h1 class="collection__heading">{{ collection.content.title }}</h1>
    <div v-if="products.length > 0" class="collection__main">
      <ul class="collection__list" role="list">
        <li
          v-for="product in products"
          :key="product.nacelleEntryId"
          class="collection__item"
        >
          <product-card :product="product"></product-card>
        </li>
      </ul>
      <div v-if="isFetchingProducts" class="collection__loading">
        Loading...
      </div>
      <button
        v-if="hasMoreProducts"
        class="collection__action"
        @click="loadMoreProducts"
      >
        Load More ({{ remainingProductsToLoad }} left)
      </button>
    </div>
    <div v-else class="collection__empty">There are no products here</div>
  </div>
</template>
<script setup>
import { CollectionPageQuery, CollectionProductsQuery } from '~/queries';
const route = useRoute();
const handle = route.params.handle;
const sdk = useSdk();

const { data: collectionPageData, error: pageFetchError } = await useAsyncData(
  `${handle}Collections`,
  async () => {
    const { allProductCollections } = await sdk.query({
      query: CollectionPageQuery,
      variables: { handle }
    });
    if (allProductCollections.edges[0]) {
      const {
        productConnection: {
          pageInfo: productPaginationInfo,
          totalProductCount,
          edges: productEdges
        },
        ...collection
      } = allProductCollections.edges[0]?.node;
      const products = productEdges.map((edge) => edge.node);
      return {
        collection,
        products,
        productPaginationInfo,
        totalProductCount
      };
    }
    return {};
  }
);
// throw an error if there's an issue fetching page data - might want to have a better fallback if not doing static generation
if (unref(pageFetchError)) {
  throw unref(pageFetchError);
}
const collection = unref(collectionPageData)?.collection ?? null;
const products = reactive(unref(collectionPageData)?.products ?? []);
const hasMoreProducts = ref(
  unref(collectionPageData)?.productPaginationInfo?.hasNext ?? false
);
const productPaginationCursor = ref(
  unref(collectionPageData)?.productPaginationInfo?.endCursor ?? null
);
const totalProductCount = computed(
  () => unref(collectionPageData).totalProductCount ?? 0
);
const remainingProductsToLoad = computed(
  () => totalProductCount - products.length
);
const isFetchingProducts = ref(false);
const loadMoreProducts = async () => {
  isFetchingProducts.value = true;
  const { productCollections } = await sdk.query({
    CollectionProductsQuery,
    variables: { handle: handle, after: productPaginationCursor }
  });
  const {
    productConnection: {
      pageInfo: newProductPaginationInfo,
      edges: newProductEdges
    }
  } = productCollections?.edges?.[0]?.node ?? [];
  const newProducts = newProductEdges.map((edge) => edge.node);
  products.push(newProducts);
  hasMoreProducts.value = newProductPaginationInfo.hasNext;
  productPaginationCursor.value = newProductPaginationInfo.endCursor;
  isFetchingProducts.value = false;
};
</script>
<style lang="css">
.collection {
  width: 100%;
}
.collection__list[role='list'] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  gap: 30px 0;
  list-style: none;
  padding: 0;
}
.collection__item {
  padding: 0 20px;
}
.collection__action {
  display: block;
  margin: 30px auto 0;
}
</style>
