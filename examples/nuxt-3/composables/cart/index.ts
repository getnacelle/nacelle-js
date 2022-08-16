import { get, set } from 'idb-keyval';
import { v4 as uuid } from 'uuid';
import { reactive, unref, computed } from '#imports';
import type { Ref, ComputedRef, DeepReadonly } from 'vue';
import type {
  Media,
  Product,
  SelectedOption,
  Variant
} from '@nacelle/storefront-sdk';
import type { Metafield } from '@nacelle/shopify-checkout/dist/types/checkout-client.types';

export interface LineItem {
  id?: string;
  metafields?: Metafield;
  quantity: number;
  variant: CartVariant;
}

export interface CartVariant {
  availableForSale?: boolean;
  compareAtPrice?: number;
  id: string;
  price?: number;
  sku?: string;
  featuredMedia: Media;
  selectedOptions: SelectedOption[];
  title?: string;
  productHandle?: string;
  productTitle?: string;
}

const cacheKey = 'cart';

const cartState: { lineItems: LineItem[]; subtotal: number } = reactive({
  lineItems: [],
  subtotal: getCartSubtotal()
});

function getCartSubtotal(): ComputedRef<number> {
  return computed<number>(() =>
    cartState.lineItems?.reduce(
      (total, item) => total + item.quantity * item.variant.price,
      0
    )
  );
}
function persistCartState() {
  // need to stringify the cart because indexedDB relies on state being cloneable, and reactive objects are not cloneable.
  return set(cacheKey, JSON.stringify(cartState.lineItems));
}

async function getPersistedCartState(): Promise<undefined | LineItem[]> {
  let cachedData = await get(cacheKey);
  // only parse it as JSON if it's defined, otherwise JSON.parse will throw an error
  if (cachedData) {
    // need to parse the cart state because we store it as JSON
    cachedData = JSON.parse(cachedData) as LineItem[];
  }
  return cachedData;
}

export function useCart(): DeepReadonly<{
  lineItems: LineItem[];
  subtotal: number;
}> {
  return readonly(cartState);
}

export async function addItemToCart(item: LineItem): Promise<void> {
  const existingItemIndex = cartState.lineItems.findIndex(
    (lineItem) =>
      lineItem.variant.id === item.variant.id &&
      JSON.stringify(lineItem.metafields) === JSON.stringify(item.metafields)
  );
  if (existingItemIndex === -1) {
    item.id = `${item.variant.id}::${uuid()}`;
    cartState.lineItems.push(item);
  } else {
    cartState.lineItems[existingItemIndex].quantity +=
      unref(item.quantity) ?? 1;
  }
  await persistCartState();
}

export async function removeItemFromCart(lineItemId: string): Promise<boolean> {
  const cartItemIndex = cartState.lineItems.findIndex(
    (lineItem) => lineItem.id === lineItemId
  );
  if (cartItemIndex > -1) {
    cartState.lineItems.splice(cartItemIndex, 1);
    await persistCartState();
    return true;
  }
  return false;
}

export async function updateItemInCart(item: LineItem): Promise<void> {
  const itemIndex = cartState.lineItems.findIndex(
    (item) => item.id === item.id
  );
  if (itemIndex > -1) {
    cartState.lineItems[itemIndex] = {
      ...cartState.lineItems[itemIndex],
      ...item
    };
    await persistCartState();
  }
}

export async function incrementCartItemQuantity(
  lineItemId: string
): Promise<void> {
  const itemIndex = cartState.lineItems.findIndex(
    (lineItem) => lineItem.id === lineItemId
  );
  if (itemIndex > -1) {
    cartState.lineItems[itemIndex].quantity += 1;
    await persistCartState();
  }
}

export async function decrementCartItemQuantity(
  lineItemId: string
): Promise<void> {
  const itemIndex = cartState.lineItems.findIndex(
    (lineItem) => lineItem.id === lineItemId
  );
  if (itemIndex > -1) {
    if (cartState.lineItems[itemIndex].quantity > 1) {
      cartState.lineItems[itemIndex].quantity -= 1;
    } else if (cartState.lineItems[itemIndex].quantity === 1) {
      cartState.lineItems.splice(itemIndex, 1);
    }
    await persistCartState();
  }
}

export async function clearCart(): Promise<void> {
  cartState.lineItems = [];
  await persistCartState();
}

export async function initCart(): Promise<void> {
  const cachedCart = await getPersistedCartState();
  cartState.lineItems = cachedCart ?? [];
  await persistCartState();
}

export function transformProductForCart({
  product,
  variant
}: {
  product: Ref<Product>;
  variant: Ref<Variant>;
}): CartVariant | null {
  const productValue = unref(product);
  const variantValue = unref(variant);
  if (!productValue || !variantValue) {
    return null;
  }
  const {
    handle: productHandle,
    title: productTitle,
    featuredMedia: productFeaturedMedia
  } = productValue.content;

  const { availableForSale, compareAtPrice, sourceEntryId, price, sku } =
    variantValue;
  const { featuredMedia, selectedOptions, title } = variantValue.content;
  return {
    availableForSale,
    compareAtPrice,
    id: sourceEntryId,
    price,
    sku,
    featuredMedia: featuredMedia ?? productFeaturedMedia,
    selectedOptions,
    title,
    productHandle,
    productTitle
  };
}
