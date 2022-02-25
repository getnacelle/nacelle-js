export interface Attribute {
  key: string;
  value: string;
}

export interface Metafield extends Attribute {
  [key: string]: string;
}

export type DiscountAllocation = {
  allocatedAmount: {
    amount: any;
    currencyCode: string;
  };
};

export type CheckoutLine = {
  customAttributes: Array<Attribute>;
  discountAllocations: Array<DiscountAllocation>;
  id: string;
  quantity: number;
  title: string;
  unitPrice: {
    amount: any;
    currencyCode: string;
  };
  variant: {
    id: string;
  };
};

export type CheckoutDiscountApplication = {
  allocationMethod: string;
  targetSelection: string;
  targetType: string;
  value: {
    amount: any;
    currencyCode: string;
    percentage: number;
  };
};

export type ShopifyCheckout = {
  id: string | null;
  url: string | null;
  completed: boolean | null;
  lines: Array<CheckoutLine>;
  discounts: Array<CheckoutDiscountApplication>;
};

export type ShopifyCheckoutResponseLineConnection = {
  edges: Array<ShopifyCheckoutResponseLineEdge>;
};

export type ShopifyCheckoutResponseLineEdge = {
  node: CheckoutLine;
};

export type ShopifyCheckoutResponseDiscountConnection = {
  edges: Array<ShopifyCheckoutResponseDiscountEdge>;
};

export type ShopifyCheckoutResponseDiscountEdge = {
  node: CheckoutDiscountApplication;
};

export type ShopifyCheckoutResponseUserError = {
  code?: string;
  field?: string;
  message: string;
};

export interface ShopifyCheckoutResponseProperties {
  id: string;
  webUrl: string;
  completedAt: string | null;
  lineItems: ShopifyCheckoutResponseLineConnection;
  discountApplications: ShopifyCheckoutResponseDiscountConnection;
}

export type BuildCheckoutParams = ShopifyCheckoutResponseProperties & {
  customAttributes?: Attribute[];
  note?: string;
};

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
