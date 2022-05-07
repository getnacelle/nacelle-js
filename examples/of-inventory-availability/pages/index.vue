<template>
  <div>
    <div
      class="header bg-black h-24 top-0 z-5 fixed w-screen flex justify-around"
    >
      <img src="/warp-nine.svg" class="w-40 aspect-video" />
    </div>

    <Cart />
    <Toast />

    <div class="pdp mt-32 p-16 flex flex-col items-center" v-if="product">
      <div class="details flex flex-col md:flex-row lg:w-10/12 xl:w-9/12">
        <img
          v-if="product.content?.featuredMedia?.src"
          :src="product.content.featuredMedia.src"
          class="object-cover aspect-square md:w-1/2 rounded-lg"
        />
        <div class="pl-16 xl:pl-32 w-1/2">
          <h1 class="text-5xl font-extrabold font-sans mb-4 tracking-tight">
            {{ product.content.title }}
          </h1>
          <p class="text-3xl font-extrabold font-sans mb-4 tracking-tight">
            ${{ product.variants[0].price }}
          </p>
          <div
            v-html="product.content.description"
            class="description text-gray-600 mb-8"
          ></div>
          <transition name="fade" mode="out-in">
            <div v-if="atLeastOneVariantAvailable">
              <div class="variants">
                <div
                  v-for="variant in product.variants"
                  @click="setSelectedVariant(variant)"
                  :key="variant.nacelleEntryId"
                  :class="{
                    'in-stock': product.variants.find(
                      (v) => v.nacelleEntryId === variant.nacelleEntryId
                    ).availableForSale,
                    'out-of-stock':
                      product.variants.find(
                        (v) => v.nacelleEntryId === variant.nacelleEntryId
                      ).availableForSale == false,
                    selected:
                      selectedVariant &&
                      variant.nacelleEntryId === selectedVariant.nacelleEntryId,
                  }"
                >
                  {{ variant.content.selectedOptions.map((o) => o.value)[0] }}
                </div>
              </div>

              <button
                key="add"
                class="bg-red-500 text-white px-16 py-4 rounded font-bold"
                @click="
                  addItem({
                    ...selectedVariant,
                    title: product.content.title,
                    variantTitle: selectedVariant.content.title,
                    image: product.content.featuredMedia.src,
                  })
                "
              >
                <span v-if="!selectedVariant">CHOOSE A SIZE</span>
                <span v-else>ADD TO CART</span>
              </button>
            </div>

            <div v-else class="flex flex-col bg-gray-100 rounded-lg p-8">
              <p class="mb-4 text-gray-500 text-center">
                This product is currently out of stock. Enter your email to get
                notified when it returns!
              </p>
              <div class="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  class="border-2 border-gray-200 border-r-0 flex-grow pl-4 rounded-l-lg"
                />
                <button
                  key="notify"
                  class="bg-red-400 text-white px-8 py-4 rounded-r-lg font-bold"
                >
                  NOTIFY ME
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Storefront } from '@nacelle/storefront-sdk'
const route = useRoute()

const { cart, addItem, updateItemAvailability } = useCart()

const token = '493dd23a-8644-4267-a1ae-be037417496e'
const storefrontEndpoint =
  'https://storefront.api.development.nacelle.com/graphql/v1/spaces/e221faf8-49ca-4ba8-ae01-096fe1c639ff'

// initialize the Nacelle Storefront SDK
const client = new Storefront({
  token,
  storefrontEndpoint,
  subscriptionEndpoint:
    'wss://subscriptions.api.development.nacelle.com/subscribe/spaces/e221faf8-49ca-4ba8-ae01-096fe1c639ff',
  subscriptionToken: 'ebef028d-e265-441c-b23e-267890ae1a74',
})

// fetch the product from Nacelle
const { data: product } = await useAsyncData('product-data', () => {
  return client
    .products({
      handles: ['chateau-picard-wine-club-t-shirt'],
    })
    .then((res) =>
      res
        .map((product) => {
          const { content, variants } = product
          return { content, variants }
        })
        .pop()
    )
})

const {
  variants,
  variantEntryIds,
  selectedVariant,
  setSelectedVariant,
  sortVariants,
  setNextAvailableVariant,
  updateVariantAvailability,
  atLeastOneVariantAvailable,
} = useVariants(product)

sortVariants()

onMounted(async () => {
  setNextAvailableVariant()
  const observable = {
    onNext: (result) => {
      updateVariantAvailability(result.data.variantInventoryUpdated)
      updateItemAvailability(result.data.variantInventoryUpdated)
      console.log(result)
    },
    onError: (err) => {
      console.error(err)
    },
    complete: () => {
      console.log('done')
    },
  }

  const unsubscribe = client.productVariantSubscription(
    observable,
    variantEntryIds.value
  )
})
</script>

<style>
.description :deep(p) {
  @apply mb-8;
  font-size: 16pt;
}
.in-stock {
  @apply hover:bg-red-400 transition cursor-pointer font-bold text-gray-600 border-gray-300 active:bg-red-500 hover:border-red-400;
}

.description :deep(li) {
  @apply list-disc ml-8 mb-2;
}

.variants {
  @apply flex mb-8;
}
.variants > div {
  @apply h-16 w-16 flex justify-center items-center mr-4 rounded  select-none border-2;
}
.out-of-stock {
  @apply bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100;
}
.variants > div.selected {
  @apply border-2 border-red-400 bg-red-100;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
