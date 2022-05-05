<template>
  <nuxt-link
    v-if="item"
    :to="`/products/${item.content.handle}`"
    class="py-6 flex hover:opacity-75 focus:opacity-75"
  >
    <div
      class="
        flex-shrink-0
        w-24
        h-24
        border border-gray-200
        rounded-md
        overflow-hidden
      "
    >
      <nuxt-picture
        :src="item.content.featuredMedia.src"
        :alt="item.content.featuredMedia.altText"
        quality="80"
        width="300"
        :img-attrs="{ class: 'w-full h-full object-center object-cover' }"
      />
    </div>

    <div class="ml-4 flex-1 flex flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>
            {{ item.content.title }}
          </h3>
          <p class="flex flex-wrap justify-end ml-4">
            <span v-if="price" :class="compareAtPrice && 'text-red-600'">
              {{ price }}
            </span>
            <span v-if="compareAtPrice" class="line-through">
              {{ compareAtPrice }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { formatPrice } from '~/utils/formatPrice';

export default {
  name: 'SearchAutocompleteItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    price() {
      return formatPrice({ price: this.item.variants[0].price });
    },
    compareAtPrice() {
      return formatPrice({ price: this.item.variants[0].compareAtPrice });
    }
  }
};
</script>
