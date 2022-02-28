import {
  getCheckout as getCheckoutQuery,
  GetCheckoutData
} from '../../graphql/queries';
import { buildCheckout, handleShopifyError } from '../../utils';
import { ShopifyCheckout, GqlClient } from '../../checkout-client.types';

export interface FindCheckoutParams {
  gqlClient: GqlClient;
  /**
   * a Shopify checkout ID.
   */
  id: string;
}

export type FindCheckoutVariables = Pick<FindCheckoutParams, 'id'>;

export default async function findCheckout({
  gqlClient,
  id
}: FindCheckoutParams): Promise<ShopifyCheckout | void> {
  const query = getCheckoutQuery;
  const variables = { id };

  const { data, errors } = await gqlClient<
    FindCheckoutVariables,
    GetCheckoutData
  >({ query, variables }).catch((err) => {
    throw new Error(err);
  });

  if (errors) {
    handleShopifyError(errors, { caller: 'findCheckout' });
  }

  if (!data?.node) {
    handleShopifyError(undefined, {
      caller: 'findCheckout',
      message: 'Checkout response has no data'
    });
  } else {
    return buildCheckout(data.node);
  }
}
