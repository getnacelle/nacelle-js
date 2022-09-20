/**Entry File - Serves as the public api for `@nacelle/shopify-cart`
 * Any "public" functions and types should be exported from here
 */

// export the default export of `./client/index.ts` as the package's default export
export { default } from './client';

// export any other exports, which includes public types
export * from './client';

// export other public types
export type {
  Cart,
  CartResponse,
  NacelleCartInput,
  NacelleCartLineItemInput,
  NacelleCartLineItemUpdateInput
} from './types/cart.type';
export type { ShopifyError } from './types/errors.type';
export type {
  AttributeInput,
  CartBuyerIdentityInput,
  CartUserError,
  CountryCode,
  LanguageCode
} from './types/shopify.type';
export type { CustomFragmentKey, CustomFragments } from './graphql/fragments';
