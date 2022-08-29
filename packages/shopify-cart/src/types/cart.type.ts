import { Cart_CartFragment, CartUserError, Maybe } from './shopify.type';

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

export interface CartFragmentResponse {
  cart?: Maybe<Cart_CartFragment>;
  userErrors: Array<CartUserError>;
}
