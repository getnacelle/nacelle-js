import {
  getCheckout as getCheckoutQuery,
  GetCheckoutData
} from '~/graphql/queries';
import { handleShopifyError } from '~/utils';
import { ShopifyCheckout, GqlClient } from '~/checkout-client.types';

export interface FindCheckoutParams {
  gqlClient: GqlClient;
  id: string;
}

export default async function findCheckout({
  gqlClient,
  id
}: FindCheckoutParams): Promise<ShopifyCheckout | void> {
  const query = getCheckoutQuery;
  const variables = { id };

  try {
    const { data, errors } = await gqlClient<GetCheckoutData>({
      query,
      variables
    });

    if (errors) {
      handleShopifyError(errors);
      return;
    }

    if (!data?.node) {
      handleShopifyError(undefined, {
        message: 'Checkout response has no data'
      });
      return;
    }

    const {
      id: checkoutId,
      webUrl,
      completedAt,
      note,
      customAttributes
    } = data.node;

    return {
      completed: Boolean(completedAt),
      id: checkoutId || '',
      customAttributes: customAttributes || [],
      note: note || '',
      webUrl: webUrl || ''
    };
  } catch (err) {
    throw new Error(String(err));
  }
}
