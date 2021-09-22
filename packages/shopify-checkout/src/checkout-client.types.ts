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
  customAttributes?: Attribute[];
  metafields?: Attribute[];
  quantity: number;
  variantId: string;
}

export interface CheckoutLineItem {
  customAttributes: Attribute[];
  quantity: number;
  variantId: string;
}

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
