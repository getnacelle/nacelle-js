import type {
  Cart_CartFragment,
  CartUserError,
  Maybe,
  CartLineInput,
  CartInput,
  CartLineUpdateInput
} from './shopify.type';
import type { ShopifyError } from './errors.type';

export interface Cart {
  id?: string;
  lines: NacelleCartLine[];
  checkoutUrl?: string;
  note?: string;
  buyerIdentity?: Cart_CartFragment['buyerIdentity'];
  attributes: Cart_CartFragment['attributes'];
  discountCodes?: Cart_CartFragment['discountCodes'];
  Cost?: Cart_CartFragment['cost'];
}

export type CartLine = Cart_CartFragment['lines']['nodes'][1];
export type CartMerchandise =
  Cart_CartFragment['lines']['nodes'][1]['merchandise'];

export interface NacelleCartMerchandise extends Omit<CartMerchandise, 'id'> {
  sourceEntryId: string;
  nacelleEntryId: string;
}

export interface NacelleCartLine
  extends Omit<CartLine, 'nacelleEntryId' | 'merchandise'> {
  merchandise: NacelleCartMerchandise;
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
  nacelleEntryId: string;
}

export interface NacelleCartInput extends Omit<CartInput, 'lines'> {
  lines?: Maybe<NacelleCartLineItemInput[]> | undefined;
}

export interface NacelleCartLineItemUpdateInput
  extends Omit<CartLineUpdateInput, 'merchandiseId'> {
  nacelleEntryId?: Maybe<string> | undefined;
}
