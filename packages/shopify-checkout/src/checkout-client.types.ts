import { Metafield } from '@nacelle/types';

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

export type ShopifyCheckoutResponseProperties = Pick<
  ShopifyCheckout,
  'id' | 'webUrl'
>;

export interface CartItem {
  quantity: number;
  variantId: string;
  metafields?: Metafield[];
  [key: string]: unknown;
}

export type CheckoutItem = Pick<CartItem, 'quantity' | 'variantId'> & {
  customAttributes: Attribute[];
};

export interface ShopifyCheckoutUserError {
  code: string;
  field: string[];
  message: string;
}

interface ShopifyErrorLocation {
  line: number;
  column: number;
}

interface ShopifyErrorExtensionProblems {
  path: (string | number)[];
  explanation: string;
  message?: string;
}

export interface ShopifyError {
  message: string;
  locations: ShopifyErrorLocation[];
  extensions: {
    value: string | unknown;
    problems: ShopifyErrorExtensionProblems[];
  };
}

export type ShopifyResponse<D> = {
  data?: D;
  errors?: ShopifyError[];
};

export interface GqlClientParams<V> {
  query: string;
  variables: V;
}

export type GqlClient = <V, R>(
  params: GqlClientParams<V>
) => Promise<ShopifyResponse<R>>;

export type GqlStringField = string | null;
