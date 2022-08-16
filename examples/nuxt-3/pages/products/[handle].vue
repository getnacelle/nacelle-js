<template>
  <main>
    <article v-if="product">
      <div v-if="product.content.featuredMedia" class="product__media">
        <img
          :src="product.content.featuredMedia.src"
          :alt="product.content.featuredMedia.altText"
          class="product__image"
        />
      </div>
      <form class="product__main" @submit.prevent="addItem">
        <h1 class="product__title">
          {{ product.content.title ?? handle }}
        </h1>
        <div class="product__prices">
          <div v-if="selectedVariant.compareAtPrice" class="product__compare">
            ${{ selectedVariant.compareAtPrice }}
          </div>
          <div class="product__price">${{ selectedVariant.price }}</div>
        </div>
        <div
          v-for="option in options"
          :key="option.name"
          class="product__option"
        >
          <label :for="`select-${option.name}`" class="product__label">
            {{ option.name }}
          </label>
          <select
            :id="`select-${option.name}`"
            class="product__label"
            @change="onOptionChanged(option, $event)"
          >
            <option
              v-for="value in option.values"
              :key="`${option.name}-${value}`"
              :value="value"
            >
              {{ value }}
            </option>
          </select>
        </div>
        <div
          v-if="product.content.description"
          class="product__description"
          v-html="product.content.description"
        ></div>
        <div class="product__quantity">
          <label class="product__label" for="product-quantity-input"
            >Quantity:</label
          >
          <select
            id="product-quantity-input"
            v-model="quantity"
            class="product__input"
          >
            <option
              v-for="num in 10"
              :key="`product-quantity-option-${num}`"
              :default="num == 1 ? '' : null"
              :value="num"
            >
              {{ num }}
            </option>
          </select>
        </div>
        <button
          class="product__button"
          type="submit"
          :disabled="!selectedVariant || !selectedVariant.availableForSale"
        >
          {{ buttonText }}
        </button>
      </form>
    </article>
  </main>
</template>

<script setup>
import { addItemToCart } from '~~/composables/cart';
import { ProductPageQuery } from '~~/queries';
// import { useSdk } from '~~/composables/nacelle';
import { getSelectedVariant } from '~~/utils/getSelectedVariant';

const route = useRoute();
const handle = route.params.handle;
const sdk = useSdk();

const { data: product, error: pageFetchError } = await useAsyncData(
  `${handle}Products`,
  async () => {
    const { products } = await sdk.query({
      query: ProductPageQuery,
      variables: { handle }
    });
    return products[0];
  }
);

// throw an error if there's an issue fetching page data - might want to have a better fallback if not doing static generation
if (unref(pageFetchError)) {
  throw unref(pageFetchError);
}

const selectedVariant = ref({ ...product.value.variants?.[0] });
const selectedOptions = ref([
  ...(selectedVariant.value?.content?.selectedOptions ?? [])
]);
const quantity = ref(1);

const options = computed(() => {
  const optionsExist = product?.value?.content?.options?.some(
    (option) => option.values.length > 1
  );
  return optionsExist ? product?.value?.content?.options : null;
});

const buttonText = computed(() => {
  return selectedVariant.value
    ? selectedVariant.value.availableForSale
      ? 'Add to Cart'
      : 'Sold Out'
    : 'Select Option';
});

const onOptionChanged = (option, $event) => {
  const newOption = { name: option.name, value: $event.target.value };
  const optionIndex = selectedOptions.value.findIndex(
    (selectedOption) => selectedOption.name === newOption.name
  );
  if (optionIndex > -1) {
    selectedOptions.value.splice(optionIndex, 1, newOption);
  } else {
    const variant = getSelectedVariant({
      product: product.value,
      options: selectedOptions.value
    });
    selectedVariant.value = variant ?? null;
  }
};

const addItem = async (e) => {
  const cartVariant = transformProductForCart({
    product: product,
    variant: selectedVariant
  });
  if (cartVariant) {
    //unref the quantity so only it's value gets used in the cart
    await addItemToCart(
      reactive({ variant: cartVariant, quantity: unref(quantity) })
    );
  }
};

useHead({
  title: product.content?.title ?? handle
});
</script>

<style lang="css">
.product {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
}
@media only screen and (min-width: 768px) {
  .product {
    flex-direction: row;
  }
}
.product__media,
.product__main {
  width: 100%;
  overflow: hidden;
}
@media only screen and (min-width: 768px) {
  .product__media,
  .product__main {
    width: 50%;
  }
}
.product__image {
  width: 100%;
}
.product__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.product__prices {
  display: flex;
  gap: 10px;
}
.product__compare {
  text-decoration: line-through;
}
</style>
