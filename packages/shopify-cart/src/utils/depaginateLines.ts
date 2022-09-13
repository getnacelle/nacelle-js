import queries from '../graphql/queries';
import { QueryRootCartArgs, Cart_CartFragment } from '../types/shopify.type';
import type { CartFragments } from '../graphql/fragments/cart';
import type { GqlClient } from '../cart-client.types';
import type { ShopifyCartResponse } from '../client/actions/cart';

export interface PaginateCartLinesQueryArgs extends QueryRootCartArgs {
  afterCursor: string;
}

export interface DepaginateLinesParams {
  cart: Cart_CartFragment | undefined | null;
  customFragments?: CartFragments;
  gqlClient: GqlClient;
}

/**
 * Takes the cart, check lines for pagination and fetches the other line items if present
 * @param params
 * @param params.cart - the `cart` from a Shopify Storefront GraphQL response
 * @returns Depaginated `Cart` object
 */
export default async function depaginateLines({
  cart,
  customFragments,
  gqlClient
}: DepaginateLinesParams): Promise<Cart_CartFragment | null> {
  try {
    if (cart) {
      const pageInfo = { ...cart.lines.pageInfo };
      const nodes = cart.lines.nodes;

      while (pageInfo.hasNextPage && pageInfo.endCursor) {
        const shopifyResponse = await gqlClient<
          PaginateCartLinesQueryArgs,
          ShopifyCartResponse
        >({
          query: queries.CART(customFragments),
          variables: { id: cart.id, afterCursor: pageInfo.endCursor }
        }).catch((err) => {
          throw new Error(err);
        });
        pageInfo.hasNextPage =
          shopifyResponse.data?.cart?.lines.pageInfo.hasNextPage || false;
        pageInfo.endCursor =
          shopifyResponse.data?.cart?.lines.pageInfo.endCursor;

        if (shopifyResponse.data?.cart?.lines.nodes) {
          nodes.push(...shopifyResponse.data.cart.lines.nodes);
        }
      }

      return { ...cart, lines: { pageInfo, nodes } };
    }
    return null;
  } catch (err) {
    throw new Error(String(err));
  }
}