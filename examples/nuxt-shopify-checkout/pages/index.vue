<template>
  <div v-if="products">
    <h1>Checkout Example</h1>
    <div>{{ JSON.stringify(checkout) }}</div>
    <button @click="handleCreate">Create Empty Checkout</button>
    <button @click="handleUpdate">Update Checkout Item</button>
    <button @click="handleProcess">Checkout To Shopify</button>
  </div>
  <div v-else-if="fetchState.pending">Loading...</div>
  <div v-else-if="fetchState.error">Error</div>
</template>

<script>
import {
  computed,
  inject,
  ref,
  useContext,
  useFetch
} from '@nuxtjs/composition-api';

export default {
  setup() {
    const products = ref(null);
    const checkout = ref(null);
    const nacelleSdk = inject('nacelleSdk');
    const { $shopifyCheckout } = useContext();

    const cartItems = computed(() => [
      {
        variantId: products?.value[0]?.variants[0]?.id,
        quantity: 1
      }
    ]);

    useFetch(async () => {
      const data = await nacelleSdk.data.allProducts({ limit: 1 });
      products.value = data;
    });
    const handleCreate = async () => {
      checkout.value = await $shopifyCheckout.process({
        cartItems: cartItems.value
      });
    };
    const handleUpdate = async () => {
      checkout.value = await $shopifyCheckout.process({
        checkoutId: checkout?.value?.id,
        cartItems: [{ ...cartItems.value[0], quantity: 3 }]
      });
    };
    const handleProcess = () => {
      window.location = checkout.value?.webUrl;
    };
    return {
      products,
      checkout,
      handleCreate,
      handleUpdate,
      handleProcess
    };
  }
};
</script>
