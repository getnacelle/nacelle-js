import { get, set, del } from 'idb-keyval';
import createShopifyCheckoutClient, {
  CheckoutClient
} from '@nacelle/shopify-checkout';
import { ShopifyCheckout } from '@nacelle/shopify-checkout/dist/types/checkout-client.types';
import createCheckout from '@nacelle/shopify-checkout/dist/types/client/actions/checkoutCreate';
import { Ref } from 'vue';
const checkoutClient: Ref<CheckoutClient | null> = ref(null);

const checkoutState: { checkoutId?: string } = reactive({
  checkoutId: null
});

export function useShopifyCheckout(): CheckoutClient {
  if (!checkoutClient.value) {
    const runTimeConfig = useRuntimeConfig();
    checkoutClient.value = createShopifyCheckoutClient({
      storefrontCheckoutToken:
        runTimeConfig.public.shopify.StorefrontCheckoutToken,
      myshopifyDomain: runTimeConfig.public.shopify.myShopifyDomain
    });
  }
  return reactive(checkoutClient.value);
}

export async function initCheckout(): Promise<void> {
  try {
    const shopifyCheckoutClient = useShopifyCheckout();
    checkoutState.checkoutId = await get('checkoutId');
    if (checkoutState.checkoutId) {
      const checkout = await shopifyCheckoutClient.get({
        id: checkoutState.checkoutId
      });
      if (checkout?.completed) {
        await del('checkoutId');
        await clearCart();
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export async function processCheckout(): Promise<void> {
  try {
    const cartState = useCart();
    const shopifyCheckoutClient = useShopifyCheckout();
    const checkoutItems = cartState.lineItems.map((lineItem) => ({
      quantity: lineItem.quantity,
      variantId: lineItem.variant.id
    }));
    const checkoutArgs = { cartItems: checkoutItems };
    if (checkoutState.checkoutId) {
      checkoutArgs.id = checkoutState.checkoutId;
    }
    const checkoutData = await shopifyCheckoutClient.process(checkoutArgs);
    if (checkoutData) {
      await set('checkoutId', checkoutData.id);
      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
