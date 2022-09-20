import queries from '../graphql/queries';
import {
  QueryRootCartArgs,
  Cart_CartFragment,
  LanguageCode,
  CountryCode
} from '../types/shopify.type';
import type { CustomFragments } from '../graphql/fragments';
import type { GqlClient } from '../cart-client.types';
import type { ShopifyCartResponse } from '../client/actions/cart';

export interface PaginateCartLinesQueryArgs extends QueryRootCartArgs {
  afterCursor: string;
  language: LanguageCode;
  country: CountryCode;
}

export interface DepaginateLinesParams {
  cart: Cart_CartFragment | undefined | null;
  customFragments?: CustomFragments;
  gqlClient: GqlClient;
  language: LanguageCode;
  country: CountryCode;
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
  gqlClient,
  language,
  country
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
          variables: {
            id: cart.id,
            afterCursor: pageInfo.endCursor,
            language,
            country
          }
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
