import { GqlClient, ShopifyResponse } from '../../checkout-client.types';

export interface CheckoutQueryParams {
  gqlClient: GqlClient;
  query: string;
  input?: Record<string, unknown>;
  queueToken?: string;
}

export default async function queryCheckout({
  gqlClient,
  query,
  input,
  queueToken
}: CheckoutQueryParams): Promise<ShopifyResponse<unknown> | void> {
  const variables = {
    ...input,
    queueToken
  };

  try {
    const shopifyResponse = await gqlClient<
      Pick<CheckoutQueryParams, 'input' | 'queueToken'>,
      ShopifyResponse<unknown>
    >({
      query,
      variables
    }).catch((err) => {
      throw new Error(err);
    });

    return shopifyResponse;
  } catch (err) {
    throw new Error(String(err));
  }
}
