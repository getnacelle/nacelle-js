import { Cart_CartFragment, CartUserError, Maybe } from './shopify.type';
import { ShopifyError } from './errors.type';

export interface Cart {
  id?: string;
  lines: Cart_CartFragment['lines']['edges'][1]['node'][];
  checkoutUrl?: string;
  note?: string;
  buyerIdentity?: Cart_CartFragment['buyerIdentity'];
  attributes: Cart_CartFragment['attributes'];
  discountCodes?: Cart_CartFragment['discountCodes'];
  estimatedCost?: Cart_CartFragment['estimatedCost'];
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
