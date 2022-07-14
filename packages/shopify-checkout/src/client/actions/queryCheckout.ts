import { GqlClient, ShopifyResponse } from '../../checkout-client.types';

export interface CheckoutQueryParams {
  gqlClient: GqlClient;
  query: string;
  variables: Record<string, unknown>;
}
export default function queryCheckout({
  gqlClient,
  query,
  variables
}: CheckoutQueryParams): Promise<ShopifyResponse<Record<string, unknown>>> {
  return gqlClient<typeof variables, ShopifyResponse<Record<string, unknown>>>({
    query,
    variables
  });
}
