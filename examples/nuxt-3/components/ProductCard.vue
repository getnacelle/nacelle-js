<template>
  <div class="product-card">
    <div class="product-card__main">
      <h2
        class="product-card__title"
        :id="`product-card-header-${product.content.handle}`"
      >
        <NuxtLink :to="`/products/${product.content.handle}`">{{
          product.content.title
        }}</NuxtLink>
      </h2>
      <div v-if="selectedVariant" class="product-card__prices">
        <del
          v-if="selectedVariant.compareAtPrice"
          class="product-card__compare"
        >
          ${{ selectedVariant.compareAtPrice }}
        </del>
        <div class="product-card__price">${{ selectedVariant.price }}</div>
      </div>
      <div
        class="product-card__option"
        v-for="option in options"
        :key="option.name"
      >
        <label
          :for="`${option.name}-select-id`"
          class="product-card__option-label"
          >{{ option.name }}</label
        >
        <select :id="`${option.name}-select-id`" class="product-card__select">
          <option
            v-for="(value, vIndex) in option.values"
            :value="value"
            :key="value"
          >
            {{ value }}
          </option>
        </select>
      </div>
      <button
        v-if="selectedVariant.availableForSale"
        class="product-card__button"
        :aria-label="cartButtonAccessibleLabel"
        @click="addToCart"
      >
        {{ cartButtonText }}
      </button>
      <span v-else class="product-card__button"> Sold Out </span>
    </div>
    <div class="product-card__media">
      <img
        v-if="product.content.featuredMedia"
        :src="product.content.featuredMedia.src"
        :alt="product.content.featuredMedia.altText"
        loading="lazy"
        class="product-card__image"
      />
      <div v-else>No Image!</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ product: Object });
const selectedVariant = ref(props.product?.variants?.[0] ?? null);
const selectedOptions = ref(
  selectedVariant?.value?.content?.selectedOptions ?? null
);
const options = computed(() =>
  props.product?.content?.options?.filter((option) => {
    return option.values.length > 1;
  })
);
const cartButtonText = computed(() => {
  if (selectedVariant.value) {
    return selectedVariant.value?.availableForSale ? 'Add to Cart' : 'Sold Out';
  }
  return 'Select Options';
});
// accessible name for the button
// includes the product title so that if user is navigating in ways that strip button context, they can know what button corresponds to what product
const cartButtonAccessibleLabel = computed(() => {
  if (selectedVariant.value) {
    if (selectedVariant.value?.availableForSale) {
      return `Add ${props.product?.content?.title} to cart`;
    } else {
      return `${props.product?.content?.title} sold out`;
    }
  } else {
    return `Select options for ${props.product?.content?.title}`;
  }
});

const addToCart = () => {
  let cartVariant = transformProductForCart({
    product: props.product,
    variant: selectedVariant
  });
  addItemToCart({ variant: cartVariant, quantity: 1 });
};
</script>

<style lang="css" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border: 1px solid black;
  border-radius: 8%;
  overflow: hidden;
  width: 100%;
  height: 100%;
  --shadow-color: 0deg 0% 63%;
  --shadow-elevation-medium: 0.2px 0.6px 0.6px hsl(var(--shadow-color) / 0.51),
    0.6px 1.5px 1.6px -1.2px hsl(var(--shadow-color) / 0.43),
    1.8px 4.3px 4.5px -2.3px hsl(var(--shadow-color) / 0.36),
    4.8px 11.4px 12.1px -3.5px hsl(var(--shadow-color) / 0.29);
  box-shadow: var(--shadow-elevation-medium);
}
.product-card__media,
.product-card__main {
  width: 100%;
  overflow: hidden;
}
.product-card__media {
  height: 66%;
}
.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-card__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  order: 1;
  padding: 0 2rem 1rem 2rem;
}
.product-card__title {
  margin: 0;
}
.product-card__prices {
  display: flex;
  gap: 10px;
}
</style>
