/* eslint-disable @typescript-eslint/no-explicit-any */
import createShopifyCartClient from './index';
import mutations from '../graphql/mutations';
import { mockJsonResponse } from '../../__tests__/utils';
import {
  clientSettings,
  responses,
  graphqlEndpoint,
  headers,
  cartId,
  cartWithLineResponse
} from '../../__tests__/mocks';
import queries from '../graphql/queries';
import type {
  CartAttributesUpdateMutation,
  CartBuyerIdentityUpdateMutation,
  CartCreateMutation,
  CartDiscountCodesUpdateMutation,
  CartLineAddMutation,
  CartLineUpdateMutation,
  CartLineRemoveMutation,
  CartNoteUpdateMutation,
  Cart_CartFragment
} from '../types/shopify.type';

describe('createShopifyCartClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a client containing the expected functions', () => {
    const cartClient = createShopifyCartClient(clientSettings);
    expect(cartClient).toBeInstanceOf(Object);
    expect(cartClient.cart).toBeInstanceOf(Function);
    expect(cartClient.cartCreate).toBeInstanceOf(Function);
    expect(cartClient.cartDiscountCodesUpdate).toBeInstanceOf(Function);
    expect(cartClient.cartLinesAdd).toBeInstanceOf(Function);
    expect(cartClient.cartLinesUpdate).toBeInstanceOf(Function);
    expect(cartClient.cartLinesRemove).toBeInstanceOf(Function);
    expect(cartClient.cartBuyerIdentityUpdate).toBeInstanceOf(Function);
    expect(cartClient.cartAttributesUpdate).toBeInstanceOf(Function);
    expect(cartClient.cartNoteUpdate).toBeInstanceOf(Function);
  });

  it("uses `window.fetch` when `typeof window !== 'undefined'` and an isomorphic fetch client hasn't been supplied", async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartCreateMutation>(
          responses.mutations.cartCreate.withLine
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    const note = 'hi!';
    await cartClient.cartCreate({ note });

    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_CREATE(),
        variables: { input: { note } }
      })
    });
  });

  it('makes the expected request when fetching cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    await cartClient.cart({ cartId });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.CART(),
        variables: { id: cartId }
      })
    });
  });

  it('makes the expected request when adding line item to cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartLineAddMutation>(responses.mutations.cartLinesAdd)
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    await cartClient.cartLinesAdd({
      cartId,
      lines: []
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_ADD(),
        variables: {
          cartId,
          lines: []
        }
      })
    });
  });

  it('makes the expected request when updating line item in cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartLineUpdateMutation>(
          responses.mutations.cartLinesUpdate
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    const updatedCart = cartWithLineResponse;
    updatedCart.cart.lines.nodes[0].quantity = 2;

    await cartClient.cartLinesUpdate({
      cartId,
      lines: [
        {
          id: updatedCart.cart.lines.nodes[0].id,
          nacelleEntryId: updatedCart.cart.lines.nodes[0].attributes[0]
            .value as string,
          quantity: 2
        }
      ]
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_UPDATE(),
        variables: {
          cartId,
          lines: [
            {
              id: updatedCart.cart.lines.nodes[0].id,
              quantity: 2,
              merchandiseId: updatedCart.cart.lines.nodes[0].merchandise.id
            }
          ]
        }
      })
    });
  });

  it('makes the expected request when removing line item from cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartLineRemoveMutation>(
          responses.mutations.cartLinesRemove
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    await cartClient.cartLinesRemove({
      cartId,
      lineIds: [cartWithLineResponse.cart.lines.nodes[0].id]
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_REMOVE(),
        variables: {
          cartId,
          lineIds: [cartWithLineResponse.cart.lines.nodes[0].id]
        }
      })
    });
  });

  it('makes the expected request when update buyer on cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartBuyerIdentityUpdateMutation>(
          responses.mutations.cartBuyerIdentityUpdate.withoutBuyer
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    await cartClient.cartBuyerIdentityUpdate({
      cartId,
      buyerIdentity: {
        email: 'email@email.com'
      }
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_BUYER_IDENTITY_UPDATE(),
        variables: {
          cartId,
          buyerIdentity: {
            email: 'email@email.com'
          }
        }
      })
    });
  });

  it('makes the expected request when updating discounts on cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartDiscountCodesUpdateMutation>(
          responses.mutations.cartDiscountCodesUpdate.withoutCodes
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    await cartClient.cartDiscountCodesUpdate({
      cartId,
      discountCodes: ['code']
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_DISCOUNT_CODES_UPDATE(),
        variables: {
          cartId,
          discountCodes: ['code']
        }
      })
    });
  });

  it('makes the expected request when updating a note on the cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartNoteUpdateMutation>(
          responses.mutations.cartNoteUpdate.noNote
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    const note = 'Cart Note';
    await cartClient.cartNoteUpdate({ cartId, note });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_NOTE_UPDATE(),
        variables: {
          cartId,
          note
        }
      })
    });
  });

  it('makes the expected request when updating attributes on a cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartAttributesUpdateMutation>(
          responses.mutations.cartAttributesUpdate.noAttributes
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    const attributes = [{ key: 'testKey', value: 'testValue' }];

    await cartClient.cartAttributesUpdate({ cartId, attributes });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_ATTRIBUTES_UPDATE(),
        variables: { cartId, attributes }
      })
    });
  });

  it('makes requests using user-supplied `customFragments`', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartCreateMutation>(
          responses.mutations.cartCreate.withLine
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient({
      ...clientSettings,
      customFragments: {
        USER_ERRORS: `
          fragment CartUserError_userErrors on CartUserError {
            message
          }
        `,
        BUYER_IDENTITY: `
          fragment CartBuyerIdentity_buyerIdentity on CartBuyerIdentity {
            email
            phone
          }
        `,
        DISCOUNT_ALLOCATION: `
          fragment CartDiscountAllocation_discountAllocation on CartDiscountAllocation {
            discountedAmount {
              amount
              currencyCode
            }
          }
        `
      }
    });

    await cartClient.cartCreate({ lines: [] });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    const requestBody = (windowFetch.mock.calls[0] as Request[])[1].body;

    // USER_ERRORS
    expect(requestBody).toMatch(
      /fragment CartUserError_userErrors on CartUserError {\\n\s+ message\\n\s+ }/
    );

    // BUYER_IDENTITY
    expect(requestBody).toMatch(
      /fragment CartBuyerIdentity_buyerIdentity on CartBuyerIdentity {\\n\s+ email\\n\s+ phone\\n\s+ }/
    );

    // DISCOUNT_ALLOCATION
    expect(requestBody).toMatch(
      /fragment CartDiscountAllocation_discountAllocation on CartDiscountAllocation {\\n\s+ discountedAmount {\\n\s+ amount\\n\s+ currencyCode\\n\s+ }\\n\s+ }/
    );
  });

  it('makes requests using `EXTEND_`-type user-supplied `customFragments`', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient({
      ...clientSettings,
      customFragments: {
        EXTEND_CART: `
          fragment Cart_extendCart on Cart {
            deliveryGroups(first: 1) {
              nodes {
                deliveryOptions {
                  code
                }
              }
            }
          }
        `,
        EXTEND_CART_LINE: `
          fragment CartLine_extendCartLine on CartLine {
            sellingPlanAllocation {
              checkoutChargeAmount {
                amount
              }
            }
          }
        `
      }
    });

    await cartClient.cart({ cartId });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    const requestBody = (windowFetch.mock.calls[0] as Request[])[1].body;

    // EXTEND_CART
    expect(requestBody).toMatch(
      /fragment Cart_extendCart on Cart {\\n\s+ deliveryGroups\(first: 1\) {\\n\s+ nodes {\\n\s+ deliveryOptions {\\n\s+ code\\n\s+ }\\n\s+ }\\n\s+ }\\n\s+ }/
    );

    // EXTEND_CART_LINE
    expect(requestBody).toMatch(
      /fragment CartLine_extendCartLine on CartLine {\\n\s+ sellingPlanAllocation {\\n\s+ checkoutChargeAmount {\\n\s+ amount\\n\s+ }\\n\s+ }\\n\s+ }/
    );
  });

  it('retains required properties of a fragment when an `EXTEND_`-type custom fragment is provided', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient({
      ...clientSettings,
      customFragments: {
        EXTEND_CART_LINE_MERCHANDISE: `
          fragment ProductVariant_extendCartLineMerchandise on ProductVariant {
            weight
          }
        `
      }
    });

    await cartClient.cart({ cartId });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    const requestBody = (windowFetch.mock.calls[0] as Request[])[1].body;

    // Check that the supplied `EXTEND_CART_LINE_MERCHANDISE` fragment was included
    expect(requestBody).toMatch(
      /fragment ProductVariant_extendCartLineMerchandise on ProductVariant {\\n\s+ weight\\n\s+ }/
    );

    // Check that the `id` from the required `Merchandise_merchandise` fragment was included
    expect(requestBody).toMatch(
      /fragment Merchandise_merchandise on ProductVariant {\\n\s+ id/
    );
  });
});
