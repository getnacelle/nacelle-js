import {
  Cart_CartFragment,
  CartUserError,
  Maybe,
  CartLineInput,
  CartInput,
  CartLineUpdateInput
} from './shopify.type';
import { ShopifyError } from './errors.type';

export interface Cart {
  id?: string;
  lines: Cart_CartFragment['lines']['edges'][1]['node'][];
  checkoutUrl?: string;
  note?: string;
  buyerIdentity?: Cart_CartFragment['buyerIdentity'];
  attributes: Cart_CartFragment['attributes'];
  discountCodes?: Cart_CartFragment['discountCodes'];
  Cost?: Cart_CartFragment['cost'];
}

export interface CartResponse {
  cart?: Maybe<Cart>;
  userErrors?: Maybe<Array<CartUserError>>;
  errors?: Maybe<Array<ShopifyError>>;
}

export interface CartFragmentResponse {
  cart?: Maybe<Cart_CartFragment>;
  userErrors: Array<CartUserError>;
}

export interface NacelleCartLineItemInput
  extends Omit<CartLineInput, 'merchandiseId'> {
  variantId: string;
}

export interface NacelleCartInput extends Omit<CartInput, 'lines'> {
  lines?: Maybe<NacelleCartLineItemInput[]> | undefined;
}

export interface NacelleCartLineItemUpdateInput
  extends Omit<CartLineUpdateInput, 'merchandiseId'> {
  variantId?: Maybe<string> | undefined;
}
