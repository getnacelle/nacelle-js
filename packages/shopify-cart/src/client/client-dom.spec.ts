/* eslint-disable @typescript-eslint/no-explicit-any */
import {
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
import createShopifyCartClient from './index';
import mutations from '../graphql/mutations';
import { mockJsonResponse } from '../../__tests__/utils';
import {
  clientSettings,
  responses,
  graphqlEndpoint,
  headers,
  cartId,
  cartWithLineResponse,
  cartWithoutLineResponse
} from '../../__tests__/mocks';
import { cartFromGql } from '../utils';
import queries from '../graphql/queries';

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
        query: mutations.CART_CREATE,
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

    await expect(cartClient.cart({ cartId })).resolves.toMatchObject(
      cartFromGql(cartWithLineResponse)
    );

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.CART,
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

    await expect(
      cartClient.cartLinesAdd({
        cartId,
        lines: []
      })
    ).resolves.toMatchObject(cartFromGql(cartWithLineResponse));

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_ADD,
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

    await expect(
      cartClient.cartLinesUpdate({
        cartId,
        lines: [
          {
            id: updatedCart.cart.lines.nodes[0].id,
            merchandiseId: updatedCart.cart.lines.nodes[0].merchandise.id,
            quantity: 2
          }
        ]
      })
    ).resolves.toMatchObject(cartFromGql(updatedCart));

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_UPDATE,
        variables: {
          cartId,
          lines: [
            {
              id: updatedCart.cart.lines.nodes[0].id,
              merchandiseId: updatedCart.cart.lines.nodes[0].merchandise.id,
              quantity: 2
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

    await expect(
      cartClient.cartLinesRemove({
        cartId,
        lineIds: [cartWithLineResponse.cart.lines.nodes[0].id]
      })
    ).resolves.toMatchObject(cartFromGql(cartWithoutLineResponse));

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_REMOVE,
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

    await expect(
      cartClient.cartBuyerIdentityUpdate({
        cartId,
        buyerIdentity: {
          email: 'email@email.com'
        }
      })
    ).resolves.toMatchObject(cartFromGql(cartWithoutLineResponse));

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_BUYER_IDENTITY_UPDATE,
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

    await expect(
      cartClient.cartDiscountCodesUpdate({
        cartId,
        discountCodes: ['code']
      })
    ).resolves.toMatchObject(cartFromGql(cartWithoutLineResponse));

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_DISCOUNT_CODES_UPDATE,
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
    await expect(
      cartClient.cartNoteUpdate({ cartId, note })
    ).resolves.toMatchObject(cartFromGql(cartWithoutLineResponse));

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_NOTE_UPDATE,
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

    await expect(
      cartClient.cartAttributesUpdate({ cartId, attributes })
    ).resolves.toMatchObject(cartFromGql(cartWithoutLineResponse));

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_ATTRIBUTES_UPDATE,
        variables: { cartId, attributes }
      })
    });
  });
});
