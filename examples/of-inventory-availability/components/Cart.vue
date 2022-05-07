<template>
  <div
    class="fixed flex flex-col items-center w-96 z-10 right-0 top-0 h-full bg-white shadow-lg p-4"
    v-if="cartUiState == 'open'"
  >
    <h2 class="mb-4 text-2xl">Cart</h2>
    <div v-for="item in cart" :key="item.nacelleEntryId" class="relative">
      <div
        v-if="!item.availableForSale"
        class="absolute bg-red-500 z-10 top-4 rotate-6 left-4 p-1 text-white"
      >
        OUT OF STOCK
      </div>
      <div class="flex mb-4" :class="{ 'opacity-40': !item.availableForSale }">
        <img :src="item.image" class="w-1/4 mr-4 rounded object-cover" />
        <div>
          <p>
            {{ item.title }}
          </p>
          <p class="text-gray-400">({{ item.variantTitle }})</p>
          <div class="flex justify-between">
            <p>{{ item.price }}</p>
            <p
              class="text-right text-gray-400 cursor-pointer"
              @click="removeItem(item.nacelleEntryId)"
            >
              Remove
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { cart, cartUiState, removeItem } = useCart()
</script>
