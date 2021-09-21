export interface Attribute {
  key: string;
  value: string;
}

export interface Metafield extends Attribute {
  [key: string]: string;
}

export interface BuildCheckoutParams {
  id: string;
  webUrl: string;
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

export interface ShopifyCheckoutUserError {
  code?: string;
  field: string[];
  message: string;
}

export interface VerboseErrorParams {
  caller?: string;
  message?: string;
}

export interface ShopifyCheckoutUserErrors {
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
