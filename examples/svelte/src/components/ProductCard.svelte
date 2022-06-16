<script>
  import { v4 as uuid } from 'uuid';
  import { addItem } from '~/stores/cart'
  import { getCartVariant } from '~/utils/getCartVariant';
  import { getSelectedVariant } from '~/utils/getSelectedVariant';

  export let product
  export const uniqueId = uuid()
  export let selectedVariant = {...product?.variants[0]}

  let selectedOptions = [...selectedVariant?.content?.selectedOptions]
  
  const optionsExist = product?.content?.options?.find(option => {
    return option.values.length > 1;
  })
  export let options = optionsExist ? product?.content?.options : [];

  export const handleOptionChange = ($event, option) => {
    const newOption = { name: option.name, value: $event.target.value };
    const optionIndex = selectedOptions.findIndex((selectedOption) => {
      return selectedOption.name === newOption.name;
    });
    if (optionIndex > -1) {
      selectedOptions.splice(optionIndex, 1, newOption);
    } else {
      selectedOptions.push(newOption);
    }
    const variant = getSelectedVariant({
      product: product,
      options: selectedOptions
    });
    selectedVariant = variant ? {...variant} : null;
  }

  export const handleAddItem = () => {
    const variant = getCartVariant({
      product,
      variant: selectedVariant
    })
    if(variant) {
      addItem({ variant, quantity: 1 })
    }
  }

  export const buttonText = (selectedVariant) => {
    return selectedVariant
      ? selectedVariant.availableForSale
        ? 'Add To cart'
        : 'Sold Out'
      : 'Select Option';
  }
</script>

{#if product}
  <div class="product-card">
    <a 
      sveltekit:prefetch 
      href={`/products/${product.content.handle}`}
      class="product-card__media"
    >
      {#if product.content.featuredMedia}
        <img
          src={product.content.featuredMedia.src}
          alt={product.content.featuredMedia.altText}
          class="product-card__image" 
        />
      {:else}
        <div>No Image</div>
      {/if}
    </a>
    <div class="product-card__main">
      {#if product.content.title}
        <h2  class="product-card__title">
          {product.content.title}
        </h2>
      {/if}
      {#if selectedVariant}
        <div class="product-card__prices">
          {#if selectedVariant.compareAtPrice}
            <div class="product-card__compare">
              ${selectedVariant.compareAtPrice}
            </div>
          {/if}
          <div class="product-card__price">${selectedVariant.price}</div>
        </div>
      {/if}
      {#each options as option (option.name)}
        <div class="product-card__option">
          <label 
            for={`select-${uniqueId}`}
            class="product-card__label"
          >
            {option.name}
          </label>
          <select 
            id={`select-${uniqueId}`}
            class="product-card__select"
            on:change={($event) => handleOptionChange($event, option)}
          >
            {#each option.values as value, index (index)}
              <option value={value}>
                {value}
              </option>
            {/each}
          </select>
        </div>
      {/each}
    </div>
    <button
      class="product-card__button"
      disabled={!selectedVariant || !selectedVariant.availableForSale}
      on:click={handleAddItem}
    >
      {buttonText(selectedVariant)}
    </button>
  </div>
{/if}

<style lang=scss>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.product-card__media,
.product-card__main {
  width: 100%;
  overflow: hidden;
}
.product-card__image {
  width: 100%;
}
.product-card__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.product-card__title {
  margin: 0;
}
.product-card__prices {
  display: flex;
  gap: 10px;
}
.product-card__compare {
  text-decoration: line-through;
}
</style>