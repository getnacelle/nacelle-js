export interface Attribute {
  key: string;
  value: string;
}
export interface BuildCheckoutParams {
  id: string;
  webUrl?: string;
  customAttributes?: Attribute[];
  note?: string;
}

export interface ShopifyCheckout extends BuildCheckoutParams {
  completed: boolean;
}

export interface CartItem {
  quantity: number;
  variantId: string;
  customAttributes?: Attribute[];
  metafields?: Attribute[];
}

export type CheckoutLineItem = Required<
  Pick<CartItem, 'quantity' | 'variantId' | 'customAttributes'>
>;

export interface VerboseErrorParams {
  caller?: string;
  message?: string;
}

export interface ShopifyCheckoutUserError {
  code: string;
  field: string[];
  message: string;
}

export interface ShopifyErrorLocation {
  line: string;
  column: string;
}

export interface ShopifyError {
  message: string;
  locations: ShopifyErrorLocation[];
  extensions: AnyObject;
}

export interface AnyObject {
  [key: string]: AnyObject | string | unknown;
}

export type ShopifyResponse<D> = {
  data?: D;
  errors?: ShopifyError[];
};

export interface GqlClientParams {
  query: string;
  variables: AnyObject;
}

export type GqlClient = <R>(
  params: GqlClientParams
) => Promise<ShopifyResponse<R>>;

export type GqlStringField = string | null;

export interface PutCheckoutParams {
  gqlClient: GqlClient;
  cartItems: CartItem[];
  checkoutId?: string;
  metafields?: Attribute[];
  customAttributes?: Attribute[];
  note?: string;
  queueToken?: string;
}
