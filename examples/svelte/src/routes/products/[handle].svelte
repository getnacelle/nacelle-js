<script context="module">
  import { nacelleClient } from '~/services'
  import { v4 as uuid } from 'uuid';

  const PAGE_QUERY = `
    query ProductPage($handle: String!){
      products(filter: { handles: [$handle] }){
        nacelleEntryId
        sourceEntryId
        content{
          handle
          title
          description
          options{
            name
            values
          }
          featuredMedia{
            src
            thumbnailSrc
            altText
          }
        }
        variants{
          nacelleEntryId
          sourceEntryId
          sku
          availableForSale
          price
          compareAtPrice
          content{
            title
            selectedOptions{
              name
              value
            }
            featuredMedia{
              src
              thumbnailSrc
              altText
            }
          }
        }
      }
    }
  `;

  export async function load({ params }) {
    const { products } = await nacelleClient.query({
      query: PAGE_QUERY,
      variables: { handle: params.handle }
    });
    return {
      props: { 
        product: products[0],
        uniqueId: uuid()
      }
    };
  }
</script>

<script>
  import { addItem } from '~/stores/cart'
  import { getCartVariant } from '~/utils/getCartVariant';
  import { getSelectedVariant } from '~/utils/getSelectedVariant';

  export let product
  export let uniqueId
  export let selectedVariant = {...product?.variants[0]}
  
  let selectedOptions = [...selectedVariant?.content?.selectedOptions]
  
  const optionsExist = product?.content?.options?.find(option => {
    return option.values.length > 1;
  })
  export let options = optionsExist ? product?.content?.options : [];

  export let quantity = 1

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
      addItem({ variant, quantity })
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

<div>
  {#if product}
    <div class="product">
      {#if product.content.featuredMedia}
        <div class="product__media">
          <img
            src={product.content.featuredMedia.src}
            alt={product.content.featuredMedia.altText}
            class="product__image"
          />
        </div>
      {/if}
      <div class="product__main">
        {#if product.content.title}
          <h1 class="product__title">
            {product.content.title}
          </h1>
        {/if}
        {#if selectedVariant}
          <div class="product__prices">
            {#if selectedVariant.compareAtPrice}
              <div class="product__compare">
                ${selectedVariant.compareAtPrice}
              </div>
              <div class="product__price">
                ${selectedVariant.price}
              </div>
            {/if}
          </div>
        {/if}
        {#each options as option (option.name)}
          <div class="product__option">
            <label for={`select-${uniqueId}`} class="product__label">
              {option.name}
            </label>
            <select 
              id={`select-${uniqueId}`}
              class="product__select"
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
        {#if product.content.description}
          <div class="product_description">
            {@html product.content.description}
          </div>
        {/if}
        <div class="product__quantity">
          <label 
            for={`input-${uniqueId}`}
            class="product__label"
          >
            Quantity
          </label>
          <input 
            type="number"
            min="1"
            value={quantity}
            class="product__input"
            id={`input-${uniqueId}`}
          />
        </div>
        <button
          class="product__button"
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          on:click={handleAddItem}
        >
        {buttonText(selectedVariant)}
      </button>
      </div>
    </div>
  {/if}
</div>

<style lang=scss>
.product {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
}
.product__media,
.product__main {
  width: 100%;
  overflow: hidden;
  @media only screen and (min-width: 768px) {
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